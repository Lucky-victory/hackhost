import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET(
    request: Request,
    { params: { username } }: { params: { username: string } }
) {
    try {
        const user = await prisma.user.findFirst({
            select: {
                id: true,
                name: true,
                username: true,
                bio: true,
                avatar: true,
            },
            where: {
                OR: [
                    {
                        username: { equals: username },
                    },
                    {
                        id: { equals: username },
                    },
                ],
            },
        });

        return NextResponse.json({
            message: 'User retrieved successfully',
            data: user,
            status: 200,
        });
    } catch (error) {
        throw NextResponse.json(
            {
                data: null,
                status: 500,
                message: "An error occured, couldn't retrieve user",
            },
            { status: 500 }
        );
    }
}
export async function POST() {}
export async function PUT() {}
