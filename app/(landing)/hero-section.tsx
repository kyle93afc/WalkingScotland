"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Mountain, Users, Compass } from 'lucide-react';

interface LiveActivity {
  id: string;
  location: string;
  count: number;
  activity: string;
  status: string;
}

export default function HeroSection() {
  const [liveActivities] = useState<LiveActivity[]>([
    { id: '1', location: 'Ben Nevis', count: 12, activity: 'climbers', status: 'Perfect conditions' },
    { id: '2', location: 'Cairngorms', count: 8, activity: 'walkers', status: 'Light snow' },
    { id: '3', location: 'Skye Cuillin', count: 5, activity: 'scramblers', status: 'Clear views' },
    { id: '4', location: 'Loch Lomond', count: 15, activity: 'hikers', status: 'Sunny spells' }
  ]);

  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivityIndex((prev) => (prev + 1) % liveActivities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [liveActivities.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Scottish mountain imagery */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/images/hero/hero-scottish-landscape.png')`,
        }}
      />
      
      {/* Clean overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-100 border-emerald-400/30 mb-4">
                <Mountain className="w-4 h-4 mr-2" />
                282 Munros • Unlimited Adventures
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Discover Scotland&apos;s
                <span className="block text-emerald-400">Highland Majesty</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-200 max-w-2xl">
                From ancient Munros to rugged Corbetts, explore Scotland&apos;s most spectacular walking routes with 
                real-time bog factor ratings, Gaelic place names, and Highland safety alerts.
              </p>
              
              <p className="text-sm text-slate-300 italic">
                &quot;Fàilte gu Alba&quot; - Welcome to Scotland
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold" asChild>
                <Link href="/regions">
                  <Compass className="w-5 h-5 mr-2" />
                  Explore Scotland&apos;s Regions
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold" asChild>
                <Link href="/regions">
                  Find Your Perfect Walk
                </Link>
              </Button>
            </div>

            {/* Scottish walking stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">282</div>
                <div className="text-sm text-slate-300">Munros</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">219</div>
                <div className="text-sm text-slate-300">Corbetts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">50+</div>
                <div className="text-sm text-slate-300">Islands</div>
              </div>
            </div>
          </div>

          {/* Right side - Interactive elements */}
          <div className="relative">
            {/* Animated Scotland Map Placeholder */}
            <div className="relative bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="aspect-[4/5] bg-gradient-to-b from-emerald-500/20 to-purple-500/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-purple-400/10" />
                <div className="text-center text-white z-10">
                  <Mountain className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
                  <p className="text-lg font-semibold">Interactive Scotland Map</p>
                  <p className="text-sm text-slate-300 mt-2">Click to explore regions</p>
                </div>
                
                {/* Floating activity pins */}
                <div className="absolute top-6 left-6 animate-pulse">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                </div>
                <div className="absolute top-1/3 right-8 animate-pulse delay-1000">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                </div>
                <div className="absolute bottom-1/3 left-1/3 animate-pulse delay-2000">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Live Activity Cards */}
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 space-y-4 hidden lg:block">
              {liveActivities.map((activity, index) => (
                <Card 
                  key={activity.id}
                  className={`p-4 bg-white/95 backdrop-blur-sm transition-all duration-500 ${
                    index === currentActivityIndex ? 'scale-105 shadow-lg' : 'scale-95 opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-emerald-600">{activity.count}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">{activity.activity}</div>
                      <div className="text-sm text-slate-600">{activity.location}</div>
                      <div className="text-xs text-emerald-600">{activity.status}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}