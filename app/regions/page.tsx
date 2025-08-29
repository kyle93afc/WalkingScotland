'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import ScotlandMapbox from '@/components/map/ScotlandMapbox';


export default function RegionsPage() {
  const router = useRouter();

  const handleRegionClick = useCallback((regionSlug: string) => {
    router.push(`/regions/${regionSlug}`);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Scotland&apos;s
            <span className="block text-emerald-600">Walking Regions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Click on a region to discover amazing walks and hiking routes.
          </p>
        </div>
        
        <ScotlandMapbox 
          onRegionClick={handleRegionClick}
          className="max-w-5xl mx-auto"
        />
      </div>
    </div>
  );
}