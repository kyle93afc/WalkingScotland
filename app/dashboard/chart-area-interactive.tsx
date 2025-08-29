"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", desktop: 2, mobile: 4 },
  { date: "2024-04-02", desktop: 0, mobile: 2 },
  { date: "2024-04-03", desktop: 1, mobile: 3 },
  { date: "2024-04-04", desktop: 1, mobile: 5 },
  { date: "2024-04-05", desktop: 3, mobile: 7 },
  { date: "2024-04-06", desktop: 2, mobile: 8 },
  { date: "2024-04-07", desktop: 1, mobile: 2 },
  { date: "2024-04-08", desktop: 2, mobile: 6 },
  { date: "2024-04-09", desktop: 0, mobile: 1 },
  { date: "2024-04-10", desktop: 1, mobile: 4 },
  { date: "2024-04-11", desktop: 2, mobile: 9 },
  { date: "2024-04-12", desktop: 1, mobile: 3 },
  { date: "2024-04-13", desktop: 3, mobile: 8 },
  { date: "2024-04-14", desktop: 1, mobile: 2 },
  { date: "2024-04-15", desktop: 0, mobile: 1 },
  { date: "2024-04-16", desktop: 1, mobile: 4 },
  { date: "2024-04-17", desktop: 2, mobile: 7 },
  { date: "2024-04-18", desktop: 3, mobile: 9 },
  { date: "2024-04-19", desktop: 1, mobile: 3 },
  { date: "2024-04-20", desktop: 0, mobile: 2 },
  { date: "2024-04-21", desktop: 1, mobile: 5 },
  { date: "2024-04-22", desktop: 2, mobile: 4 },
  { date: "2024-04-23", desktop: 1, mobile: 6 },
  { date: "2024-04-24", desktop: 3, mobile: 8 },
  { date: "2024-04-25", desktop: 2, mobile: 5 },
  { date: "2024-04-26", desktop: 0, mobile: 2 },
  { date: "2024-04-27", desktop: 3, mobile: 9 },
  { date: "2024-04-28", desktop: 1, mobile: 3 },
  { date: "2024-04-29", desktop: 2, mobile: 6 },
  { date: "2024-04-30", desktop: 3, mobile: 8 },
  { date: "2024-05-01", desktop: 1, mobile: 4 },
  { date: "2024-05-02", desktop: 2, mobile: 7 },
  { date: "2024-05-03", desktop: 1, mobile: 3 },
  { date: "2024-05-04", desktop: 3, mobile: 9 },
  { date: "2024-05-05", desktop: 4, mobile: 10 },
  { date: "2024-05-06", desktop: 4, mobile: 12 },
  { date: "2024-05-07", desktop: 3, mobile: 7 },
  { date: "2024-05-08", desktop: 1, mobile: 4 },
  { date: "2024-05-09", desktop: 2, mobile: 3 },
  { date: "2024-05-10", desktop: 2, mobile: 8 },
  { date: "2024-05-11", desktop: 3, mobile: 6 },
  { date: "2024-05-12", desktop: 1, mobile: 5 },
  { date: "2024-05-13", desktop: 1, mobile: 3 },
  { date: "2024-05-14", desktop: 4, mobile: 11 },
  { date: "2024-05-15", desktop: 4, mobile: 9 },
  { date: "2024-05-16", desktop: 3, mobile: 10 },
  { date: "2024-05-17", desktop: 4, mobile: 9 },
  { date: "2024-05-18", desktop: 2, mobile: 8 },
  { date: "2024-05-19", desktop: 2, mobile: 4 },
  { date: "2024-05-20", desktop: 1, mobile: 5 },
  { date: "2024-05-21", desktop: 0, mobile: 2 },
  { date: "2024-05-22", desktop: 0, mobile: 2 },
  { date: "2024-05-23", desktop: 2, mobile: 7 },
  { date: "2024-05-24", desktop: 2, mobile: 5 },
  { date: "2024-05-25", desktop: 1, mobile: 6 },
  { date: "2024-05-26", desktop: 2, mobile: 4 },
  { date: "2024-05-27", desktop: 3, mobile: 10 },
  { date: "2024-05-28", desktop: 2, mobile: 4 },
  { date: "2024-05-29", desktop: 0, mobile: 2 },
  { date: "2024-05-30", desktop: 3, mobile: 7 },
  { date: "2024-05-31", desktop: 1, mobile: 5 },
  { date: "2024-06-01", desktop: 1, mobile: 4 },
  { date: "2024-06-02", desktop: 4, mobile: 9 },
  { date: "2024-06-03", desktop: 0, mobile: 3 },
  { date: "2024-06-04", desktop: 3, mobile: 8 },
  { date: "2024-06-05", desktop: 0, mobile: 2 },
  { date: "2024-06-06", desktop: 2, mobile: 6 },
  { date: "2024-06-07", desktop: 3, mobile: 8 },
  { date: "2024-06-08", desktop: 3, mobile: 7 },
  { date: "2024-06-09", desktop: 3, mobile: 10 },
  { date: "2024-06-10", desktop: 1, mobile: 4 },
  { date: "2024-06-11", desktop: 0, mobile: 3 },
  { date: "2024-06-12", desktop: 4, mobile: 9 },
  { date: "2024-06-13", desktop: 0, mobile: 2 },
  { date: "2024-06-14", desktop: 3, mobile: 8 },
  { date: "2024-06-15", desktop: 2, mobile: 8 },
  { date: "2024-06-16", desktop: 3, mobile: 7 },
  { date: "2024-06-17", desktop: 4, mobile: 11 },
  { date: "2024-06-18", desktop: 0, mobile: 3 },
  { date: "2024-06-19", desktop: 3, mobile: 6 },
  { date: "2024-06-20", desktop: 3, mobile: 10 },
  { date: "2024-06-21", desktop: 1, mobile: 4 },
  { date: "2024-06-22", desktop: 2, mobile: 6 },
  { date: "2024-06-23", desktop: 4, mobile: 12 },
  { date: "2024-06-24", desktop: 1, mobile: 3 },
  { date: "2024-06-25", desktop: 1, mobile: 4 },
  { date: "2024-06-26", desktop: 3, mobile: 8 },
  { date: "2024-06-27", desktop: 3, mobile: 10 },
  { date: "2024-06-28", desktop: 1, mobile: 4 },
  { date: "2024-06-29", desktop: 0, mobile: 3 },
  { date: "2024-06-30", desktop: 3, mobile: 9 },
]

