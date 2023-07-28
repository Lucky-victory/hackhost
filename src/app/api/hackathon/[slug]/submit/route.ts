import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Hackathon, HackathonCreate } from '@/const';
import { Utils } from '@/lib/utils';
import { getServerSession } from 'next-auth';

// export async function GET(request: Request) {
//     try {
//         const data = await prisma.hackathon.findMany({
//             where: {
//                 status: {
//                     equals: 'PUBLISHED',
//                 },
//             },

//             include: {
//                 _count: {
//                     select: {
//                         participants: true,
//                     },
//                 },
//             },
//         });
//         const sess = await getServerSession();
//         console.log({ sess });
//         return NextResponse.json(
//             {
//                 data: data,
//                 status: 200,
//                 message: 'Hackathons retrieved successfully',
//             },
//             { status: 200 }
//         );
//     } catch (error) {
//         throw NextResponse.json(
//             {
//                 data: null,
//                 status: 500,
//                 message: "An error occurred couldn't retrieve hackathons",
//             },
//             { status: 500 }
//         );
//     }
// }
export async function POST(request: Request, { params: { slug } }: { params: { slug: string } }) {
    try {
        const sess = await getServerSession();

        const json = await request.json();
        const { title, toolsUsed, ...rest } = json;
        const created = await prisma.project.create({
            
            data: {
                ...rest,
                title,
                slug: Utils.slugify(title),
                hackathon:{
connect:{slug}
                },
                user: {
                    connect: {
                        email: sess?.user?.email as string,
                    },
                },
               
                
            },
        });
        return NextResponse.json(
            {
                data: created,
                status: 201,
                message: 'Project added successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        throw NextResponse.json(
            { data: null, message: "An error occured couldn't add project" },
            { status: 500 }
        );
    }
}
