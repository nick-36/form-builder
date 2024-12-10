"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { Save } from "lucide-react";
import { useDesigner } from "@/store/designerStore";
import { UpdateFormContent } from "../../actions/form";
import { toast } from "@/hooks/use-toast";
import { ImSpinner } from "react-icons/im";

const SaveFormBtn = ({ formId }: { formId: number }) => {
  const elements = useDesigner((state) => state.elements);
  const [loading, startTransition] = useTransition();

  const updateFormContent: () => void = async () => {
    try {
      const jsonElement = JSON.stringify(elements);
      await UpdateFormContent(formId, jsonElement);
      toast({
        title: "Success",
        description: "form saved successfully!",
        className: "border-dashed border-green-300",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "something went wront!",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <Save className="h-6 w-6" />
      Save
      {loading && <ImSpinner className="animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
