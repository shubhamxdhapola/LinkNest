"use client";
import { useLinkNest } from "@/context/LinkNestContext";
import { useEffect } from "react";

const ThemeSetter = () => {
  const { theme } = useLinkNest();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return null;
};

export default ThemeSetter;
