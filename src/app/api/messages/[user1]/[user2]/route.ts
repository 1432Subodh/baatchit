import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "../../../../../../lib/connect";
import { Message } from "../../../../../../model/message";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ user1: string; user2: string }> }
) {
  try {
    await connectDB();

    // Await the promise to get actual params
    const { user1, user2 } = await context.params;

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
