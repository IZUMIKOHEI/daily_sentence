"use client";
import DisplayCard from "@/components/DisplayCard";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { postType } from "@/types/postType";
import SearchBar from "@/components/SearchBar";
import { usePathname } from "next/navigation";

export default function Home() {
  const [allPosts, setAllPosts] = useState<postType[] | undefined>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedPosts, setSearchedPosts] = useState<postType[] | undefined>(
    []
  );
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      axios.get("/api/handlePosts").then((response) => {
        setAllPosts(response.data);
        console.log(response.data)
      });
    }
  }, [pathname]);

  const filterPosts = (searchText: string) => {
    const regex = new RegExp(searchText, "i");
    return allPosts?.filter(
      (item) =>
        regex.test(item.author.name) ||
        regex.test(item.tag) ||
        regex.test(item.content)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    timeoutId && clearTimeout(timeoutId);
    setSearchText(e.target.value);

    timeoutId = setTimeout(() => {
      const searchResult = filterPosts(e.target.value);
      setSearchedPosts(searchResult);
    }, 500);
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPosts(tagName);
    setSearchedPosts(searchResult);
  };

  return (
    <main className="flex-center flex-col">
      <Header
        title="这里每天都会更新一句"
        subtitle="凝聚着智慧与哲思的名言语段"
      />

      <SearchBar value={searchText} handleSearchChange={handleSearchChange} />

      {searchText ? (
        <div className="container flex-start mt-16 gap-16 flex-1 flex-wrap">
          {searchedPosts?.map((post) => (
            <DisplayCard
              key={post.id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
        </div>
      ) : (
        <div className="container flex-center xl:flex-start mt-16 gap-16 flex-1 flex-wrap">
          {allPosts?.map((post) => (
            <DisplayCard
              key={post.id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
        </div>
      )}
    </main>
  );
}
