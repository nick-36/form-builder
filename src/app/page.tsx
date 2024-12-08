import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LuView } from "react-icons/lu";
import { GetFormStats } from "../../actions/actions";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import CreateFormBtn from "@/components/createForm";
import { cn } from "@/lib/utils";
import { BookText, MousePointerClick, PointerOff } from "lucide-react";
import FormCards, { FormCardSkeleton } from "@/components/formCards";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen min-w-full max-h-screen">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="mt-2" />
      <h2 className="text-4xl font-bold col-span-2 text-white px-4">
        Your Forms
      </h2>
      <Separator className="mt-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards data={stats} loading={false} />;
}

export const StatsCards = ({
  data,
  loading,
}: {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}) => {
  return (
    <div className="w-full grid grid-cols-2 gap-4 items-center p-4">
      <StatsCard
        title="Total visits"
        statValue={data?.visits.toLocaleString() ?? ""}
        description="all time visits"
        className="shadow-md shadow-blue-600"
        loading={loading}
        icon={<LuView className="text-blue-500" />}
      />
      <StatsCard
        title="Total Submission"
        statValue={data?.submissions.toLocaleString() ?? ""}
        description="all time submissions"
        className="shadow-md shadow-yellow-600"
        loading={loading}
        icon={<BookText className="text-yellow-500" />}
      />
      <StatsCard
        title="Submission Rate"
        statValue={data?.submissionRate.toLocaleString() ?? ""}
        description="all the visits that results into submissions"
        className="shadow-md shadow-green-600"
        loading={loading}
        icon={<MousePointerClick className="text-green-500" />}
      />
      <StatsCard
        title="Bounce Rate"
        statValue={data?.submissionRate.toLocaleString() ?? ""}
        description="all the visits that left without interacting"
        className="shadow-md shadow-red-600"
        loading={loading}
        icon={<PointerOff className="text-red-500" />}
      />
    </div>
  );
};

type StatsCardProps = {
  title: string;
  description: string;
  statValue: string | null;
  className?: string;
  loading: boolean;
  icon: React.ReactNode;
};

export const StatsCard = ({
  title,
  description,
  statValue = "0",
  className,
  loading = false,
  icon,
}: StatsCardProps) => {
  return (
    <Card className={cn("flex flex-col shadow-lg", className)}>
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="text-lg font-bold">
        {loading && (
          <Skeleton className="rounded-full overflow-hidden">
            <span className="opacity-0">0</span>
          </Skeleton>
        )}
        {!loading && <p>{statValue}</p>}
        <p className="text-xs text-muted-foreground pt-1">{description}</p>
      </CardContent>
    </Card>
  );
};
