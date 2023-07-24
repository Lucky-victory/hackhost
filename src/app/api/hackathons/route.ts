import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Hackathon, HackathonCreate } from "@/const";
import { Utils } from "@/lib/utils";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    const data = await prisma.hackathon.findMany({
      where: {
        status: {
          equals: "PUBLISHED",
        },
      },

      include: {
        
        _count: {
          
          select: {
            
            participants: true,
          },
        },
      },
    });
    const sess = await getServerSession();
    console.log({sess});
    return NextResponse.json(
      {
        data: data,
        status: 200,
        message: "Hackathons retrieved successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({
      data: null,
      status: 500,
      message: "An error occurred couldn't retrieve hackathons",
    },{status:500});
  }
}
export async function POST(request: Request) {
  try {
    
    const sess = await getServerSession();
    console.log({sess});
    
    const json = await request.json()
    const { title,judges, ...rest } = json 
    const created = await prisma.hackathon.create({
   
      data: { ...rest, title, slug: Utils.slugify(title),user:{
        connect:{
email:sess?.user?.email as string
        },
     
      } ,   judges:{
createMany:{data:judges}
        }},
      
    })
    return NextResponse.json({data:created,status:201,message:'Hackathon added successfully'}, { status: 201 });
  } catch (error) {
    return NextResponse.json({data:null,message:'An error occured couldn\'t add hackathon'}, { status: 500 });
  }
}
