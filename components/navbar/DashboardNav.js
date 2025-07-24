"use client";
import { useLinkNest } from "@/context/LinkNestContext";
import {
  House,
  LayoutDashboard,
  Moon,
  Search,
  Share2,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const DashboardNav = () => {
  const { theme, setTheme, user } = useLinkNest();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    window.open(search, "_blank");
  };

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST}/${user?.username}`
    );
    toast.success("Profile link copied");
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="px-12 backdrop-blur-2xl sticky top-0 text-card-foreground py-5 md:flex justify-between items-center gap-20 z-10 hidden">
      <div className="logo font-semibold text-xl flex items-center gap-2">
        <LayoutDashboard className="size-5" />
        <span>Dashboard</span>
      </div>
      <form onSubmit={handleSearch} className="flex-1 mx-10">
        <div className="flex items-center justify-between relative rounded-full ps-6 pe-2 py-2 border gap-2 bg-card">
          <input
            type="text"
            className="border-none focus:outline-none flex-1 w-full"
            placeholder="Search by username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-primary text-primary-foreground content-center p-2.5 rounded-full inline-block cursor-pointer hover:opacity-80 duration-300">
            <Search />
          </button>
        </div>
      </form>
      <div className="flex items-center gap-4">
        <Link href={"/"}>
          <button className="bg-primary text-primary-foreground rounded-full p-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300">
            <House className="size-5" />
          </button>
        </Link>

        <button
          className="bg-primary text-primary-foreground rounded-full p-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300"
          onClick={handleCopyUrl}
        >
          <Share2 className="size-5" />
        </button>

        <button
          className="bg-primary text-primary-foreground rounded-full p-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="duration-300" />
          ) : (
            <Moon className="duration-300" />
          )}
        </button>
      </div>
    </div>
  );
};

export default DashboardNav;
