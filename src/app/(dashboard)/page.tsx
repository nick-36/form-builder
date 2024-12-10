import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import CreateFormBtn from "@/components/createForm";
import FormCards, { FormCardSkeleton } from "@/components/formCards";
import { CardStatsWrapper, StatsCards } from "@/components/statsCard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen min-w-full max-h-screen">
      <Suspense fallback={<StatsCards loading={true} />}>
        {/* @ts-expect-error Server Component */}
        <CardStatsWrapper />
      </Suspense>
      <Separator className="mt-2" />
      <h2 className="text-3xl font-semibold col-span-2 text-muted-foreground px-4 py-2">
        Your Forms
      </h2>
      <Separator className="mt-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          {/* @ts-expect-error Server Component */}
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}
