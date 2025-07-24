"use client";
import { AlignRight, LayoutDashboard, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import BottomMenu from "./BottomMenu";
import SearchBar from "./SearchBar";

const MobileDashboardNav = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const inputRef = useRef()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        className={`md:hidden flex backdrop-blur-2xl sticky top-0 h-16 text-card-foreground px-4 py-4 justify-between items-center border-b duration-300 z-30 ${
          isSearchBarOpen ? "-translate-y-[100vh]" : "translate-y-0"
        }`}
      >
        <Link href={"/"}>
          <div className="logo font-semibold text cursor-pointer hover:opacity-80 duration-300 flex justify-center items-center gap-2">
            <LayoutDashboard className="size-4" />
            <span>Dashboard</span>
          </div>
        </Link>
        <div onClick={toggleMenu}>{isMenuOpen ? <X /> : <AlignRight />}</div>
      </nav>

      <SearchBar
        isSearchBarOpen={isSearchBarOpen}
        setIsSearchBarOpen={setIsSearchBarOpen}
        inputRef={inputRef}
      />

      <BottomMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsSearchBarOpen={setIsSearchBarOpen}
        inputRef={inputRef}
      />
    </>
  );
};

export default MobileDashboardNav;
