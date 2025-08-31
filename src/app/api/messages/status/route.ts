import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../lib/connect";
import { Message } from "../../../../../model/message";
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const { msgId, status } = await req.json();

    const updated = await Message.findOneAndUpdate(
      { id: msgId },
      { status },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err: unknown) {
    let message = "An unknown error occurred";
    if (err instanceof Error) {
      message = err.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
