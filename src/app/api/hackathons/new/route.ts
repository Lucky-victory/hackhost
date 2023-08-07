import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Hackathon, HackathonCreate } from "@/const";
import { Utils } from "@/lib/utils";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const sess = await getServerSession();

    const json = await request.json();
    const { title, judges, ...rest } = json;
    const created = await prisma.hackathon.create({
      data: {
        ...rest,
        title,
        slug: Utils.slugify(title),
        user: {
          connect: {
            email: sess?.user?.email as string,
          },
        },
        judges: {
          createMany: { data: judges },
        },
      },
    });
    return NextResponse.json(
      {
        data: created,
        status: 201,
        message: "Hackathon added successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { data: null, message: "An error occured couldn't add hackathon" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
