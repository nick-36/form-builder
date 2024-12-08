import React from "react";
import { Button } from "./ui/button";
import { BookCheck } from "lucide-react";

const PublishFormBtn = () => {
  return (
    <Button
      variant={"outline"}
      className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
    >
      <BookCheck className="h-6 w-6" />
      Publish
    </Button>
  );
};

export default PublishFormBtn;
