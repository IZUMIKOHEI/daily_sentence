import { RegisterSchema } from "@/schemas";
import { NextResponse } from "next/server";
import db from "@/libs/db";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  const body = await request.json();
  const validBody = RegisterSchema.safeParse(body);

  if (!validBody.success) {
    return NextResponse.json({ error: "邮箱或者密码不对" });
  }

  const { name, email, password } = validBody.data;

  const isExistingUser = await db.user.findUnique({ where: { email } });

  if (isExistingUser) {
    return NextResponse.json("邮箱已经被使用", { status: 500 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json('Success', {status: 200});
};
