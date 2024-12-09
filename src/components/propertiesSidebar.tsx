import { useDesigner } from "@/store/designerStore";
import React from "react";
import { FormElements } from "./formElements";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

const PropertiesSidebar = () => {
  const { selectedElement, onSelectElement } = useDesigner((state) => state);
  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement.type]?.propertiesComponent;

  return (
    <aside className="w-[400px]flex flex-col flex-grow border-l-2 border-muted p-4 bg-background overflow-y-auto h-full max-w-[400px]">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => onSelectElement(null)}
        >
          <X />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </aside>
  );
};

export default PropertiesSidebar;
