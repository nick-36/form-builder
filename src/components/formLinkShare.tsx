"use client";
import React from "react";
import { Button } from "./ui/button";
import { Share2 } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";

const FormLinkShare = ({ shareURl }: { shareURl: string }) => {
  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/submit/${shareURl}`;
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <Input
        value={shareLink}
        readOnly
        className="w-full sm:w-auto sm:min-w-[300px] md:min-w-[400px] lg:min-w-[600px] max-w-full"
      />
      <Button
        className="shrink-0 min-w-[200px]"
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
