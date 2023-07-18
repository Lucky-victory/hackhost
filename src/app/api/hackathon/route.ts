import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
prisma;
export async function GET(request: Request) {
    return NextResponse.json(
        {
            data: { name: 'Lucky' },
        },
        { status: 200 }
    );
}
export async function POST(request: Request) {
    const json = request.json();

    return NextResponse.json(
        {
            data: { name: 'Lucky' },
        },
        { status: 200 }
    );
}
