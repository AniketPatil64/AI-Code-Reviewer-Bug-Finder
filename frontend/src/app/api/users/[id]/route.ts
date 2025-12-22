import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectToMongoDB } from "../../../../../types/db";

// GET USER BY ID
export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await connectToMongoDB();
  const user = await User.findById(id);
  return NextResponse.json(user);
}


// UPDATE USER
export async function PUT(req: Request,  context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();
  await connectToMongoDB();

  const updatedUser = await User.findByIdAndUpdate(id, body, {
    new: true,
  });

  return NextResponse.json(updatedUser);
}

// DELETE USER
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
 const { id } = await context.params;      
  await connectToMongoDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" });
}
