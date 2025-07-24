import { Calendar, Copy, Edit, Trash2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LinkCard = ({ link, handleEditLink, handleDeleteLink }) => {
  const handleCopy = async (url) => {
    await navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard");
  };

  return (
    <div
      key={link?._id}
      className="bg-card border rounded-lg text-card-foreground px-4 pt-4 pb-4 md:px-6 md:pt-6 md:pb-4 space-y-6  "
    >
      <div className="space-y-2 ">
        <p className="flex gap-2 items-center text text-card-foreground">
          <span>{link?.title}</span>
        </p>
        <p className="flex gap-2 items-center text-card-foreground/80 text-sm hover:text-card-foreground duration-300">
          <Link href={link?.url} target="_blank" className="truncate">
            {link?.url}
          </Link>
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div
          className="flex items-center gap-2 text-muted-foreground hover:text-card-foreground duration-300 cursor-pointer"
          onClick={() => handleEditLink(link?._id)}
        >
          <Edit className="size-4" />
          <p className="text-sm">Edit</p>
        </div>
        <div
          className="flex items-center gap-2 text-muted-foreground hover:text-card-foreground duration-300 cursor-pointer"
          onClick={() => handleDeleteLink(link?._id)}
        >
          <Trash2 className="size-4" />
          <p className="text-sm">Delete</p>
        </div>
        <div
          className="flex items-center gap-2 text-muted-foreground hover:text-card-foreground duration-300 cursor-pointer"
          onClick={() => handleCopy(link?.url)}
        >
          <Copy className="size-4 " />
          <p className="text-sm">Copy</p>
        </div>
        <Tooltip>
          <TooltipTrigger>
            <div className="md:flex items-center gap-2 text-muted-foreground hover:text-card-foreground duration-300 cursor-pointer hidden">
              <Calendar className="size-4 " />
              <p className="text-sm ">
                {moment(link.createdAt).format("Do MMM YYYY")}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent>Created On</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default LinkCard;
