"use client";

import CardWrapper from "@/components/CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setisSubmitting(true);
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    response?.ok
      ? toast("登录成功", { action: { label: "确定", onClick: () => "" } })
      : toast("输入的邮箱或者密码不对", {
          action: { label: "确定", onClick: () => "" },
        });
    setisSubmitting(false);
    router.push("/");
  };

  return (
    <CardWrapper
      title="登录"
      linkHref="/auth/register"
      OAuthLabel="用其他方式登录"
      linkLabel="注册"
      descLinkLabel="没有账号？"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input {...field} type="email" disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input {...field} type="password" disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errorMessage}
          <Button
            type="submit"
            className="w-full font-normal text-base mb-4"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? "登录..." : "登录"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginPage;
