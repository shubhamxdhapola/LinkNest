"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormHeader from "@/components/header/FormHeader";
import FormFooter from "@/components/footer/FormFooter";
import RegisterForm from "@/components/forms/auth/Register";

const Register = () => {
  const defaultFormData = {
    name: "",
    username: "",
    password: "",
    profilePic: null,
    bio: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]:
        e.target.name === "username"
          ? e.target.value.toLowerCase()
          : e.target.value,
    }));
  };

  const validateFrom = () => {
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (!/^(?!\.)(?!.*\.\.)[a-zA-Z0-9._]{3,20}(?<!\.)$/.test(formData.username))
      return toast.error("Username format is invalid");
    return true;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateFrom();
    if (isFormValid === true) {
      try {
        setIsSubmitting(true);
        const response = await axios.post("/api/auth/register", formData);
        setIsSubmitting(false);
        if (response.status === 201) {
          toast.success(response.data.message);
          setFormData(defaultFormData);
          window.location.href = "/dashboard";
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
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="border rounded-lg shadow-lg p-4 md:p-6 bg-card text-card-foreground">
        <FormHeader
          heading="Build Your LinkNest Profile"
          subHeading=" Start organizing your links in one beautiful, shareable space."
        />
        <RegisterForm
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          isSubmitting={isSubmitting}
          uploading={uploading}
          setUploading={setUploading}
          setFormData={setFormData}
          formData={formData}
        />
        <FormFooter
          message="Already have an account?"
          url="/auth/login"
          pathname="Login"
        />
      </div>
    </div>
  );
};

export default Register;
