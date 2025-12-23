import { History } from "@/models/History";
import { connectToMongoDB } from "../../../../../types/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await connectToMongoDB(); 
    const history = await History.findById(id);
    return NextResponse.json(history);
}