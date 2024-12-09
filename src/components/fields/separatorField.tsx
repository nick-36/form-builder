"use client";
import React from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../formElements";
import { Label } from "../ui/label";

import { TableRowsSplit } from "lucide-react";
import { Separator } from "../ui/separator";

const type: ElementsType = "SeparatorField";

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Separator Field</Label>
      <Separator />
    </div>
  );
};

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  return (
    <p className="text-sm text-muted-foreground">
      No properties for this element
    </p>
  );
};

const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance;

  return <Separator />;
};

const SeparatorFieldElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: TableRowsSplit,
    label: "Separator Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

export default SeparatorFieldElement;
