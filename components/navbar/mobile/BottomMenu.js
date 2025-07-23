import { useLinkNest } from "@/context/LinkNestContext";
import axios from "axios";
import {
  Loader2,
  LogOut,
  Moon,
  Search,
  SearchX,
  Sun,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const BottomMenu = ({
  setIsMenuOpen,
  isMenuOpen,
  setIsSearchBarOpen,
  inputRef
}) => {
  const { user, setUser, setLinks, theme, setTheme } = useLinkNest();
  const [loggingOut, setLoggingOut] = useState(false);
  const navRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const hideMenu = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", hideMenu);
    return () => document.removeEventListener("mousedown", hideMenu);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const openSearchBar = () => {
    setIsSearchBarOpen(true);
    setIsMenuOpen(false);
    inputRef.current.focus()
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
    <div
      ref={navRef}
      className={`flex backdrop-blur-2xl rounded-full text-card-foreground p-3  items-center gap-5 fixed z-20 border left-1/2 -translate-x-1/2 duration-300 bg-card max-w-[90vw] overflow-scroll scrollbar-hide ${
        isMenuOpen ? "bottom-4" : "-bottom-[100vh]"
      }`}
    >
      {user ? (
        <>
          <div
            className="relative h-14 w-14 border bg-card rounded-full text-card-foreground cursor-pointer"
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
            } bg-primary text-primary-foreground rounded-full p-4 font-semibold content-center  duration-300`}
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <Loader2 className="animate-spin" />
            ) : (
              <LogOut className="size-5" />
            )}
          </button>
        </>
      ) : (
        <>
          <Link href={"/auth/login"}>
            <button className="bg-primary text-primary-foreground rounded-full px-8 py-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300">
              Login
            </button>
          </Link>
          <Link href={"/auth/register"}>
            <button className="bg-secondary text-secondary-foreground border rounded-full px-8 py-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300">
              Register
            </button>
          </Link>
        </>
      )}
      <button
        className="bg-primary text-primary-foreground rounded-full p-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300 group"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )}
      </button>
      <button
        className="bg-primary text-primary-foreground rounded-full p-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300 group"
        onClick={openSearchBar}
      >
        <Search className="size-5" />
      </button>
    </div>
  );
};

export default BottomMenu;
