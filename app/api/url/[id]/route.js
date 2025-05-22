import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Url from "@/models/url";
import redis from "@/lib/redis";

const CACHE_TTL = 24 * 60 * 60; 
export async function GET(request,context) {
  const { id } = await context.params;

  // Try fetching from Redis cache
  const cachedUrl = await redis.get(id);
  if (cachedUrl) {
    console.log("Getting From redis")
    return NextResponse.json({ originalUrl: cachedUrl });
  }

  await connectToDatabase();

  const url = await Url.findOne({ shortCode: id }).lean();

  if (!url) {
    return NextResponse.json({ error: "Short URL not found" }, { status: 404 });
  }

  // Save to Redis cache
  await redis.set(id, url.originalUrl, "EX", CACHE_TTL);
  console.log("Getting from Server")
  return NextResponse.json({ originalUrl: url.originalUrl });
}
