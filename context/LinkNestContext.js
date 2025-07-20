"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { createContext, useContext, useEffect, useState } from "react";

const LinkNestContext = createContext();

export const LinkNestProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || 'dark');
  }, []);

  useEffect(() => {
    async function getDashboard() {
      setLoading(true);
      try {
        const response = await axios.get("/api/dashboard");
        setLoading(false);
        if (response.status === 200) {
          setUser(response?.data?.user);
          setLinks(response?.data?.links);
        }
      } catch (error) {
        console.log("Error in LinkNestContext", error);
      } finally {
        setLoading(false);
      }
    }
    getDashboard();
  }, []);
  // console.log('user in provider', user)
  // console.log('provider called', user)

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <span className="">
  //         <Loader2 className="animate-spin" />
  //       </span>
  //     </div>
  //   );
  // }

  return (
    <LinkNestContext.Provider
      value={{ user, setUser, links, setLinks, theme, setTheme, loading }}
    >
      {children}{" "}
    </LinkNestContext.Provider>
  );
};

export const useLinkNest = () => useContext(LinkNestContext);
