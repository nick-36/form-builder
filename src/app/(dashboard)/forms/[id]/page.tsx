import React from "react";
import {
  GetFormById,
  GetFormWithSubmission,
} from "../../../../../actions/form";
import VisitBtn from "@/components/visitBtn";
import FormLinkShare from "@/components/formLinkShare";
import { StatsCard } from "@/components/statsCard";
import { BookText, MousePointerClick, PointerOff } from "lucide-react";
import { LuView } from "react-icons/lu";
import SubmissionTable from "@/components/submissionTable";
import { Separator } from "@/components/ui/separator";

const FormDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const formId = (await params).id;
  const idPayload = Number(formId);
  const form = await GetFormById(idPayload);
  const submittedForm = await GetFormWithSubmission(idPayload);
  console.log(form, "FORM");

  if (!form) {
    throw new Error("Form Not Found!");
  }
  return (
    <div className="py-10 border-b border-muted flex flex-col">
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold truncate">{form?.name}</h1>
          <VisitBtn shareURl={form?.shareURL} />
        </div>
        <Separator />
        <div className="py-4 border-b border-muted">
          <div className="flex gap-2 items-center justify-between">
            <FormLinkShare shareURl={form?.shareURL} />
          </div>
        </div>
      </div>
      <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8">
        <StatsCard
          title="Total visits"
          statValue={form?.visits.toLocaleString() ?? ""}
          description="all time visits"
          className="shadow-md shadow-blue-600 [background:linear-gradient(45deg,#000,#000)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.blue.400/.48)_80%,_theme(colors.blue.500)_86%,_theme(colors.blue.300)_0%,_theme(colors.blue.500)_94%,_theme(colors.blue.600/.48))_border-box]"
          loading={false}
          icon={<LuView className="text-blue-500" />}
        />
        <StatsCard
          title="Total Submission"
          statValue={form?.submissions.toLocaleString() ?? ""}
          description="all time submissions"
          className="shadow-md shadow-yellow-600 [background:linear-gradient(45deg,#000,#000)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.400/.48)_80%,_theme(colors.yellow.500)_86%,_theme(colors.yellow.300)_0%,_theme(colors.yellow.500)_94%,_theme(colors.yellow.600/.48))_border-box]"
          loading={false}
          icon={<BookText className="text-yellow-500" />}
        />
        <StatsCard
          title="Submission Rate"
          statValue={`${form?.submissionRate.toLocaleString() ?? ""}%`}
          description="all the visits that results into submissions"
          className="shadow-md shadow-green-600 [background:linear-gradient(45deg,#000,#000)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.green.400/.48)_80%,_theme(colors.green.500)_86%,_theme(colors.green.300)_0%,_theme(colors.green.500)_94%,_theme(colors.green.600/.48))_border-box]"
          loading={false}
          icon={<MousePointerClick className="text-green-500" />}
        />
        <StatsCard
          title="Bounce Rate"
          statValue={`${form?.bounceRate.toLocaleString() ?? ""}%`}
          description="all the visits that left without interacting"
          className="shadow-md shadow-red-600 [background:linear-gradient(45deg,#000,#000)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.red.400/.48)_80%,_theme(colors.red.500)_86%,_theme(colors.red.300)_0%,_theme(colors.red.500)_94%,_theme(colors.red.600/.48))_border-box]"
          loading={false}
          icon={<PointerOff className="text-red-500" />}
        />
      </div>
      <Separator />
      <div className="pb-10">
        <SubmissionTable id={form?.id} submittedForm={submittedForm} />
      </div>
    </div>
  );
};

export default FormDetailsPage;
