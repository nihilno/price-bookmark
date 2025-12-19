"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartLineDots({ data }: { data: PriceHistory[] }) {
  if (!data.length) {
    return null;
  }

  const chartData = data.map((entry) => ({
    date: new Date(entry.checked_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    price: entry.price,
  }));

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
