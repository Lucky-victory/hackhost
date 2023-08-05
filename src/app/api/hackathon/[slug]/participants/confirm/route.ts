import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';

export async function GET(
    request: Request,
    { params: { slug } }: { params: { slug: string } }
) {
    try {
        const sess = await getServerSession(authOptions);
        console.log({ sess });

        if (!sess?.user) {
            return NextResponse.json(
                {
                    data: { hasJoined: false },
                    status: 200,
                    message: 'Already joined',
                },
                { status: 200 }
            );
        }
        const participant = await prisma.hackathonParticipant.findFirst({
            where: {
                hackathon: { slug },
                AND: {
                    user: { email: sess?.user?.email as string },
                },
            },
        });
        console.log({ participant }, 'here');
        if (participant) {
            return NextResponse.json(
                {
                    data: { hasJoined: true },
                    status: 200,
                    message: 'Already joined',
                },
                { status: 200 }
            );
        }
        return NextResponse.json(
            {
                data: { hasJoined: false },
                status: 200,
                message: 'Not yet Joined',
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { data: null, status: 500, message: 'An error occured' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
