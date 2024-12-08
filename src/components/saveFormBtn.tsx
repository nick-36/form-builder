import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { Save } from "lucide-react";
import { useDesigner } from "@/app/store/designerStore";
import { UpdateFormContent } from "../../actions/actions";
import { toast } from "@/hooks/use-toast";
import { ImSpinner } from "react-icons/im";

const SaveFormBtn = ({ id }: { id: number }) => {
  const elements = useDesigner((state) => state.elements);
  const [loading, startTransition] = useTransition();

  const updateFormContent: () => void = async () => {
    try {
      const jsonElement = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElement);
      toast({
        title: "Success",
        description: "form has been saved!",
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
