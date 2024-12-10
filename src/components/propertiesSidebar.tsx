"use client";
import { useDesigner } from "@/store/designerStore";
import React, { useEffect, useRef } from "react";
import { FormElements } from "./formElements";
import { Button } from "./ui/button";
import { Frown, X } from "lucide-react";
import { Separator } from "./ui/separator";

const PropertiesSidebar = () => {
  const { selectedElement, onSelectElement, elements } = useDesigner(
    (state) => state
  );

  // Track the previous length of the elements array
  const prevElementsLength = useRef(elements.length);

  useEffect(() => {
    if (
      selectedElement &&
      !elements.find((el) => el.id === selectedElement.id)
    ) {
      if (elements.length > 0) {
        onSelectElement(elements[elements.length - 1]);
      } else {
        onSelectElement(null);
      }
    }

    if (elements.length > prevElementsLength.current) {
      onSelectElement(elements[elements.length - 1]);
    }

    prevElementsLength.current = elements.length;
  }, [selectedElement, elements, onSelectElement]);

  const PropertiesForm =
    selectedElement && FormElements[selectedElement.type]?.propertiesComponent;

  return (
    <aside className="w-[200px] flex flex-col flex-grow border-l-2 border-muted p-4 bg-background overflow-y-auto h-full max-w-[400px]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70">
          {selectedElement ? "Element Properties" : ""}
        </p>
        {selectedElement && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onSelectElement(null)}
          >
            <X />
          </Button>
        )}
      </div>
      {selectedElement && <Separator className="mb-4" />}
      {selectedElement ? (
        <PropertiesForm elementInstance={selectedElement} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
          <Frown />
          <p className="text-lg font-semibold">No Element Selected</p>
          <p className="text-sm">Select an element to edit its properties</p>
        </div>
      )}
    </aside>
  );
};

export default PropertiesSidebar;
