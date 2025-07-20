import React from "react";
import ProfilePhotoSelector from "../profile/ProfilePhotoSelector";
import Input from "@/components/inputs/Input";
import { AtSign, Loader2, Lock, Mail, User } from "lucide-react";

const RegisterForm = ({
  handleOnSubmit,
  handleOnChange,
  isSubmitting,
  uploading,
  setUploading,
  setFormData,
  formData,
}) => {
  return (
    <form onSubmit={handleOnSubmit} className="min-w-[40vw]">
      <div className="my-6">
        <ProfilePhotoSelector
          uploading={uploading}
          isSubmitting={isSubmitting}
          setUploading={setUploading}
          setFormData={setFormData}
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
      
      <div className="flex items-center relative mb-5">
        <Input
          Icon={Lock}
          type="password"
          id="password"
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleOnChange}
        />
      </div>

      <div className="mb-4 relative">
        <textarea
          name="bio"
          id="bio"
          className="auth-input-box"
          placeholder="Short and sweet bio goes here"
          rows={3}
          maxLength={100}
          value={formData.bio}
          onChange={handleOnChange}
        ></textarea>
        <div className="absolute bottom-2.5 right-2.5">
          <span
            className={`text-xs  ${
              formData.bio.length === 100
                ? "text-[#991b1b]"
                : "text-muted-foreground"
            }`}
          >
            {formData.bio.length}/100
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
            <Loader2 className="animate-spin size-5" /> <span>Registering</span>
          </span>
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
