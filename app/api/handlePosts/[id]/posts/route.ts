import db from "@/libs/db";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const data = await db.post.findMany({
      where: { authorId: params.id },
      include: { author: true },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json("查询出现问题，抛出异常", { status: 500 });
  }
};
