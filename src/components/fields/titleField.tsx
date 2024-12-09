"use client";
import React, { useEffect } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../formElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
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
import { LuHeading1 } from "react-icons/lu";

const type: ElementsType = "TitleField";

const extraAttributes = {
  title: "Title Field",
};

export const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
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
  const { title } = element?.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Title Field</Label>
      <p className="test-xl">{title}</p>
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
      title: element?.extraAttributes?.title,
    },
  });

  useEffect(() => {
    form.reset(element?.extraAttributes);
    //Form in deps may needs to be added
  }, [element]);

  const applyChange = (values: propertiesFormSchemaType) => {
    const { title } = values;
    updateElement(element?.id, {
      ...element,
      extraAttributes: {
        title,
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget?.blur();
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
  const { title } = element?.extraAttributes;

  return <p className="text-xl ">{title}</p>;
};

const TitleFieldElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: LuHeading1,
    label: "Title Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

export default TitleFieldElement;
