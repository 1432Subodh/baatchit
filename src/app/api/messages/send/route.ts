import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../lib/connect";
import { Message } from "../../../../../model/message";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const newMsg = await Message.create(body);

    return NextResponse.json(newMsg, { status: 201 });
  } catch (err: unknown) {
    let message = "An unknown error occurred";
    if (err instanceof Error) {
      message = err.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
