import axios from "axios";
import { Loader, Trash, Upload, User } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ProfilePhotoSelector = ({
  uploading,
  isSubmitting,
  setUploading,
  setFormData,
  currentProfileImage = null
}) => {
  const [profileImage, setProfileImage] = useState(currentProfileImage || null);
  const fileInputRef = useRef(null);

  const handleAddImage = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    toast.success("Image removed successfully");
    setProfileImage(null);
    setFormData((prevData) => ({
      ...prevData,
      profilePic: null,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      if (file) {
        setUploading(true);
        const fileData = new FormData();
        fileData.append("file", file);
        fileData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );
        const result = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          fileData
        );
        setUploading(false);
        toast.success("Image uploaded successfully");
        setProfileImage(result.data.secure_url);
        setFormData((prevData) => ({
          ...prevData,
          profilePic: result.data.secure_url,
        }));
      }
    } catch (error) {      
      toast.error("Something went wrong");      
    } finally {
      setUploading(false);
    }
    e.target.value = null;
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        id="profile-pic"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <div className="bg-input/50 rounded-full h-22 w-22 content-center mx-auto relative">
        {profileImage ?  (
          <Image
            src={profileImage}
            alt="profile-image"
            fill={true}
            className="object-cover rounded-full"
          />
        ) : (
          <User className="mx-auto" size={30} />
        )}
        <button
          type="button"
          className={`bg-secondary border border-input w-8 h-8 rounded-full text-center content-center absolute -right-1.5 top-12 duration-300 ${
            uploading || isSubmitting
              ? "cursor-not-allowed"
              : "cursor-pointer hover:bg-secondary/80"
          }`}
          onClick={profileImage ? handleRemoveImage : handleAddImage}
          disabled={uploading || isSubmitting}
        >
          {profileImage ? (
            <Trash size={16} className="mx-auto" />
          ) : uploading ? (
            <Loader className="size-5 animate-spin mx-auto" />
          ) : (
            <Upload size={16} className="mx-auto" />
          )}
        </button>
      </div>
    </>
  );
};

export default ProfilePhotoSelector;
