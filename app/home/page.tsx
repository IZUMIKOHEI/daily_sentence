"use client";

import DisplayCard from "@/components/DisplayCard";
import Header from "@/components/Header";
import { postType } from "@/types/postType";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [myPosts, setMyPosts] = useState<postType[] | undefined>([]);

  useEffect(() => {
    if (session?.user.id) {
      axios
        .get(`/api/handlePosts/${session?.user.id.toString()}`)
        .then((response) => setMyPosts(response.data))
        .catch((error) =>
          toast("获取内容失败，请刷新一下", {
            action: { label: "确定", onClick: () => router.refresh() },
          })
        );
    }
  }, [session?.user.id, router]);

  console.log(myPosts);

  const handleEdit = async (post: postType) => {
    router.push(`/updatePost?id=${post.id}`);
    // router.push('/');
    // router.back();
  };

  const handleDelete = async (post: postType) => {
    await axios.delete(`/api/handlePosts/${post.id}`);
    const filterPosts = myPosts?.filter((item) => item.id !== post.id);
    setMyPosts(filterPosts);
  };

  return (
    <>
      <Header
        title={`欢迎来到你的主页,  ${
          session?.user.name ? session?.user.name : ""
        }`}
        subtitle="你可以编辑和删除发表过的内容"
      />
      <div className="container flex-center xl:flex-start mt-16 gap-16 flex-1 flex-wrap">
        {myPosts?.map((post) => (
          <DisplayCard
            key={post.id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
