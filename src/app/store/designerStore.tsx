"use client";
import { FormElementInstance } from "@/components/formElements";
import { create } from "zustand";

type DesignerStoreState = {
  elements: FormElementInstance[];
  selectedElement?: FormElementInstance | null;
};

type DesignerStoreAction = {
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  onSelectElement: (el: FormElementInstance | null) => void;
  updateElement: (id: string, element: FormElementInstance) => void;
  setElements: (elements: FormElementInstance[]) => void;
};

export const useDesigner = create<DesignerStoreState & DesignerStoreAction>(
  (set) => ({
    elements: [],
    setElements: (elements) => {
      set((state) => {
        return {
          elements,
        };
      });
    },
    selectedElement: null,
    onSelectElement: (el) => {
      set(() => {
        return {
          selectedElement: el,
        };
      });
    },
    addElement: (index, element) => {
      set((state) => {
        const newElements = [...state.elements];
        newElements.splice(index, 0, element);
        return {
          elements: newElements,
        };
      });
    },
    removeElement: (id: string) => {
      set((state) => {
        const newElements = state.elements.filter((el) => el.id !== id);
        return {
          elements: newElements,
        };
      });
    },
    updateElement: (id, element) => {
      set((state) => {
        const newElements = [...state.elements];
        const elIndex = newElements.findIndex((el) => el.id === id);
        newElements[elIndex] = element;
        return {
          elements: newElements,
        };
      });
    },
  })
);
