import { NextResponse } from "next/server";
import { History } from "@/models/History";
import { connectToMongoDB } from "../../../../types/db";

export async function POST(req: Request) {
  await connectToMongoDB();

  const { userId, inputCode, aiResponse, language } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const history = await History.create({
    userId,
    inputCode,
    aiResponse,
    language
  });

  return NextResponse.json(history, { status: 201 });
}

export async function GET(req: Request) {
  await connectToMongoDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  console.log("Fetching history for user ID:", userId);

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }
    const skip = (page - 1) * limit;
    const [history, total] = await Promise.all([
    History.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    History.countDocuments({ userId }),
  ]);

  return NextResponse.json({
    data: history,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
