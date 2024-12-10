import React from "react";
import { GetForms } from "../../actions/form";
import { Form as FormType } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistance } from "date-fns";
import { BookText, FilePenLine, SquareArrowOutUpRight } from "lucide-react";
import { LuView } from "react-icons/lu";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export const FormCards = async () => {
  const forms = await GetForms();

  return (
    <>
      {forms.map((form: FormType) => {
        return <FormCard form={form} key={form.id} />;
      })}
    </>
  );
};

export const FormCardSkeleton = () => {
  return <Skeleton className="w-full h-[190px] border-2 border-primary/50" />;
};

export const FormCard = ({ form }: { form: FormType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="w-full text-sm font-medium text-muted-foreground flex justify-between items-center">
          <span className="truncate font-bold">{form?.name}</span>
          {form?.published && <Badge>Published</Badge>}
          {!form?.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center text-sm text-muted-foreground justify-between">
          {formatDistance(form?.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form?.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground h-4 w-4" />
              <span>{form?.visits?.toLocaleString()}</span>
              <BookText className="text-muted-foreground h-4 w-4" />
              <span>{form?.submissions?.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form?.description ?? "No Description"}
      </CardContent>
      <CardFooter>
        {form?.published && (
          <Button asChild className="w-full mt-2 text-md text-md">
            <Link href={`/forms/${form.id}`}>
              View submissions <SquareArrowOutUpRight />
            </Link>
          </Button>
        )}
        {!form?.published && (
          <Button
            variant={"secondary"}
            asChild
            className="w-full mt-2 text-md text-md"
          >
            <Link href={`/builder/${form.id}`}>
              Edit form <FilePenLine />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormCards;
