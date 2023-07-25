import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET(request: Request) {
    return NextResponse.json({});
}
export async function POST(
    request: Request,
    { params: { slug } }: { params: { slug: string } }
) {
    try {
        const sess = await getServerSession();
        // const response=await prisma.hackathonParticipant.create({
        //   data:{

        //   }
        // })
        return NextResponse.json(
            {
                data: null,
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
    }
}
