import React from 'react';
import WalkDetailPage from './WalkDetailPage';

interface Params {
  slug: string;
}

export default function WalkPage({ params }: { params: Params }) {
  return <WalkDetailPage slug={params.slug} />;
}

// This would be used for static generation in production
export async function generateStaticParams() {
  // In production, you'd query your database for all walk slugs
  // For now, return empty array to generate pages on-demand
  return [];
}