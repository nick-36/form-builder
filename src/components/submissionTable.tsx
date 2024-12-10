"use client";
import React, { useMemo } from "react";
import { GetFormWithSubmission } from "../../actions/form";
import { ElementsType, FormElementInstance } from "./formElements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { formatDistance, format } from "date-fns";
import { Badge } from "./ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Form, FormSubmission } from "@prisma/client";

type Row = {
  [key: string]: string | Date;
} & {
  submittedAt: Date;
};
type SubmittedForm = {
  FormSubmission: FormSubmission[]; // Array of submissions
} & Form;
const SubmissionTable = ({
  id,
  submittedForm,
}: {
  id: number;
  submittedForm: SubmittedForm;
}) => {
  const formElements = JSON.parse(
    submittedForm?.content
  ) as FormElementInstance[];

  const columnHelper = createColumnHelper<Row>();

  const columns = [
    ...formElements
      .filter((element) =>
        [
          "TextField",
          "NumberField",
          "TextAreaField",
          "SelectField",
          "DateField",
          "CheckboxField",
        ].includes(element.type)
      )
      .map((element) =>
        columnHelper.accessor((row) => row[element.id] as string, {
          id: element.id,
          header: element.extraAttributes?.label,
          cell: (info) =>
            renderCell(info.getValue() as string, element.type as ElementsType),
        })
      ),

    columnHelper.accessor((row) => row.submittedAt, {
      id: "submittedAt",
      header: "Submitted At",
      cell: (info) => (
        <span>
          {formatDistance(new Date(info.getValue() as Date), new Date(), {
            addSuffix: true,
          })}
        </span>
      ),
    }),
  ];

  const rows = submittedForm.FormSubmission.map((submission) => ({
    ...JSON.parse(submission.content),
    submittedAt: submission.createdAt,
  }));

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of recent submission.</TableCaption>
          <TableHeader>
            <TableRow>
              {table
                .getHeaderGroups()
                .map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))
                )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="sm:table-cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubmissionTable;

const renderCell = (value: string, type: ElementsType) => {
  switch (type) {
    case "DateField":
      return (
        <Badge>{value ? format(new Date(value), "dd/MM/yyyy") : ""}</Badge>
      );
    case "CheckboxField":
      return <Checkbox checked={value === "true"} disabled />;
    default:
      return value;
  }
};
