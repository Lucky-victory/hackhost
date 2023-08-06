import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    return NextResponse.json({
      message: "Mail sent",
    });
  } catch (error) {
    throw NextResponse.json({
      message: "error sending mail",
    });
  }
}
