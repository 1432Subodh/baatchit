import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/connect";
import { Message } from "../../../../../model/message";
export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { msgId, status } = await req.json();

    const updated = await Message.findOneAndUpdate(
      { id: msgId },
      { status },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
