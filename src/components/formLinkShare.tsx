"use client";
import React from "react";
import { Button } from "./ui/button";
import { Share2 } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";

const FormLinkShare = ({ shareURl }: { shareURl: string }) => {
  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/submit/${shareURl}`;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button
        className={"w-[250px]"}
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Copied",
            description: "Link copied to clipboard",
          });
        }}
      >
        Share Link <Share2 className="mr-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default FormLinkShare;
