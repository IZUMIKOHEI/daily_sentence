"use client";

import ChangePost from "@/components/ChangePost";
import Header from "@/components/Header";
import { PostSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const UpdatePost = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const postId = useSearchParams().get("id");
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
      tag: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsSubmitting(true);
    const { tag, content } = data;
    axios
      .post(`/api/handlePosts/${postId}`, {
        content,
        tag,
      })
      .then(() =>
        toast("修改成功，点击确定查看修改内容", {
          action: { label: "确定", onClick: () => router.push("/home") },
        })
      )
      .catch((error) =>
        toast(`错误类型: ${error.response.status}`, {
          action: { label: "确定", onClick: () => "" },
        })
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <Header
        title="你可以在这里修改之前发布的内容"
        subtitle="提交之后之前修改的内容会被更改"
      />
      <ChangePost
        isSubmitting={isSubmitting}
        form={form}
        handleSbumit={form.handleSubmit(onSubmit)}
        title="修改"
      />
    </>
  );
};

export default UpdatePost;
