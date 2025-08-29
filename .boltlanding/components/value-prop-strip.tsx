"use client";

import React, { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Mountain, Cloud, MapPin, Shield, Zap, Users } from 'lucide-react';

const features = [
  { icon: Mountain, text: '282 Munros Tracked', subtext: 'Complete Highland collection' },
  { icon: Zap, text: 'Bog Factor Ratings', subtext: '1-5 scale for all routes' },
  { icon: MapPin, text: 'Gaelic Place Names', subtext: 'Ancient Scottish heritage' },
  { icon: Cloud, text: 'Live Cairngorms Weather', subtext: 'Real-time conditions' },
  { icon: Shield, text: 'Highland Safety Alerts', subtext: 'Mountain Rescue integrated' },
  { icon: Users, text: 'Active Walker Community', subtext: '10,000+ Highland enthusiasts' },
];

export default function ValuePropStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(16, 185, 129, 0.1) 40px, rgba(16, 185, 129, 0.1) 42px)`,
        }} />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center">
            <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-100 border-emerald-400/30 mb-4">
              Scottish Walking Excellence
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">
              Authentically Scottish, Thoroughly Modern
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Experience Scotland's walking heritage through cutting-edge technology and authentic Highland wisdom
            </p>
          </div>
        </div>

        {/* Scrolling feature strip */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-8 animate-scroll overflow-hidden"
            style={{
              animation: 'scroll 30s linear infinite',
            }}
          >
            {[...features, ...features].map((feature, index) => (
              <div
                key={index}
                className="flex-none bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 min-w-[300px] hover:bg-slate-700/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-600/20 rounded-lg group-hover:bg-emerald-600/30 transition-colors">
                    <feature.icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">{feature.text}</h3>
                    <p className="text-slate-400 text-sm">{feature.subtext}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highland symbols */}
        <div className="flex justify-center gap-8 mt-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-emerald-400 text-xl">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
            </div>
            <p className="text-sm text-slate-400">Highland Heritage</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-purple-400 text-xl">🥾</span>
            </div>
            <p className="text-sm text-slate-400">Mountain Safety</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-amber-400 text-xl">🦌</span>
            </div>
            <p className="text-sm text-slate-400">Wildlife Respect</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}