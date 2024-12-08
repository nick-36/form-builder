"use client";
import React from "react";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import { useDesigner } from "@/app/store/designerStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormElements } from "./formElements";

const PreviewDialogBtn = () => {
  const elements = useDesigner((state) => state.elements);
  console.log(elements, "PREVIEW");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Eye className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0 border-none">
        <div className="px-4 py-2 border-b">
          <DialogTitle className="text-lg font-bold text-muted-foreground">
            Form Preivew
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to users!
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paperDark.svg)] overflow-y-auto">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            {elements?.map((el) => {
              const FormComponents = FormElements[el.type].formComponent;
              return <FormComponents key={el.id} elementInstance={el} />;
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
