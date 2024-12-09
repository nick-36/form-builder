import React from "react";
import { FormElementInstance } from "@/components/formElements";
import FormSubmitComponent from "@/components/formSubmit";
import { GetFormByFormURL } from "../../../../actions/form";

const SubmitPage = async ({
  params,
}: {
  params: Promise<{ formUrl: string }>;
}) => {
  const formUrl = (await params).formUrl;
  const form = await GetFormByFormURL(formUrl);
  if (!form) {
    throw new Error("Form Not Found!");
  }
  const formContent = JSON.parse(form.content) as FormElementInstance[];
  return (
    <>
      <FormSubmitComponent formUrl={formUrl} content={formContent} />
    </>
  );
};

export default SubmitPage;
