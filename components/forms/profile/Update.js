"use client";
import axios from "axios";
import { AtSign, Loader2, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLinkNest } from "@/context/LinkNestContext";
import Overlay from "../../dashboard/Overlay";
import FormHeader from "@/components/header/FormHeader";
import Input from "@/components/inputs/Input";
import ProfilePhotoSelector from "./ProfilePhotoSelector";

const UpdateProfile = ({
  isProfileEditDialogOpen,
  setIsProfileEditDialogOpen,
}) => {
  const { user, setUser } = useLinkNest();
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    profilePic: user?.profilePic,
    name : user?.name,
    username: user?.username,
    bio: user?.bio,
  });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateFrom = () => {
    if (!formData?.username?.trim()) return toast.error("Username is required");
    return true;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateFrom();
    if (isFormValid === true) {
      try {
        setIsSubmitting(true);
        const response = await axios.patch("/api/user/update-profile", {
          ...formData,
          userId: user._id,
        });
        setIsSubmitting(false);
        if (response.status === 200) {
          toast.success(response.data.message);
          setUser((prevData) => ({
            ...prevData,
            ...response?.data?.updatedUser,
          }));
          setIsProfileEditDialogOpen(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      {isProfileEditDialogOpen && <Overlay />}
      <div
        className={`bg-card p-4 md:p-6 shadow-lg border rounded-lg fixed z-50 w-[92vw] md:max-w-[60vw] lg:max-w-[45vw] xl:max-w-[40vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-scroll scrollbar-hide ${
          isProfileEditDialogOpen ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        <FormHeader
          heading="Update Your Profile"
          subHeading=" Make changes to your personal information and preferences."
        />
        <span
          className="absolute top-2 right-2 text-muted-foreground cursor-pointer hover:text-card-foreground duration-300"
          onClick={() => setIsProfileEditDialogOpen(false)}
        >
          <X className="size-4.5 " />
        </span>

        <form onSubmit={handleOnSubmit} className="">
          <div className="my-6">
            <ProfilePhotoSelector
              uploading={uploading}
              isSubmitting={isSubmitting}
              setUploading={setUploading}
              setFormData={setFormData}
              currentProfileImage={user?.profilePic}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:items-center mb-5">
            <div className="flex-1 relative flex items-center">
              <Input
                Icon={User}
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleOnChange}
              />
            </div>
            <div className="flex-1 relative flex items-center">
              <Input
                Icon={AtSign}
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-4 relative">
            <textarea
              name="bio"
              id="bio"
              className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input/30 border-input w-full rounded-md border px-4 py-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]"
              placeholder="Short and sweet bio goes here"
              rows={3}
              maxLength={100}
              value={formData?.bio}
              onChange={handleOnChange}
            ></textarea>
            <div className="absolute bottom-2.5 right-2.5">
              <span
                className={`text-xs  ${
                  formData?.bio?.length === 100
                    ? "text-[#991b1b]"
                    : "text-muted-foreground"
                }`}
              >
                {formData?.bio?.length}/100
              </span>
            </div>
          </div>

          <button
            className={`bg-primary text-primary-foreground w-full py-2.5 rounded-lg mt-2 font-semibold text-sm duration-300 ${
              isSubmitting || uploading
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-primary/90 cursor-pointer"
            }`}
            disabled={uploading || isSubmitting}
          >
            {uploading ? (
              "Uploading Image..."
            ) : isSubmitting ? (
              <span className="flex justify-center items-center gap-2">
                <Loader2 className="animate-spin size-5" />{" "}
                <span>Saving</span>
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
