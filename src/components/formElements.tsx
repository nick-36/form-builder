import TextFieldFormElement from "@/components/fields/textField";

export type ElementsType = "TextField";

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes: Record<string, any>;
};

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
