"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ImSpinner2 } from "react-icons/im";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { FilePlus } from "lucide-react";
import { CreateForm } from "../../actions/actions";

import { formSchema, formSchemaType } from "@/schemas/form";
import { toast } from "@/hooks/use-toast";

const CreateFormBtn = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: formSchemaType) => {
    console.log(values, "VALUE");
    try {
      const res = await CreateForm(values);
      if (res) {
        toast({
          title: "Success",
          description: "New form created successfully!",
          variant: "default",
          className: "border-dashed border-green-300",
        });
      }
      setOpen(false);
      form.reset();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "something went wrong! please try again",
        variant: "destructive",
        className: "border-dashed border-red-300",
      });
    }
  };
  return (
    <Dialog modal={true} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group bg-background border border-primary/50 h-[190px] item-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <FilePlus className="w-12 h-12 text-foreground group-hover:text-primary" />
          <p className="text-foreground font-bold text-xl group-hover:text-primary">
            Create New Form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to start collection responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormDescription>Name of your form</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="rounded-md"
                      placeholder="Type your description here."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add description for your form
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={form.formState.isSubmitting}
                className="w-full mt-4"
              >
                {!form.formState.isSubmitting && <span>Save</span>}
                {form.formState.isSubmitting && (
                  <ImSpinner2 className="animate spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormBtn;
