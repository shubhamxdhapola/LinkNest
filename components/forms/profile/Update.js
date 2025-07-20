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
        setIsSubmitting(false);
        console.log("Error in updating profile : ", error);
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
        className={`border rounded-lg shadow-lg p-6 bg-card text-card-foreground fixed z-20 top-[50%] left-[50%] -translate-x-[55%] -translate-y-[55%] ${
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

        <form onSubmit={handleOnSubmit} className="min-w-[40vw]">
          <div className="my-6">
            <ProfilePhotoSelector
              uploading={uploading}
              isSubmitting={isSubmitting}
              setUploading={setUploading}
              setFormData={setFormData}
              currentProfileImage={user?.profilePic}
            />
          </div>

          <div className="flex gap-4 items-center mb-5">
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
              className="auth-input-box"
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
            className={`auth-form-button ${
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
                <span>Updating</span>
              </span>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
