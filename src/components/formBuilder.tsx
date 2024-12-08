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
import { useDesigner } from "@/app/store/designerStore";
import { ImSpinner2 } from "react-icons/im";

const FormBuilder = ({ form }: { form: Form }) => {
  const setElements = useDesigner((state) => state?.setElements);
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
    const readyTimeOut = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeOut);
  }, [form, isReady, setElements]);

  if (!isReady) {
    return (
      <div className="container flex items-center justify-center min-w-full min-h-screen">
        <ImSpinner2 className="animate-spin h-12 w-12 " />
      </div>
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
                <SaveFormBtn id={form?.id} />
                <PublishFormBtn />
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
