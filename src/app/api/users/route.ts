import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      message: "Users retrieved successfully",
      data: users,
      status: 200,
    });
  } catch (error) {
    throw NextResponse.json(
      {
        data: null,
        status: 500,
        message: "An error occured, couldn't retrieve users",
      },
      { status: 500 },
    );
  }
}
export async function POST() {}
export async function PUT() {}
