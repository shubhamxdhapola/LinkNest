"use client";
import HomeNav from "@/components/navbar/HomeNav";
import { useLinkNest } from "@/context/LinkNestContext";
import { SOCIAL_HANDLES } from "@/utils/data";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import MobileNav from "@/components/navbar/mobile/home-nav/MobileNav";

export default function Home() {

  const { setUser } = useLinkNest();
  const [loading, setLoading] = useState(false);
  const [hasfetched, setHasFetched] = useState(false);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const response = await axios.get("/api/user");
        setLoading(false);
        if (response.status === 200) {
          setUser(response?.data?.user);
        }
      } catch (error) {
        console.log("Error in getUser", error);
      } finally {
        setHasFetched(true);
        setLoading(false);
      }
    }
    getUser();
  }, []);

  if (loading || !hasfetched) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }
  return (
    <div className=" px-3 sm:px-4 py-4">
      <HomeNav />
      <MobileNav />
      <main>
        <section className="min-h-[calc(100vh-72px)] flex justify-center md:items-center gap-8 px-3 sm:px-4 md:px-10 lg:px-15">
          <div className="py-16 lg:py-0">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-card-foreground max-w-7xl md:max-w-6xl lg:max-w-5xl mx-auto leading-14 md:leading-18 lg:leading-20 xl:leading-22 text-left md:text-center">
              Your entire brand. In one beautiful bio link.
            </h1>
            <p className="mt-3 text-muted-foreground max-w-5xl md:max-w-xl lg:max-w-3xl mx-auto text-sm md:text-md text-justify md:text-center">
              Combine all the things you’re working on—projects, passions,
              social profiles, and side hustles—into a single shareable page.
            </p>
            <div className="flex flex-col md:flex-row items-start gap-10 md:gap-5 mt-10 justify-center">
              <Link href={"/dashboard"}>
                <button className="bg-primary border text-primary-foreground rounded-full cursor-pointer px-6 py-4 font-semibold text-sm hover:bg-primary/80 duration-300">
                  Go to Dashboard
                </button>
              </Link>
              <div className="flex items-center space-x-4 md:-space-x-2 ">
                {SOCIAL_HANDLES.map((item, index) => (
                  <Link
                    key={index}
                    href={item.socialHandleUrl}
                    target="_blank"
                    className="inline-block p-4 border bg-secondary text-secondary-foreground rounded-full content-center cursor-pointer transition-all duration-300 hover:text-primary-foreground hover:bg-primary hover:-translate-y-1"
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
    </div>
  );
}
