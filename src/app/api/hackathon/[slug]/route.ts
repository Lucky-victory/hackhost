import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Hackathon, HackathonCreate } from '@/const';

export async function GET(
    request: Request,
    { params: { slug } }: { params: { slug: string } }
) {
    try {
        const data = await prisma.hackathon.findFirst({
            include: {
                projects: true,
                _count: {
                    select: {
                        participants: true,
                    },
                },

                judges: true,
                participants: true,
            },
            where: { slug },
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
    }
}
export async function PATCH(request: Request, { slug }: { slug: string }) {
    const json = await request.json();
    const updated = await prisma.hackathon.update({
        data: json,
        where: {
            slug,
        },
    });
    return NextResponse.json(updated, { status: 200 });
}
