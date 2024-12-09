import React, { ReactNode } from "react";
import { GetFormWithSubmission } from "../../actions/form";
import { ElementsType, FormElementInstance } from "./formElements";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

type Row = {
  [key: string]: string;
} & {
  submittedAt: Date;
};

const SubmissionTable: any = async ({ id }: { id: number }) => {
  const form = await GetFormWithSubmission(id);

  if (!form) {
    throw new Error("Form Not Found!");
  }

  const formElements = JSON.parse(form?.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element?.type) {
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "SelectField":
      case "DateField":
      case "CheckboxField":
        columns.push({
          id: element.id,
          type: element.type,
          label: element?.extraAttributes?.label,
          required: element?.extraAttributes?.required,
        });
        break;

      default:
        break;
    }
  });

  const rows: Row[] = [];

  form.FormSubmission.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });
  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground uppercase text-right">
                Submitted At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow key={row?.id}>
                  {columns?.map((column) => (
                    <RowCell
                      key={column.id}
                      type={column.type}
                      value={row[column.id]}
                    />
                  ))}
                  <TableCell className="text-muted-foreground text-right">
                    {formatDistance(row?.submittedAt, new Date(), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubmissionTable;

const RowCell = ({ type, value }: { type: ElementsType; value: string }) => {
  let node: ReactNode = value;

  switch (type) {
    case "DateField": {
      if (!value) return;
      const date = new Date(value);
      node = <Badge>{format(date, "dd/MM/yyyy")}</Badge>;
      break;
    }
    case "CheckboxField": {
      const checked = value === "true" ? true : false;
      node = <Checkbox checked={checked} disabled />;
      break;
    }
    default:
      break;
  }
  return <TableCell>{node}</TableCell>;
};
