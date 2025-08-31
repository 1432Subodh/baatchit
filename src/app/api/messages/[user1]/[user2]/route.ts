import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "../../../../../../lib/connect";
import { Message } from "../../../../../../model/message";

export async function GET(
  req: NextRequest,
  { params }: { params: { user1: string; user2: string } } // Do NOT make this a Promise
) {
  try {
    await connectDB();

    const { user1, user2 } = params;

    const messages = await Message.find({
      $or: [
        { from: user1, to: user2 },
        { from: user2, to: user1 },
      ],
    }).sort({ time: 1 });

    return NextResponse.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
