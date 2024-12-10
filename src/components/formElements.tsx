import TextFieldFormElement from "@/components/fields/textField";
import TitleFieldFormElement from "./fields/titleField";
import SubTitleFieldFormElement from "./fields/subTitleField";
import ParagraphFieldFormElement from "./fields/paragraphField";
import SeparatorFieldFormElement from "./fields/separatorField";
import SpacerFieldFormElement from "./fields/spacerField";
import NumberFieldFormElement from "./fields/numberField";
import TextAreaFieldFormElement from "./fields/textAreaField";
import DateFieldFormElement from "./fields/dateField";
import SelectFieldFormElement from "./fields/selectField";
import CheckboxFieldFormElement from "./fields/checkBoxField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField";

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export type SubmitFunction = (key: string, value: string) => void;

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
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
