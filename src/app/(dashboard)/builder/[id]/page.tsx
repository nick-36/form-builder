import React from "react";
import { GetFormById } from "../../../../../actions/form";
import FormBuilder from "@/components/formBuilder";
const BuilderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const formId = (await params).id;
  const formIdNum = Number(formId);
  const form = await GetFormById(formIdNum);

  if (!form) {
    throw new Error("Form Not Found!");
  }
  return <FormBuilder form={form} />;
};

export default BuilderPage;
