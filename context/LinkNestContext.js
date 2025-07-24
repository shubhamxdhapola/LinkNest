"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LinkNestContext = createContext();

export const LinkNestProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || 'dark');
  }, []);

  return (
    <LinkNestContext.Provider
      value={{ user, setUser, links, setLinks, theme, setTheme }}
    >
      {children}{" "}
    </LinkNestContext.Provider>
  );
};

export const useLinkNest = () => useContext(LinkNestContext);
