import Overlay from "@/components/dashboard/Overlay";
import { useLinkNest } from "@/context/LinkNestContext";
import axios from "axios";
import {
  Eye,
  House,
  Loader2,
  LogOut,
  Moon,
  ScanEye,
  Search,
  SearchX,
  Share2,
  Sun,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Preview from "./Preview";

const BottomMenu = ({
  setIsMenuOpen,
  isMenuOpen,
  setIsSearchBarOpen,
  inputRef,
}) => {
  const { theme, setTheme } = useLinkNest();
  const navRef = useRef(null);
  const [preview, setPreview] = useState(false);

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
    inputRef.current.focus();
  };

  const handleSetPreview = () => {
    setPreview(true)
    setIsMenuOpen(false)
  }

  return (
    <>
      <div
        ref={navRef}
        className={`flex backdrop-blur-2xl rounded-full text-card-foreground p-3  items-center gap-5 fixed z-20 border left-1/2 -translate-x-1/2 duration-300 bg-card max-w-[90vw] overflow-scroll scrollbar-hide ${
          isMenuOpen ? "bottom-4" : "-bottom-[100vh]"
        }`}
      >
        <Link href={"/"}>
          <button className="bg-primary text-primary-foreground rounded-full p-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300">
            <House className="size-5" />
          </button>
        </Link>
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
          className="bg-primary text-primary-foreground rounded-full p-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300"
          onClick={handleSetPreview}
        >
          <ScanEye className="size-5" />
        </button>
        <button
          className="bg-primary text-primary-foreground rounded-full p-4 font-semibold content-center cursor-pointer hover:opacity-80 duration-300 group"
          onClick={openSearchBar}
        >
          <Search className="size-5" />
        </button>
      </div>
      {preview && <Preview setPreview={setPreview} />}
    </>
  );
};

export default BottomMenu;
