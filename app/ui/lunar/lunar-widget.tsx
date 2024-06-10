import { Card } from "@nextui-org/react";

export function LunarWidget() {
  return (
    <Card className="space-y-5 p-4" radius="lg">
      <div className="inline-flex items-center w-3/5 h-9 p-2 rounded-lg bg-default-200 text-lg">
        Moon Phase
      </div>
      <div className="h-72 rounded-lg bg-default-300">
        <div>full moon</div>
        <div>full moon image</div>
      </div>

      <div className="space-y-3">
        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>

        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
      </div>
    </Card>
  );
}
