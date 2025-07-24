"use client";
import axios from "axios";
import { Loader, Share2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const GetUserByUsername = ({ params }) => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    async function getUserByUsername() {
      try {
        setLoading(true);
        const { username } = await params;
        const response = await axios.get(`/api/user/${username}`);
        setLoading(false);
        if (response.status === 200) {
          setUser(response?.data?.user);
          setLinks(response?.data?.links);
        }
      } catch (error) {
        console.log("Error in username route : ", error);
      } finally {
        setLoading(false);
        setHasFetched(true);
      }
    }
    getUserByUsername();
  }, []);

  const handleCopyURL = async () => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST}/${user?.username}`
    );
    toast.success("Profile link copied");
  };

  if (loading || !hasFetched) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin size-6" />
      </div>
    );
  }

  return (
    <>
      {user ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-background text-foreground border rounded-lg w-[95vw] sm:w-[60vw] md:w-[330px] px-4 py-6 scrollbar-hide max-h-[95vh] overflow-scroll hide-scrollbar relative">
            <span
              className="absolute right-4 top-4 hover:opacity-80 duration-300 cursor-pointer"
              onClick={handleCopyURL}
            >
              <Share2 className="size-4" />
            </span>
            <div className="text-center space-y-3 mt-10">
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
                <p className="text-muted-foreground max-w-[70%] mx-auto text-sm">
                  {user?.bio}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center mt-10">
              {links.length > 0 ? (
                links.map((link) => (
                  <Link
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    className="text-sm hover:text-muted-foreground bg-card border px-4 py-4 rounded-md w-full text-center hover:bg-background duration-300 group cursor-pointer flex justify-center items-center"
                  >
                    <span>{link.title}</span>
                  </Link>
                ))
              ) : (
                <div className="text-muted-foreground text-center mt-8">
                  No links available
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <span className="text-xl font-semibold">User not found</span>
        </div>
      )}
    </>
  );
};

export default GetUserByUsername;
