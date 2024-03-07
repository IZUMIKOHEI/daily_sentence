import { PostSchema } from "@/schemas";
import db from "@/libs/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { authorId, tag, content } = await request.json();
  const toValidBody = { tag, content };
  const isValid = PostSchema.safeParse(toValidBody);
  if (!isValid.success)
    return NextResponse.json("输入的内容符合要求", { status: 500 });

  try {
    await db.post.create({
      data: {
        authorId,
        content,
        tag,
      },
    });
    return NextResponse.json("发表成功", { status: 200 });
  } catch (error) {
    return NextResponse.json("服务器抛出异常", { status: 500 });
  }
};
