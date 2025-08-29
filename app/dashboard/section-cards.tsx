"use client"

import { IconTrendingUp, IconMapPin, IconMountain, IconCalendar, IconTrophy } from "@tabler/icons-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  // Get real user statistics
  const userStats = useQuery(api.users.getUserStats);
  const walkingActivity = useQuery(api.users.getUserWalkingActivity, { timeRange: "month" });

  // Calculate monthly progress
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const monthlyWalks = walkingActivity?.reduce((sum, day) => sum + day.walks, 0) || 0;
  const monthlyDistance = walkingActivity?.reduce((sum, day) => sum + day.distance, 0) || 0;

  // Calculate growth percentages (placeholder for now - would need historical data)
  const distanceGrowth = userStats?.totalDistance ? 15.2 : 0;
  const munrosLeft = 282 - (userStats?.munrosClimbed || 0);

  // Show loading state
  if (userStats === undefined) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <CardDescription className="h-4 bg-gray-200 rounded"></CardDescription>
              <CardTitle className="h-8 bg-gray-200 rounded mt-2"></CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  // Show default state for new users
  if (!userStats || userStats.totalWalks === 0) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Distance</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              0 km
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconMapPin />
                Start walking
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Begin your journey <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Start logging walks to see your progress
            </div>
          </CardFooter>
        </Card>
        
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Munros Climbed</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              0
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconMountain />
                282 to go
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Conquer Scotland&apos;s peaks <IconMountain className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Scottish peaks above 3,000 feet
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Walks Completed</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              0
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconMapPin />
                Ready to start
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Your walking adventures await <IconMapPin className="size-4" />
            </div>
            <div className="text-muted-foreground">Total walks completed</div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              0 walks
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconCalendar />
                0 km
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Start your {currentMonth} journey <IconTrophy className="size-4" />
            </div>
            <div className="text-muted-foreground">{currentMonth} progress summary</div>
          </CardFooter>
        </Card>
      </div>
    );
  }
  // Show real user data
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Distance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {Math.round(userStats.totalDistance)} km
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              {distanceGrowth > 0 ? `+${distanceGrowth}%` : 'Getting started'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {userStats.totalDistance > 100 ? 'Excellent progress!' : 'Keep walking!'} <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total walking distance achieved
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Munros Climbed</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {userStats.munrosClimbed}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconMountain />
              {munrosLeft} left
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {userStats.munrosClimbed > 0 ? 'Conquering peaks!' : 'Start your Munro quest'} <IconMountain className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Scottish peaks above 3,000 feet
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Walks Completed</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {userStats.totalWalks}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconMapPin />
              {monthlyWalks > 0 ? `+${monthlyWalks} this month` : 'Log your first walk'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {userStats.totalWalks > 10 ? 'Active walking schedule' : 'Building momentum'} <IconMapPin className="size-4" />
          </div>
          <div className="text-muted-foreground">Total walks completed</div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {monthlyWalks} walk{monthlyWalks !== 1 ? 's' : ''}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCalendar />
              {Math.round(monthlyDistance)} km
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {monthlyWalks > 5 ? 'Great monthly activity' : monthlyWalks > 0 ? 'Good start to the month' : `Start your ${currentMonth} journey`} <IconTrophy className="size-4" />
          </div>
          <div className="text-muted-foreground">{currentMonth} progress summary</div>
        </CardFooter>
      </Card>
    </div>
  )
}
