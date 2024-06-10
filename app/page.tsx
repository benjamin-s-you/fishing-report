/**
 * Marked as Server Component
 */

import React, { Suspense, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Search } from "@/app/ui/components/search";
import { CurrentLocation } from "@/app/ui/components/buttons";
import DashboardSkeleton from "@/app/ui/components/skeletons";
import Dashboard from "@/app/ui/components/dashboard";
import StationTable from "@/app/ui/components/station-table";
import { Station } from "@/app/lib/tide/types";
import { fetchAllStations, fetchStationData } from "@/app/lib/tide/api";
import { globalStore } from "@/app/store/global";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    stationId?: string;
  };
}) {
  const stations: Station[] = await fetchAllStations();
  const stationId = searchParams?.stationId || "";

  return (
    <NextUIProvider>
      <main className="p-24 bg-sky-500">
        {/* Search section */}
        <div className="my-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search a location..." />
        </div>
        <StationTable stations={stations} />
        <div className="mt-4">
          <Dashboard stationId={stationId} />
        </div>
      </main>
    </NextUIProvider>
  );
}
