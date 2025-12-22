import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectToMongoDB } from "../../../../types/db";


// CREATE USER
export async function POST(req: Request) {
  const body = await req.json();
  await connectToMongoDB();

  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    return NextResponse.json(existingUser);
  }

  const user = await User.create(body);
  return NextResponse.json(user, { status: 201 });
}


// GET ALL USERS
export async function GET() {
  await connectToMongoDB();
  const users = await User.find();
  return NextResponse.json(users);
}
