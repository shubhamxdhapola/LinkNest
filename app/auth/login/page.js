"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/forms/auth/Login";
import FormHeader from "@/components/header/FormHeader";
import FormFooter from "@/components/footer/FormFooter";

const Login = () => {
  const defaultFormData = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateFrom = () => {
    if (!formData.username.trim())
      return toast.error("Please enter your username");
    if (!formData.password.trim())
      return toast.error("Please enter your password");
    return true;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateFrom();
    if (isFormValid === true) {
      try {
        setIsSubmitting(true);
        const response = await axios.post("/api/auth/login", formData);
        setIsSubmitting(false);
        if (response.status === 200) {
          toast.success(response.data.message);
          setFormData(defaultFormData);
          router.push("/dashboard");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        setIsSubmitting(false);
        console.log("Error in login page : ", error);
        toast.error(error.response.data.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="backdrop-blur-2xl border rounded-lg shadow-lg p-6 bg-card text-card-foreground">
        <FormHeader
          heading="Welcome Back to LinkNest"
          subHeading="Login to curate, customize, and share your digital space."
        />

        <LoginForm
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          formData={formData}
          isSubmitting={isSubmitting}
        />

        <FormFooter
          message="Don't have an account?"
          url="/auth/register"
          pathname="Register"
        />
      </div>
    </div>
  );
};

export default Login;
