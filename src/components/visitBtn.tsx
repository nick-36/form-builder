"use client";
import React from "react";
import { Button } from "./ui/button";
import { SquareArrowOutUpRight } from "lucide-react";

const VisitBtn = ({ shareURl }: { shareURl: string }) => {
  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/submit/${shareURl}`;
  return (
    <div className="flex">
      <Button
        className={"w-auto min-w-[200px]"}
        onClick={() => {
          window.open(shareLink, "_blank");
        }}
      >
        Visit <SquareArrowOutUpRight />
      </Button>
    </div>
  );
};

export default VisitBtn;
