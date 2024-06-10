/**
 * Marked as Server Component
 */

import { Card } from "@nextui-org/react";
import SunWidgetContainer from "@/app/ui/sun/widget-container";
import WeatherWidgetContainer from "@/app/ui/weather/widget-container";
import TideWidgetContainer from "@/app/ui/tide/widget-container";
import WindWidgetContainer from "@/app/ui/wind/widget-container";
import { LunarWidget } from "@/app/ui/lunar/lunar-widget";

export default function Dashboard({ stationId }: { stationId: string }) {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <WeatherWidgetContainer stationId={stationId} />
        <SunWidgetContainer stationId={stationId} />
        <TideWidgetContainer stationId={stationId} />
        <WindWidgetContainer stationId={stationId} />
        {/* <LunarWidget /> */}
      </div>
    </>
  );
}
