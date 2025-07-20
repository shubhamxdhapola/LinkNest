import { useLinkNest } from "@/context/LinkNestContext";
import { useState } from "react";
import DeleteConfirmationDialog from "../dialogs/DeleteConfirmationDialog";
import UpdateLink from "../forms/link/Update";
import LinkCard from "../cards/LinkCard";

const ManageLinks = () => {
  const { links } = useLinkNest();
  const defaultFormData = { title: "", url: "" };
  const [formData, setFormData] = useState(defaultFormData);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [deletingLinkId, setDeletingLinkId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateLinkDialogOpen, setIsUpdateLinkDialogOpen] = useState(false);

  const handleEditLink = async (id) => {
    const linkToBeUpdated = links.filter((link) => link._id === id)[0]
    setFormData({ title: linkToBeUpdated?.title, url: linkToBeUpdated?.url });
    setIsUpdateLinkDialogOpen(true);
    setEditingLinkId(id);
  };

  const handleDeleteLink = (id) => {
    setDeletingLinkId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <p className="mt-8 mb-5 text-lg font-semibold">My Links</p>
      <div>
        {links && links.length > 0 && (
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <LinkCard
                key={link._id}
                link={link}
                handleEditLink={handleEditLink}
                handleDeleteLink={handleDeleteLink}
              />
            ))}
          </div>
        )}
      </div>
      <UpdateLink
        isUpdateLinkDialogOpen={isUpdateLinkDialogOpen}
        setIsUpdateLinkDialogOpen={setIsUpdateLinkDialogOpen}
        setFormData={setFormData}
        formData={formData}
        setEditingLinkId={setEditingLinkId}
        editingLinkId={editingLinkId}
      />

      <DeleteConfirmationDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        id={deletingLinkId}
      />
    </>
  );
};

export default ManageLinks;
