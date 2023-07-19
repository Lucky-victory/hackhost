import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    return NextResponse.json(
        {
            title: 'TiDB Hackathon',
        },
        { status: 200 }
    );
}
export async function POST(request: Request) {
    const json = await request.json();
    const created = await prisma.hackathon.create({
        data: {
            title: 'First hackathon',
            userId: '1',
            description: 'Description',

            totalPrice: 45000,
            startDate: new Date(),
            endDate: new Date(),
            slug: 'first-hackathon-1',
        },
    });
    return NextResponse.json(created, { status: 201 });
}
