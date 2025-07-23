"use client";
import { Key, KeyRound, Loader2, LogIn, LogOut, Moon, Search, Sun, User, UserPlus, UserRound, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLinkNest } from "@/context/LinkNestContext";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

const HomeNav = () => {
  const { user, setUser, setLinks, theme, setTheme } = useLinkNest();
  const [search, setSearch] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    window.open(search, "_blank");
  };
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const response = await axios.post("/api/auth/logout");
      setLoggingOut(false);
      toast.success(response?.data?.message);
      setUser(null);
      setLinks([]);
    } catch (error) {
      setLoggingOut(false);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <nav className="w-[95vw] lg:w-[90vw] backdrop-blur-2xl rounded-full mx-auto sticky top-6 h-18 text-card-foreground px-4 lg:px-8 py-4 justify-between items-center gap-10 lg:gap-15 xl:gap-20 hidden md:flex">
      <Link href={"/"}>
        <div className="logo font-bold text-lg lg:text-xl cursor-pointer hover:opacity-80 duration-300">
          <span>LinkNest</span>
        </div>
      </Link>
      <form onSubmit={handleSearch} className="flex-1">
        <div className="flex items-center justify-between relative bg-card rounded-full ps-6 pe-2 py-2 w-full border gap-2">
          <input
            type="text"
            className="border-none focus:outline-none flex-1 text-sm lg:text-md"
            placeholder="Search by username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-primary text-primary-foreground content-center p-2.5 rounded-full inline-block cursor-pointer hover:opacity-80 duration-300">
            <Search />
          </button>
        </div>
      </form>
      <div className="flex justify-center items-center text-gray-800 gap-6 text-sm">
        <button
          className="bg-primary text-primary-foreground rounded-full p-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300 group"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="duration-300" />
          ) : (
            <Moon className="duration-300" />
          )}
        </button>
        {user ? (
          <>
            <div
              className="relative h-15 w-15 border bg-card rounded-full text-card-foreground cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
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
            <button
              className={`${
                loggingOut
                  ? "opacity-70 cursor-not-allowed"
                  : "cursor-pointer hover:opacity-80"
              } bg-primary text-primary-foreground rounded-full px-4 lg:px-8 py-4 font-semibold content-center  duration-300`}
              onClick={handleLogout}
              disabled={loggingOut}
            >
              {loggingOut ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span className="hidden lg:inline-block">Logout</span>
                  <span className="lg:hidden"><LogOut /></span>
                </>
              )}
            </button>
          </>
        ) : (
          <>
            <Link href={"/auth/login"}>
              <button className="bg-primary text-primary-foreground rounded-full px-4 lg:px-8 py-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300">
                <span className="hidden lg:inline-block">Login</span>
                <span className="lg:hidden"><KeyRound /></span>
              </button>
            </Link>
            <Link href={"/auth/register"}>
              <button className="bg-secondary text-secondary-foreground border rounded-full px-4 lg:px-8 py-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300">
                      <span className="hidden lg:inline-block">Register</span>
                <span className="lg:hidden"><UserRoundPlus /></span>
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default HomeNav;
