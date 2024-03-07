import db from "@/libs/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await db.post.findMany({
      include: {
        author: true,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json("获取内容失败", { status: 500 });
  }
};
