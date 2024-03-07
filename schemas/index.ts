import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "邮箱不能为空",
  }),
  password: z.string().min(1, {
    message: "密码不能为空",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "名字不能为空",
  }),
  email: z.string().email({
    message: "邮箱不能为空",
  }),
  password: z.string().min(6, {
    message: "密码不能少于6位数",
  }),
});

export const PostSchema = z.object({
  content: z.string().min(1, {
    message: '内容不能为空'
  }),
  tag: z.string().optional()
})