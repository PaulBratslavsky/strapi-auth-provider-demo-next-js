import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStrapiURL } from "@/lib/utils";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const { searchParams, pathname } = new URL(request.url);
  const token = searchParams.get("access_token");
  const provider = pathname.split("/")[2]; 

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  const backendUrl = getStrapiURL();
  const path = `/api/auth/${provider}/callback`;

  const url = new URL(backendUrl + path);
  url.searchParams.append("access_token", token);

  const res = await fetch(url.href);
  const data = await res.json();

  const cookieStore = await cookies();
  cookieStore.set("jwt", data.jwt, config);

  return NextResponse.redirect(new URL("/", request.url));
}
