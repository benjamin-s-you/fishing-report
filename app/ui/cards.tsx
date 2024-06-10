import { Card } from "@nextui-org/react";
import { WeatherWidget } from "@/app/ui/dashboards/weather-widget";
import { SunWidget } from "@/app/ui/dashboards/sun-widget";
import { TideWidget } from "@/app/ui/dashboards/tide-widget";
import { WindWidget } from "@/app/ui/dashboards/wind-widget";
import { LunarWidget } from "@/app/ui/dashboards/lunar-widget";

export function Cards() {
  return (
    <>
      {/* <WeatherWidget /> */}
      {/* <SunWidget /> */}
      {/* <TideWidget /> */}
      {/* <WindWidget /> */}
      {/* <LunarWidget /> */}
    </>
  );
}

export default function Dashboard() {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Cards />
      </div>
    </>
  );
}