const chartConfig = {
  visitors: {
    label: "Walking Activity",
  },
  walks: {
    label: "Walks Completed",
    color: "hsl(var(--primary))",
  },
  distance: {
    label: "Distance (km)",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState<"week" | "month" | "3months" | "6months">("6months")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("month")
    }
  }, [isMobile])

  // Get real user walking activity data
  const walkingActivity = useQuery(api.users.getUserWalkingActivity, { timeRange });

  // Transform data for the chart - ensure we have some data points even if empty
  const chartData = React.useMemo(() => {
    if (!walkingActivity || walkingActivity.length === 0) {
      // Generate empty data points for the selected time range
      const now = new Date();
      const days = timeRange === "week" ? 7 : timeRange === "month" ? 30 : timeRange === "3months" ? 90 : 180;
      const emptyData = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        emptyData.push({
          date: date.toISOString().split('T')[0],
          walks: 0,
          distance: 0,
          time: 0
        });
      }
      return emptyData;
    }

    return walkingActivity.map(activity => ({
      ...activity,
      // Round distance for cleaner display
      distance: Math.round(activity.distance * 10) / 10
    }));
  }, [walkingActivity, timeRange]);

  const hasData = walkingActivity && walkingActivity.length > 0 && walkingActivity.some(d => d.walks > 0);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Walking Activity</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {hasData ? 'Your personal walking activity over time' : 'Start logging walks to see your activity'}
          </span>
        </CardDescription>
        <CardAction className="flex items-center justify-between">
          <span className="shrink-0 text-xs text-muted-foreground">
            {hasData ? 'Walks completed and distance covered' : 'No activity yet'}
          </span>
          <div className="flex items-center gap-2">
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={(value) => {
                if (value) setTimeRange(value as "week" | "month" | "3months" | "6months")
              }}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="week" aria-label="Last week">
                1w
              </ToggleGroupItem>
              <ToggleGroupItem value="month" aria-label="Last month">
                1m
              </ToggleGroupItem>
              <ToggleGroupItem value="3months" aria-label="Last 3 months">
                3m
              </ToggleGroupItem>
              <ToggleGroupItem value="6months" aria-label="Last 6 months">
                6m
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="pb-4">
        {walkingActivity === undefined ? (
          // Loading state
          <div className="h-[200px] w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                  indicator="dot"
                  labelFormatter={(value) => {
                    const date = new Date(value)
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />}
              />
              <Area
                dataKey="distance"
                type="natural"
                fill="var(--color-distance)"
                fillOpacity={0.3}
                stroke="var(--color-distance)"
                strokeWidth={1}
                stackId="a"
              />
              <Area
                dataKey="walks"
                type="natural"
                fill="var(--color-walks)"
                fillOpacity={0.6}
                stroke="var(--color-walks)"
                strokeWidth={2}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}