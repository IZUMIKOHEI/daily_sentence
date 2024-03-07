"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { postType } from "@/types/postType";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineEditNote } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
interface DisplayCardProps {
  post: postType;
  handleTagClick?: (tagName: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const DisplayCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: DisplayCardProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const handleCardClick = () => {
    if (post.author.id === session?.user.id) {
      return router.push("/home");
    } else {
      router.push(`/home/${post.authorId}?name=${post.author.name}`);
    }
  };

  return (
    <Card className="w-full max-w-[350px]">
      <div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex gap-4 flex-wrap">
              {post?.author?.image ? (
                <Image
                  src={session?.user?.image as string}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full object-contain"
                />
              ) : (
                <Image
                  src={"/defaultAvatar.svg"}
                  alt="defaultavatar"
                  width={42}
                  height={42}
                  className="rounded-full"
                />
              )}
              <div className="flex flex-col text-sm">
                <p className="font-semibold">{post?.author?.name}</p>
                <p className=" text-gray-400">{post?.author?.email}</p>
              </div>
            </div>
            {session?.user.id === post.authorId && pathname === "/home" && (
              <div className="space-x-2 flex">
                {/* <Link href="/"> */}
                <MdOutlineEditNote
                  size={24}
                  onClick={handleEdit}
                  className="hover:opacity-50 "
                />
                {/* </Link> */}
                <IoCloseCircleOutline
                  size={24}
                  onClick={handleDelete}
                  className="hover:opacity-50"
                />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent onClick={handleCardClick} className="cursor-pointer">
          {post.content}
        </CardContent>
      </div>
      <CardFooter className="flex flex-col items-start">
        {post.tag && (
          <p
            onClick={() => handleTagClick && handleTagClick(post.tag)}
            className="px-4 py-0.5 border rounded-xl text-sm text-[#d39850] shadow-sm cursor-pointer"
          >
            {post.tag}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default DisplayCard;
