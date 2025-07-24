import FormHeader from "@/components/header/FormHeader";
import Input from "@/components/inputs/Input";
import { useLinkNest } from "@/context/LinkNestContext";
import axios from "axios";
import { Globe, LinkIcon, Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddLink = ({ isAddLinkDialogOpen, setIsAddLinkDialogOpen }) => {
  const { user, setLinks } = useLinkNest();
  const defaultFormData = { title: "", url: "" };
  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateFrom = () => {
    if (!formData.title.trim()) return toast.error("Please enter title");
    if (!formData.url.trim()) return toast.error("Please enter url");
    return true;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateFrom();
    if (isFormValid === true) {
      createLink();
    }
  };

  const restFormAndCloseDialog = () => {
    setFormData(defaultFormData);
    setIsAddLinkDialogOpen(false);
  };

  async function createLink() {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/link/create", {
        ...formData,
        user: user._id,
      });
      setIsSubmitting(false);
      if (response.status === 201) {
        toast.success(response.data.message);
        setLinks((prevLinks) => [ response?.data?.link, ...prevLinks,]);
        setFormData(defaultFormData);
        setIsAddLinkDialogOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error in creating link : ", error);
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className={`bg-card p-4 md:p-6 shadow-lg border rounded-lg fixed z-50 w-[92vw] md:max-w-[60vw] lg:max-w-[40vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90dvh] overflow-scroll scrollbar-hide ${
        isAddLinkDialogOpen ? "opacity-100" : "opacity-0 hidden"
      } duration-300`}
    >
      <div className="text-card-foreground relative">
        <FormHeader
          heading="Add a New Link"
          subHeading="One link for all your important content."
        />

        <span
          className="absolute -top-2 -right-2 md:-top-3 md:-right-3 text-muted-foreground cursor-pointer hover:text-card-foreground duration-300"
          onClick={restFormAndCloseDialog}
        >
          <X className="size-4.5 " />
        </span>

        <form onSubmit={handleOnSubmit} className="min-w-[35vw]">
          <div className="flex gap-4 items-center mb-5">
            <div className="flex-1 relative flex items-center">
              <Input
                Icon={Globe}
                type="text"
                id="title"
                name="title"
                placeholder="Enter platform name"
                value={formData.title}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="flex items-center relative mb-5">
            <Input
              Icon={LinkIcon}
              type="text"
              id="url"
              name="url"
              placeholder="Enter platform url"
              value={formData.url}
              onChange={handleOnChange}
            />
          </div>

          <button
            className={`bg-primary text-primary-foreground w-full py-2.5 rounded-md mt-2 font-semibold text-sm duration-300 ${
              isSubmitting
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-primary/80 cursor-pointer"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex justify-center items-center gap-2">
                <Loader2 className="animate-spin size-5" /> <span> Saving</span>
              </span>
            ) : (
              "Save Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLink;
