import db from "@/libs/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await db.post.findMany({
      include: {
        author: true,
      },
    });

    const resWithoutPassword = response.map((data) => {
      data.author.hashedPassword = null
      return data;
    })

    return NextResponse.json(resWithoutPassword, { status: 200 });
  } catch (error) {
    return NextResponse.json("获取内容失败", { status: 500 });
  }
};
