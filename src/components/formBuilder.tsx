"use client";
import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PreviewDialogBtn from "./previewDialogBtn";
import SaveFormBtn from "./saveFormBtn";
import PublishFormBtn from "./publishFormBtn";
import Designer from "./designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./dragOverlayWrapper";
import { useDesigner } from "@/store/designerStore";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";
import Confetti from "react-confetti";

const FormBuilder = ({ form }: { form: Form }) => {
  const { setElements, onSelectElement } = useDesigner((state) => state);
  const [isReady, setIsReady] = useState(false);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const elements = form?.content?.length > 1 ? JSON.parse(form?.content) : [];
    setElements(elements);
    onSelectElement(null);
    const readyTimeOut = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeOut);
  }, [form, isReady, setElements, onSelectElement]);

  if (!isReady) {
    return (
      <div className="container flex items-center justify-center min-w-full min-h-screen">
        <ImSpinner2 className="animate-spin h-12 w-12 " />
      </div>
    );
  }

  if (form?.published) {
    const shareURL = `${process.env.NEXT_PUBLIC_BASE_URL}/submit/${form.shareURL}`;
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
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
          <div className="max-w-md">
            <h1 className="text-center text-2xl font-bold text-primary border-b pb-2 mb-10">
              🎉🎉🎉 Form Published 🎉🎉🎉
            </h1>
            <h2 className="text-xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Anyone with the link can view and submit the form
            </h3>
            <div className="my-4 flex flex-col items-center pb-4 w-full border-b">
              <Input readOnly className="w-full" value={shareURL} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareURL);
                  toast({
                    title: "Copied",
                    description: "Link copied to clipboard",
                  });
                }}
              >
                Copy Link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button asChild variant="link" className="gap-2">
                <Link href={"/"}>
                  <MoveLeft />
                  Go To Home
                </Link>
              </Button>
              <Button asChild variant="link" className="gap-2">
                <Link href={`/forms/${form?.id}`}>
                  Form Details
                  <MoveRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="w-full h-full flex flex-col min-h-screen">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn formId={form?.id} />
                <PublishFormBtn formId={form?.id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paperDark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
