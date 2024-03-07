import db from "@/libs/db";
import { PostSchema } from "@/schemas";
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
    return NextResponse.json("你还没有发表过一句", { status: 404 });
  }
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { tag, content } = await request.json();
  const toValidBody = { tag, content };
  const isValid = PostSchema.safeParse(toValidBody);
  if (!isValid.success)
    return NextResponse.json("输入的内容不符合要求", { status: 500 });

  try {
    const existringPost = await db.post.findFirst({ where: { id: params.id } });

    if (!existringPost) {
      return NextResponse.json("没有发现内容", { status: 404 });
    }

    const data = await db.post.update({
      where: {
        id: params.id,
      },
      data: {
        content,
        tag,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json("Unhandle problems", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await db.post.delete({ where: { id: params.id } });
    return NextResponse.json("成功删除", { status: 200 });
  } catch (error) {
    return NextResponse.json("服务器问题", { status: 500 });
  }
};
