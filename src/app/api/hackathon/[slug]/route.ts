import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Hackathon, HackathonCreate } from '@/const';
import { getServerSession } from 'next-auth';

export async function GET(
    request: Request,
    { params: { slug } }: { params: { slug: string } }
) {
    try {
        const sess = await getServerSession();
        const data = await prisma.hackathon.findFirst({
            include: {
                projects: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                avatar: true,
                            },
                        },
                    },
                },

                _count: {
                    select: {
                        participants: true,
                    },
                },

                judges: true,
                participants: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                avatar: true,
                                id: true,
                            },
                        },
                    },
                },
            },
            where: { OR: [{ id: slug }, { slug: slug }] },
        });

        return NextResponse.json(
            {
                data,
                status: 200,
                message: 'Hackathon retrieved successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({
            data: null,
            status: 500,
            message: "An error occurred couldn't retrieve hackathon",
        });
    } finally {
        await prisma.$disconnect();
    }
}
export async function PATCH(request: Request, { slug }: { slug: string }) {
    try {
        const json = await request.json();
        const updated = await prisma.hackathon.update({
            data: json,
            where: {
                slug,
            },
        });
        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
    } finally {
        await prisma.$disconnect();
    }
}
