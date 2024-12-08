import React from "react";
import { GetFormById } from "../../../../../actions/actions";
import FormBuilder from "@/components/formBuilder";

const BuilderPage = async ({ params }: { params: { id: string } }) => {
  const idPayload = Number(params?.id);
  const form = await GetFormById(idPayload);

  if (!form) {
    throw new Error("Form Not Found!");
  }
  return <FormBuilder form={form} />;
};

export default BuilderPage;
