import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Url from "@/models/url";
import redis from "@/lib/redis";
const CACHE_TTL = 24 * 60 * 60;

function generateShortCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export async function POST(req) {
  await connectToDatabase();
  const { url } = await req.json();

  if (!url || !url.startsWith("http") || !url.startsWith("https")) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const shortCode = generateShortCode();

  await Url.create({ originalUrl: url, shortCode });

  // Cache in Redis for 1 hour
  await redis.set(shortCode, url, "EX", CACHE_TTL);

  return NextResponse.json({
    shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/r/${shortCode}`
  });
}
