"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const pathname = usePathname();
  const hideLoginButton = !(
    pathname === "/auth/login" || pathname === "/auth/register"
  );

  return (
    <nav className="w-full z-10 p-3 flex-center bg-[#faead6]">
      <div className="max-w-7xl w-full flex-between">
        <Link href="/" className="flex-center gap-2">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <h1 className="text-lg font-semibold">每日一句</h1>
        </Link>

        <div className="hidden sm:flex">
          {session?.user ? (
            <div className="flex-between gap-8">
              <Link href="/createPostPage">
                <Button>新建一句</Button>
              </Link>
              <Button
                variant="outline"
                className="border border-black"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                退出账号
              </Button>
              <Link href="">
                {session?.user?.image ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Image
                        src={session?.user?.image as string}
                        alt="avatar"
                        width={32}
                        height={32}
                        className="rounded-full object-contain"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Card className="mt-3 mr-2 space-y-1 flex-end flex-col">
                        <Link href="/home">
                          <p className="w-full py-2 px-4 hover:bg-[#faead6]">
                            {session.user.name}的主页
                          </p>
                        </Link>
                        <div className="flex sm:hidden flex-col space-y-1 w-full">
                          <Link href="/createPostPage">
                            <p className="w-full py-2 px-4 hover:bg-[#faead6]">
                              新建一句
                            </p>
                          </Link>
                          <p
                            className="w-full py-2 px-4 hover:bg-[#faead6]"
                            onClick={() => signOut({ callbackUrl: "/" })}
                          >
                            退出账号
                          </p>
                        </div>
                      </Card>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Image
                        src={"/defaultAvatar.svg"}
                        alt="defaultavatar"
                        width={38}
                        height={38}
                        className="rounded-full"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Card className="mt-3 mr-2 space-y-1 flex-end flex-col">
                        <Link href="/home">
                          <p className="w-full py-2 px-4 hover:bg-[#faead6]">
                            {session.user.name}的主页
                          </p>
                        </Link>
                        <div className="flex sm:hidden flex-col space-y-1 w-full">
                          <Link href="/createPostPage">
                            <p className="w-full py-2 px-4 hover:bg-[#faead6]">
                              新建一句
                            </p>
                          </Link>
                          <p
                            className="w-full py-2 px-4 hover:bg-[#faead6]"
                            onClick={() => signOut({ callbackUrl: "/" })}
                          >
                            退出账号
                          </p>
                        </div>
                      </Card>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </Link>
            </div>
          ) : (
            <>
              {hideLoginButton && (
                <Link href="/auth/login">
                  <Button>登录</Button>
                </Link>
              )}
            </>
          )}
        </div>

        <div className="flex sm:hidden relative">
          {session?.user ? (
            <div className="flex">
              {session?.user?.image ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Image
                      src={session?.user?.image as string}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Card className="mt-3 mr-2 space-y-1 flex-end flex-col">
                      <p
                        onClick={() => router.push("/home")}
                        className="w-full py-2 px-4 hover:bg-[#faead6]"
                      >
                        {session.user.name}的主页
                      </p>
                      <div className="flex sm:hidden flex-col w-full">
                        <Link href="/createPostPage">
                          <p className="w-full py-2 px-4 hover:bg-[#faead6]">
                            新建一句
                          </p>
                        </Link>
                        <p
                          className="w-full py-2 px-4 hover:bg-[#faead6]"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          退出账号
                        </p>
                      </div>
                    </Card>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Image
                      src={"/defaultAvatar.svg"}
                      alt="defaultavatar"
                      width={38}
                      height={38}
                      className="rounded-full"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Card className="mt-3 mr-2 space-y-1 flex-end flex-col">
                      <p
                        onClick={() => router.push("/home")}
                        className="w-full py-2 px-4 hover:bg-[#faead6]"
                      >
                        {session.user.name}的主页
                      </p>
                      <div className="flex sm:hidden flex-col w-full">
                        <Link href="/createPostPage">
                          <p className="w-full py-2 px-4 hover:bg-[#faead6]">
                            新建一句
                          </p>
                        </Link>
                        <p
                          className="w-full py-2 px-4 hover:bg-[#faead6]"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          退出账号
                        </p>
                      </div>
                    </Card>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ) : (
            <>
              {hideLoginButton && (
                <Link href="/auth/login">
                  <Button>登录</Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
