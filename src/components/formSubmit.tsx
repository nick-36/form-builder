"use client";
import { toast } from "@/hooks/use-toast";
import { MousePointerClick } from "lucide-react";
import { useCallback, useRef, useState, useTransition } from "react";
import { ImSpinner } from "react-icons/im";
import { SubmitForm } from "../../actions/form";
import { FormElementInstance, FormElements } from "./formElements";
import { Button } from "./ui/button";
import Confetti from "react-confetti";

const FormSubmitComponent = ({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [loading, startTransition] = useTransition();

  const validateForm = () => {
    for (const element of content) {
      const activeValue = formValues.current[element?.id] ?? "";
      const valid = FormElements[element.type].validate(element, activeValue);
      console.log(element.type, content, valid);
      if (!valid) {
        formErrors.current[element.id] = true;
      }

      if (Object.keys(formErrors.current).length > 0) {
        return false;
      }
    }
    return true;
  };

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const submitForm: () => void = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "please check the form for errors",
        variant: "destructive",
      });
      return;
    }
    try {
      const jsonContent = JSON.stringify(formValues.current);
      const res = await SubmitForm(formUrl, jsonContent);
      if (res?.success) {
        setSubmitted(true);
        formValues.current = {};
        setRenderKey(new Date().getTime());
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "something went wrong!",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.2}
          tweenDuration={2000}
          opacity={0.8}
        />
        <div className="flex justify-center w-full h-screen items-center p-8">
          <div className="max-w-[620px] flex flex-col flex-grow gap-4 bg-background w-full p-8 overflow-y-auto shadow-md shadow-primary-foreground rounded-md">
            <h1 className="text-2xl font-bold">Form Submitted 🎉 🎉 🎉</h1>
            <p className="text-muted-foreground">
              Thank you for submitting the form, you can close this page now.
            </p>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex justify-center min-w-full min-h-screen items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] max-h-[800px] flex flex-col flex-grow bg-background gap-4 w-full p-8 overflow-y-auto  shadow-md shadow-primary-foreground rounded-md"
      >
        {content?.map((el) => {
          const FormComponent = FormElements[el.type]?.formComponent;
          return (
            <FormComponent
              key={el.id}
              elementInstance={el}
              submitValue={submitValue}
              isInvalid={formErrors?.current[el.id]}
              defaultValue={formValues?.current[el.id]}
            />
          );
        })}
        <div className="flex justify-center">
          <Button
            className="m-8 w-md"
            onClick={() => {
              startTransition(submitForm);
            }}
            disabled={loading}
          >
            {!loading && (
              <>
                <MousePointerClick />
                Submit
              </>
            )}
            {loading && <ImSpinner className="animate-spin" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
