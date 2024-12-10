import React from "react";
import { GetFormById } from "../../../../../actions/form";
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
          className="shadow-md shadow-blue-600"
          loading={false}
          icon={<LuView className="text-blue-500" />}
        />
        <StatsCard
          title="Total Submission"
          statValue={form?.submissions.toLocaleString() ?? ""}
          description="all time submissions"
          className="shadow-md shadow-yellow-600"
          loading={false}
          icon={<BookText className="text-yellow-500" />}
        />
        <StatsCard
          title="Submission Rate"
          statValue={form?.submissionRate.toLocaleString() ?? ""}
          description="all the visits that results into submissions"
          className="shadow-md shadow-green-600"
          loading={false}
          icon={<MousePointerClick className="text-green-500" />}
        />
        <StatsCard
          title="Bounce Rate"
          statValue={form?.submissionRate.toLocaleString() ?? ""}
          description="all the visits that left without interacting"
          className="shadow-md shadow-red-600"
          loading={false}
          icon={<PointerOff className="text-red-500" />}
        />
      </div>
      <Separator />
      <div className="pb-10">
        {/* @ts-expect-error Server Component */}
        <SubmissionTable id={form?.id} />
      </div>
    </div>
  );
};

export default FormDetailsPage;
