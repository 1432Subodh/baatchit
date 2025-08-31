import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/connect";
import { Message } from "../../../../../model/message";
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newMsg = await Message.create(body);

    return NextResponse.json(newMsg, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
