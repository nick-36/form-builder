"use client";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { BookCheck } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ImSpinner } from "react-icons/im";
import { toast } from "@/hooks/use-toast";
import { PublishForm } from "../../actions/form";

const PublishFormBtn = ({ formId }: { formId: number }) => {
  const [loading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  // const router = useRouter()

  const publishForm: () => void = async () => {
    try {
      await PublishForm(formId);
      toast({
        title: "Success",
        description: "Form published successfully!",
      });
      setIsOpen(false);
      // router.refresh()
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          <BookCheck className="h-6 w-6" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.After publishing you will not be able
            to edit this form. <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and you will able to collect the submissions
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed {loading && <ImSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormBtn;
