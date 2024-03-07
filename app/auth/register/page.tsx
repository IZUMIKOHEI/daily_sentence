"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/CardWrapper";
import { RegisterSchema } from "@/schemas";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const RegisterPage = () => {
  const [isSubmitting, setisSubmitting] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    setisSubmitting(true);

    axios
      .post("/api/register", values)
      .then(() => {
        signIn("credentials", {
          ...values,
          callbackUrl: "/",
        });
      })
      .catch(() =>
        toast("出现问题，请重试一下", {
          action: { label: "确定", onClick: () => "" },
        })
      )
      .finally(() => setisSubmitting(false));
  };

  return (
    <CardWrapper
      title="注册"
      OAuthLabel="用以下方式注册并登录"
      descLinkLabel="已经有账号?"
      linkLabel="登录"
      linkHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>用户名</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isSubmitting} />
                </FormControl>
              </FormItem>
            )}
          />
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
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? "注册..." : "注册"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterPage;
