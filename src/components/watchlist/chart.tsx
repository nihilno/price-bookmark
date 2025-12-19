"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartLineDots({ data }: { data: PriceHistory[] }) {
  const chartData = useMemo(
    () =>
      data.map((entry) => ({
        date: new Date(entry.checked_at).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        price: entry.price,
      })),
    [data],
  );

  if (!data.length) {
    return null;
  }

  return (
    <Card className="pt-6 pb-2">
      <CardHeader>
        <CardTitle>Price History [{data[0]?.currency}]</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 8,
              right: 8,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#ffffff40"
            />
            <XAxis dataKey="date" tickMargin={5} />
            <YAxis tickMargin={5} axisLine />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="price"
              name="Price"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={4}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
