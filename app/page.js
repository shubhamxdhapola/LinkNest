"use client";
import HomeNav from "@/components/navbar/HomeNav";
import { useLinkNest } from "@/context/LinkNestContext";
import { SOCIAL_HANDLES } from "@/utils/data";
import axios from "axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { setUser, user } = useLinkNest();

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const response = await axios.get("/api/dashboard");
        setLoading(false);
        if (response.status === 200) {
          setUser(response?.data?.user);
        }
      } catch (error) {
        console.log("Error in getUser", error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <HomeNav />
      <main>
        <section className="min-h-[calc(100vh-72px)] flex justify-around items-center gap-8 px-15">
          <div className="text-center">
            <h1 className="text-7xl leading-22 font-extrabold tracking-tight text-card-foreground max-w-5xl mx-auto">
              Your entire brand. In one beautiful bio link.
            </h1>
            <p className="mt-2 text-muted-foreground max-w-3xl text-center mx-auto">
              Put all your cool stuff in one easy-to-share page. Perfect for
              creators, side hustlers, and anyone doing awesome things online.
            </p>
            <div className="flex items-center gap-5 mt-10 justify-center">
              <Link href={"/dashboard"}>
                <button className="bg-primary border text-primary-foreground rounded-full cursor-pointer px-6 py-4 font-semibold text-sm hover:bg-primary/80 duration-300">
                  Go to Dashboard 
                </button>
              </Link>
              <div className="flex items-center -space-x-2 ">
                {SOCIAL_HANDLES.map((item, index) => (
                  <Link
                    key={index}
                    href={item.socialHandleUrl}
                    target="_blank"
                    className="inline-block p-4 border bg-secondary text-secondary-foreground  rounded-full content-center cursor-pointer transition-all duration-300 hover:text-primary-foreground hover:bg-primary hover:-translate-y-1"
                  >
                    <span>
                      {<item.icon className="duration-300 text-xl mx-auto" />}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
