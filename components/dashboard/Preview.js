import { useLinkNest } from "@/context/LinkNestContext";
import { ChevronRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Preview = () => {
  const { user, links } = useLinkNest();
  return (
    <div className="w-1/2">
      <div className="fixed left-[75%] -translate-x-[50%]">
        <div className="mb-5">
          <Link
            href={`${process.env.NEXT_PUBLIC_HOST}/${user?.username}`}
            target="_blank"
          >
            <p className="text-sm group underline-offset-2 hover:text-card-foreground/80 duration-300 cursor-pointer flex justify-center items-center gap-1 hover:underline">
              <span>View your LinkNest</span>
              <ChevronRight className="size-4 group-hover:translate-x-1 duration-300" />
            </p>
          </Link>
        </div>
        <div className="bg-background border-2 rounded-xl overflow-y-scroll shadow-xl py-5 px-5 scrollbar-hide  w-[310px] min-h-[70vh] max-h-[70vh]">
          <div className="text-center space-y-3 mt-8">
            <div className="relative h-20 w-20 border bg-card rounded-full text-card-foreground mx-auto">
              {user?.profilePic ? (
                <Image
                  src={user?.profilePic}
                  fill={true}
                  alt="profile-pic"
                  className="object-fit rounded-full"
                />
              ) : (
                <div className="flex justify-center items-center h-full">
                  <User />
                </div>
              )}
            </div>
            <div className="space-y-0.5">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-muted-foreground max-w-[80%] mx-auto text-sm">
                {user?.bio}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center mt-10">
            {links?.length > 0 &&
              links?.map((link) => (
                <Link
                  key={link?._id}
                  href={link?.url}
                  target="_blank"
                  className="text-sm hover:text-muted-foreground bg-card border px-4 py-3.5 rounded-md w-full text-center hover:bg-background duration-300 group cursor-pointer "
                >
                  <span>{link?.title}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
