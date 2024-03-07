import db from "@/libs/db";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const response = await db.post.findMany({
      where: { authorId: params.id },
      include: { author: true },
    });

    const resWithoutPassword = response.map((data) => {
      data.author.hashedPassword = null;
      return data;
    });

    return NextResponse.json(resWithoutPassword, { status: 200 });
  } catch (error) {
    return NextResponse.json("查询出现问题，抛出异常", { status: 500 });
  }
};
