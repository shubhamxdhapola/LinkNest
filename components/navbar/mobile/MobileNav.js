"use client";
import { AlignRight, X } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import BottomMenu from "./BottomMenu";
import { useRef, useState } from "react";

const MobileNav = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const inputRef = useRef()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        className={`md:hidden flex backdrop-blur-2xl rounded-full sticky top-4 h-16 text-card-foreground px-4 py-4 justify-between items-center border duration-300 ${
          isSearchBarOpen ? "-translate-x-[100vw]" : "translate-x-0"
        }`}
      >
        <Link href={"/"}>
          <div className="logo font-bold text-lg cursor-pointer hover:opacity-80 duration-300">
            <span>LinkNest</span>
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

export default MobileNav;
