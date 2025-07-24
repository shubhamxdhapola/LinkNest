"use client";
import { useEffect, useState } from "react";
import { Link2, Loader } from "lucide-react";
import DashboardNav from "@/components/navbar/DashboardNav";
import UpdateProfile from "@/components/forms/profile/Update";
import Overlay from "@/components/dashboard/Overlay";
import AddLink from "@/components/forms/link/Add";
import ManageLinks from "@/components/dashboard/ManageLinks";
import Preview from "@/components/dashboard/Preview";
import ProfileCard from "@/components/cards/ProfileCard";
import { useLinkNest } from "@/context/LinkNestContext";
import axios from "axios";
import MobileDashboardNav from "@/components/navbar/mobile/dashboard-nav/MobileDashboardNav";

const Dashboard = () => {

  const [isAddLinkDialogOpen, setIsAddLinkDialogOpen] = useState(false);
  const [isProfileEditDialogOpen, setIsProfileEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const { setUser, setLinks } = useLinkNest();

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
        setHasFetched(true);
      }
    }
    getDashboard();
  }, []);

  if (loading || !hasFetched) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin size-6" />
      </div>
    );
  }

  return (
    <>
      <DashboardNav />
      <MobileDashboardNav />
      <div className="md:max-w-[90vw] mx-auto py-8 lg:flex justify-center md:gap-10">
        <div className="px-4 sm:px-8 md:w-1/2">
          <ProfileCard
            setIsProfileEditDialogOpen={setIsProfileEditDialogOpen}
          />

          <UpdateProfile
            isProfileEditDialogOpen={isProfileEditDialogOpen}
            setIsProfileEditDialogOpen={setIsProfileEditDialogOpen}
          />

          <div className="mt-6">
            <button
              className="bg-primary text-primary-foreground w-full py-2.5 rounded-lg mt-2 font-semibold text-sm flex justify-center items-center gap-2 cursor-pointer hover:bg-primary/80 duration-300"
              onClick={() => setIsAddLinkDialogOpen(true)}
            >
              Add Link
              <Link2 className="size-5" />
            </button>

            {isAddLinkDialogOpen && <Overlay />}

            <AddLink
              isAddLinkDialogOpen={isAddLinkDialogOpen}
              setIsAddLinkDialogOpen={setIsAddLinkDialogOpen}
            />

            <ManageLinks />
          </div>
        </div>
        <Preview />
      </div>
    </>
  );
};

export default Dashboard;
