import React, { Suspense } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Search } from "@/app/ui/search";
import { CurrentLocation } from "@/app/ui/buttons";
import DashboardSkeleton from "@/app/ui/skeletons";
import Dashboard from "@/app/ui/cards";
import Table from "@/app/ui/table";
import { Station } from "@/app/lib/tide/types";
import { fetchAllStations } from "@/app/lib/tide/api";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const allTidePredictionStations: Station[] = await fetchAllStations();

  return (
    <NextUIProvider>
      <main className="p-24 bg-sky-500">
        {/* Search section */}
        <div className="my-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search a location..." />
        </div>
        <Suspense key={query} fallback={<div>Pending</div>}>
          <Table stations={allTidePredictionStations} query={query} />
        </Suspense>
        <div className="mt-4">
          <Dashboard />
        </div>
      </main>
    </NextUIProvider>
  );
}
