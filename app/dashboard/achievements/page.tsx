'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Mountain, 
  Route,
  Medal,
  Star,
  MapPin,
  Clock,
  Target
} from 'lucide-react';
import Link from 'next/link';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  requirement: number;
  current: number;
  unit: string;
  category: 'distance' | 'walks' | 'mountains' | 'time' | 'special';
  earned: boolean;
  earnedDate?: number;
}

const achievementTypes = {
  bronze: { color: 'bg-amber-600 text-white', border: 'border-amber-600' },
  silver: { color: 'bg-gray-500 text-white', border: 'border-gray-500' },
  gold: { color: 'bg-yellow-500 text-white', border: 'border-yellow-500' },
  platinum: { color: 'bg-purple-600 text-white', border: 'border-purple-600' }
};

export default function AchievementsPage() {
  const userStats = useQuery(api.users.getUserStats);

  // Define achievement categories
  const achievements = React.useMemo((): Achievement[] => {
    if (!userStats) return [];

    return [
      // Distance Achievements
      {
        id: 'distance-100',
        title: 'First Century',
        description: 'Walk 100km in total',
        icon: <Route className="size-6" />,
        type: 'bronze',
        requirement: 100,
        current: userStats.totalDistance,
        unit: 'km',
        category: 'distance',
        earned: userStats.totalDistance >= 100
      },
      {
        id: 'distance-500',
        title: 'Distance Warrior',
        description: 'Walk 500km in total',
        icon: <Route className="size-6" />,
        type: 'silver',
        requirement: 500,
        current: userStats.totalDistance,
        unit: 'km',
        category: 'distance',
        earned: userStats.totalDistance >= 500
      },
      {
        id: 'distance-1000',
        title: 'Highland Wanderer',
        description: 'Walk 1,000km in total',
        icon: <Route className="size-6" />,
        type: 'gold',
        requirement: 1000,
        current: userStats.totalDistance,
        unit: 'km',
        category: 'distance',
        earned: userStats.totalDistance >= 1000
      },

      // Walk Count Achievements
      {
        id: 'walks-10',
        title: 'Getting Started',
        description: 'Complete 10 walks',
        icon: <MapPin className="size-6" />,
        type: 'bronze',
        requirement: 10,
        current: userStats.totalWalks,
        unit: 'walks',
        category: 'walks',
        earned: userStats.totalWalks >= 10
      },
      {
        id: 'walks-50',
        title: 'Regular Walker',
        description: 'Complete 50 walks',
        icon: <MapPin className="size-6" />,
        type: 'silver',
        requirement: 50,
        current: userStats.totalWalks,
        unit: 'walks',
        category: 'walks',
        earned: userStats.totalWalks >= 50
      },
      {
        id: 'walks-100',
        title: 'Walk Master',
        description: 'Complete 100 walks',
        icon: <MapPin className="size-6" />,
        type: 'gold',
        requirement: 100,
        current: userStats.totalWalks,
        unit: 'walks',
        category: 'walks',
        earned: userStats.totalWalks >= 100
      },

      // Mountain Achievements
      {
        id: 'munro-1',
        title: 'First Munro',
        description: 'Climb your first Munro',
        icon: <Mountain className="size-6" />,
        type: 'bronze',
        requirement: 1,
        current: userStats.munrosClimbed,
        unit: 'Munros',
        category: 'mountains',
        earned: userStats.munrosClimbed >= 1
      },
      {
        id: 'munro-10',
        title: 'Munro Collector',
        description: 'Climb 10 Munros',
        icon: <Mountain className="size-6" />,
        type: 'silver',
        requirement: 10,
        current: userStats.munrosClimbed,
        unit: 'Munros',
        category: 'mountains',
        earned: userStats.munrosClimbed >= 10
      },
      {
        id: 'munro-50',
        title: 'Munro Enthusiast',
        description: 'Climb 50 Munros',
        icon: <Mountain className="size-6" />,
        type: 'gold',
        requirement: 50,
        current: userStats.munrosClimbed,
        unit: 'Munros',
        category: 'mountains',
        earned: userStats.munrosClimbed >= 50
      },
      {
        id: 'munro-282',
        title: 'Munro Compleatist',
        description: 'Climb all 282 Munros',
        icon: <Mountain className="size-6" />,
        type: 'platinum',
        requirement: 282,
        current: userStats.munrosClimbed,
        unit: 'Munros',
        category: 'mountains',
        earned: userStats.munrosClimbed >= 282
      },

      // Time Achievements
      {
        id: 'time-100',
        title: 'Time Keeper',
        description: 'Spend 100 hours walking',
        icon: <Clock className="size-6" />,
        type: 'bronze',
        requirement: 100,
        current: userStats.totalTime,
        unit: 'hours',
        category: 'time',
        earned: userStats.totalTime >= 100
      },
      {
        id: 'time-500',
        title: 'Dedicated Walker',
        description: 'Spend 500 hours walking',
        icon: <Clock className="size-6" />,
        type: 'silver',
        requirement: 500,
        current: userStats.totalTime,
        unit: 'hours',
        category: 'time',
        earned: userStats.totalTime >= 500
      },

      // Special Achievements
      {
        id: 'reporter',
        title: 'Walk Reporter',
        description: 'Write 5 detailed walk reports',
        icon: <Star className="size-6" />,
        type: 'silver',
        requirement: 5,
        current: userStats.reportsWritten,
        unit: 'reports',
        category: 'special',
        earned: userStats.reportsWritten >= 5
      }
    ];
  }, [userStats]);

  const earnedAchievements = achievements.filter(a => a.earned);
  const availableAchievements = achievements.filter(a => !a.earned);

  if (!userStats) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Achievements</h1>
        <p className="text-muted-foreground">
          Track your walking milestones and Scottish mountain achievements
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="size-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{earnedAchievements.length}</div>
            <div className="text-sm text-muted-foreground">Earned</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="size-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{availableAchievements.length}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Mountain className="size-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.munrosClimbed}</div>
            <div className="text-sm text-muted-foreground">Munros</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Route className="size-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{Math.round(userStats.totalDistance)}</div>
            <div className="text-sm text-muted-foreground">km Total</div>
          </CardContent>
        </Card>
      </div>

      {/* Earned Achievements */}
      {earnedAchievements.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="size-5 text-yellow-500" />
            Earned Achievements ({earnedAchievements.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedAchievements.map((achievement) => (
              <Card key={achievement.id} className="border-2 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${achievementTypes[achievement.type].color}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={achievementTypes[achievement.type].color}>
                          {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                        </Badge>
                        <Medal className="size-4 text-yellow-500" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        {achievement.current}/{achievement.requirement} {achievement.unit}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Achievements */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="size-5 text-blue-500" />
          In Progress ({availableAchievements.length})
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableAchievements.map((achievement) => {
            const progress = Math.min((achievement.current / achievement.requirement) * 100, 100);
            const remaining = Math.max(0, achievement.requirement - achievement.current);
            
            return (
              <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{achievement.current} / {achievement.requirement} {achievement.unit}</span>
                          <span className="font-medium">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={achievementTypes[achievement.type].border}>
                            {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {remaining} more needed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* No achievements yet */}
      {earnedAchievements.length === 0 && userStats && userStats.totalWalks === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <Trophy className="size-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No achievements yet</h3>
            <p className="text-muted-foreground mb-6">
              Start walking to unlock your first achievements!
            </p>
            <Button asChild>
              <Link href="/walks">
                Find Your First Walk
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}