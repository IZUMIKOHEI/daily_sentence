"use client";
import ChangePost from "@/components/ChangePost";
import Header from "@/components/Header";
import { PostSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreatePost = () => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
      .post("/api/createPost", { content, tag, authorId: session?.user?.id })
      .then(() =>
        toast("发表成功，点击确定查看内容", {
          action: { label: "确定", onClick: () => router.push("/") },
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
        title="你可以在这里发表一句话"
        subtitle="其他人可以看到你发的一句"
      />
      <ChangePost
        form={form}
        handleSbumit={form.handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        title="新建一句"
      />
    </>
  );
};

export default CreatePost;
