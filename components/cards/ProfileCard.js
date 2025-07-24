"use client";
import Image from "next/image";
import { useLinkNest } from "@/context/LinkNestContext";
import {
  Copy,
  Ellipsis,
  Loader2,
  LogOut,
  User,
  UserPen,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProfileCard = ({ setIsProfileEditDialogOpen }) => {

  const { user, setUser, setLinks } = useLinkNest();
  const profileDialogRef = useRef(null);
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function hideOptionMenu(e) {
      if (
        profileDialogRef.current &&
        !profileDialogRef.current.contains(e.target)
      ) {
        setIsOptionMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", hideOptionMenu);
    return () => document.removeEventListener("mousedown", hideOptionMenu);
  });

  const handleEditProfile = () => {
    setIsProfileEditDialogOpen(true);
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const response = await axios.post("/api/auth/logout");
      setLoggingOut(false);
      toast.success(response?.data?.message);
      setUser(null);
      setLinks([]);
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoggingOut(false);
    }
  };

  async function handleCopyURL() {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST}/${user?.username}`
    );
    toast.success("Copied to clipboard");
  }

  return (
    <div className="sm:flex items-center justify-between p-4 sm:p-6 rounded-lg border relative">
      <div className="flex gap-4 sm:gap-6 items-center">
        <div className="relative h-20 w-20 sm:h-21 sm:w-21 border bg-card rounded-full text-card-foreground">
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
        <div className="space-y-1">
          <p className="font-semibold">
            <span>{user?.name}</span>
          </p>
          <p className="text-sm text-muted-foreground">{user?.username}</p>
          <p className="text-sm text-muted-foreground">{user?.bio}</p>
        </div>
      </div>

      <div className="sm:pe-2 cursor-pointer absolute top-2 right-4 sm:right-3 sm:top-1/2 sm:-translate-y-1/2">
        <div className="flex items-center justify-center">
          <span
            className="hover:opacity-80 duration-300"
            onClick={() => setIsOptionMenuOpen(!isOptionMenuOpen)}
          >
            {isOptionMenuOpen ? (
              <X className="size-5 hover:cursor-pointer" />
            ) : (
              <Ellipsis className="cursor-pointer" />
            )}
          </span>
        </div>
        <div
          ref={profileDialogRef}
          className={`bg-card absolute top-0 -left-50 rounded text-sm border shadow-md overflow-hidden duration-300 ${
            isOptionMenuOpen ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          <button
            className="py-3 px-4 border-b border-muted flex items-center gap-2 hover:bg-background w-full cursor-pointer"
            onClick={handleEditProfile}
          >
            <UserPen className="size-4" />
            <span>Edit Profile</span>
          </button>
          <button
            className="py-3 px-4 border-b border-muted flex items-center gap-2 hover:bg-background w-full cursor-pointer"
            onClick={handleCopyURL}
          >
            <Copy className="size-4" />
            <span>Copy Profile URL</span>
          </button>
          <button
            className={`py-3 px-4 flex items-center gap-2 w-full ${
              loggingOut
                ? "cursor-not-allowed opacity-80"
                : "hover:bg-background cursor-pointer"
            }`}
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Logging Out</span>
              </>
            ) : (
              <>
                <LogOut className="size-4" />
                <span>Logout</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
