import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    if (request.nextUrl.pathname === "/dashboard") {
      return NextResponse.rewrite(new URL("/dashboard/overview", request.url));
    }
  } catch (error) {
    console.log({ error });
  }
}
