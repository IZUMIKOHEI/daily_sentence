"use client";

import DisplayCard from "@/components/DisplayCard";
import Header from "@/components/Header";
import { postType } from "@/types/postType";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const OthersHomePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const authorName = useSearchParams().get("name");
  const [othersPosts, setOthersPost] = useState<postType[] | undefined>([]);
  useEffect(() => {
    if (params?.id) {
      axios
        .get(`/api/handlePosts/${params.id}/posts`)
        .then((response) => setOthersPost(response.data))
        .catch((error) =>
          toast("获取内容失败，请刷新一下", {
            action: { label: "确定", onClick: () => router.refresh() },
          })
        );
    }
  }, [params.id, router]);

  return (
    <>
      <Header
        title={`欢迎来到${authorName}的主页`}
        subtitle="你正在以访客的身份浏览"
      />
      <div className="container flex-center xl:flex-start mt-16 gap-16 flex-1 flex-wrap">
        {othersPosts?.map((post) => (
          <DisplayCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default OthersHomePage;
