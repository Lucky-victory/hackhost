import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../../../auth/[...nextauth]/route';
export async function GET(request: Request) {
    return NextResponse.json({});
}
export async function POST(
    request: Request,
    { params: { slug } }: { params: { slug: string } }
) {
    try {
        const sess = await getServerSession(authOptions);
        // const response = await prisma.hackathonParticipant.create({
        //     data: {
        //         hackathon: {},
        //     },
        // });
        const newParticipant = await prisma.hackathonParticipant.create({
            data: {
                hackathon: { connect: { slug: slug } },
                user: { connect: { email: sess?.user?.email as string } },
            },
        });
        console.log(newParticipant);

        return NextResponse.json(
            {
                data: newParticipant,
                status: 200,
                message: 'Hackathon Joined Successfully',
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
