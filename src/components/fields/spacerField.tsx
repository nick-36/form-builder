"use client";
import React, { useEffect } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../formElements";
import { Label } from "../ui/label";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDesigner } from "@/store/designerStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SeparatorHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const type: ElementsType = "SpacerField";

const extraAttributes = {
  height: 20,
};

export const propertiesSchema = z.object({
  height: z.number().min(5).max(200),
});

export type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  const { height } = element?.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <Label className="text-muted-foreground">Spacer Field : {height}px</Label>
      <SeparatorHorizontal className="h-8 w-8" />
    </div>
  );
};

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  const updateElement = useDesigner((state) => state.updateElement);
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      height: element?.extraAttributes?.height,
    },
  });

  useEffect(() => {
    form.reset(element?.extraAttributes);
    //Form in deps may needs to be added
  }, [element]);

  const applyChange = (values: propertiesFormSchemaType) => {
    const { height } = values;
    updateElement(element?.id, {
      ...element,
      extraAttributes: {
        height,
      },
    });
  };
  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChange)}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (px):{form.watch("height")}</FormLabel>
              <FormControl className="pt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const FormComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomInstance;
  const { height } = element?.extraAttributes;

  return (
    <div
      style={{
        height: height,
        width: "100%",
      }}
    />
  );
};

const SpacerFieldElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: SeparatorHorizontal,
    label: "Spacer Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

export default SpacerFieldElement;
