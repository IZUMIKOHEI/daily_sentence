import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface CardWrapperProps {
  children: React.ReactNode;
  title: string;
  OAuthLabel: string;
  linkLabel: string;
  descLinkLabel: string;
  linkHref: string;
}

const CardWrapper = ({
  children,
  title,
  OAuthLabel,
  linkLabel,
  linkHref,
  descLinkLabel,
}: CardWrapperProps) => {
  return (
    <section className="flex-center h-full bg-[#faead6] opacity-95">
      <Card className="w-[350px] flex-center flex-col shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl tracking-wider">{title}</CardTitle>
        </CardHeader>
        <CardContent className="w-full">{children}</CardContent>
        <CardFooter className="w-full flex-col">
          <div className="flex-center flex-col gap-3 mb-4">
            <div className="text-sm">{OAuthLabel}</div>
            <FaGithub
              size={28}
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="cursor-pointer"
            />
          </div>
          <hr className="w-full  " />
          <div className="mt-4 text-sm flex gap-2">
            <span className="text-slate-400 tracking-wide">
              {descLinkLabel}
            </span>
            <Link
              href={linkHref}
              className=" text-blue-400 hover:underline hover:opacity-70 cursor-pointer"
            >
              {linkLabel}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default CardWrapper;
