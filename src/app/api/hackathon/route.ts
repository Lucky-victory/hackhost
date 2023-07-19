import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Hackathon } from '@/const';
import { Utils } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    const data = await prisma.hackathon.findMany({
      
      include: {
        submissions: true, participants: true
      }
    })
    
    return NextResponse.json(
      {
        data: data,
        status: 200,
        message: "Hackathons retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    
    return NextResponse.json(
      {
        data: null,
        status: 500,
        message:'An error occurred couldn\'t retrieve hackathons'
        },
      
        );
      }
    }
export async function POST(request: Request) {
    const json = await request.json() as Hackathon
    const { title,...rest} = json;
    const created = await prisma.hackathon.create({
      data: {...rest,title,
        slug: Utils.slugify(title),
      },
    });
    return NextResponse.json(created, { status: 201 });
}
