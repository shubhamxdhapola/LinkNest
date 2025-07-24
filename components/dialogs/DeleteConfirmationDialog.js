import { useLinkNest } from "@/context/LinkNestContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Overlay from "../dashboard/Overlay";

const DeleteConfirmationDialog = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  id,
}) => {
  const [deleting, setDeleting] = useState(false);
  const { setLinks } = useLinkNest();

  const deleteLink = async () => {
    setDeleting(true);
    try {
      const response = await axios.delete(`/api/link/delete/${id}`);
      setDeleting(false);
      if (response.status === 200) {
        toast.success(response.data.message);
        setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));
        setIsDeleteDialogOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error in deleting link : ", error);
      toast.error(error.response.data.message);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div>
      {isDeleteDialogOpen && <Overlay />}
      <div
        className={`bg-background p-4 md:p-6 shadow-lg border rounded-lg fixed z-50 w-[92vw] md:max-w-[60vw] lg:max-w-[40vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90dvh] overflow-scroll scrollbar-hide ${
          isDeleteDialogOpen ? "opacity-100" : "opacity-0 hidden"
        } duration-300`}
      >
        <div className="text-card-foreground relative">
          <h1 className="font-semibold text-lg">Are you absolutely sure?</h1>
          <p className="text-muted-foreground mt-4 text-sm">
            This action cannot be undone. This will permanently delete your link
            from our sever.
          </p>
          <div className="flex justify-end items-center gap-4 mt-4">
            <button
              className="hover:opacity-80 duration-300 px-4 py-2.5 rounded-md border text-sm font-semibold  cursor-pointer"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              className={`${
                deleting
                  ? "cursor-not-allowed bg-primary/80"
                  : "bg-primary cursor-pointer hover:bg-primary/80"
              } text-primary-foreground px-4 py-2.5 rounded-md text-sm font-semibold duration-300`}
              onClick={deleteLink}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="animate-spin size-5" />
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
