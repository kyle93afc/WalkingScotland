import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { HeroHeader } from "./header"
import { MapPin, Mountain, Users } from 'lucide-react'

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main>
                <section className="relative overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-emerald-950 dark:via-gray-900 dark:to-blue-950"></div>
                    
                    <div className="py-20 md:py-36 relative z-10">
                        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                            <div>
                                <Link
                                    href="/walks"
                                    className="hover:bg-emerald-100 dark:hover:bg-emerald-900/20 mx-auto flex w-fit items-center justify-center gap-2 rounded-full py-2 px-4 transition-colors duration-150 border border-emerald-200 dark:border-emerald-800">
                                    <Mountain className="size-4 text-emerald-600 dark:text-emerald-400" />
                                    <span className="font-medium text-emerald-700 dark:text-emerald-300">Discover Scotland's Best Walks</span>
                                </Link>
                                
                                <h1 className="mx-auto mt-8 max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Scotland's Mountains
                                    <br />
                                    <span className="text-gray-900 dark:text-white">Made Simple</span>
                                </h1>
                                
                                <p className="text-muted-foreground mx-auto my-6 max-w-2xl text-balance text-xl">
                                    Discover breathtaking walks across the Highlands, Islands, and Lowlands. 
                                    Interactive maps, real-time conditions, and a vibrant hiking community.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[180px]">
                                        <Link href="/walks">
                                            <MapPin className="size-4 mr-2" />
                                            <span className="text-nowrap">Explore Walks</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="min-w-[180px] border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300">
                                        <Link href="/regions">
                                            <Mountain className="size-4 mr-2" />
                                            <span className="text-nowrap">Browse Regions</span>
                                        </Link>
                                    </Button>
                                </div>

                                {/* Stats */}
                                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-emerald-600">2,000+</div>
                                        <div className="text-sm text-muted-foreground">Documented Walks</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-blue-600">50K+</div>
                                        <div className="text-sm text-muted-foreground">Active Hikers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-purple-600">Live</div>
                                        <div className="text-sm text-muted-foreground">Trail Conditions</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image/Map Preview */}
                        <div className="relative mt-16">
                            <div className="relative z-10 mx-auto max-w-6xl px-6">
                                <div className="relative mx-auto overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl shadow-black/10 bg-white dark:bg-gray-900">
                                    {/* Placeholder for hero image - you'll want to add a beautiful Scottish landscape or map screenshot */}
                                    <div className="aspect-[16/10] bg-gradient-to-br from-emerald-100 via-blue-100 to-purple-100 dark:from-emerald-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
                                        <div className="text-center">
                                            <Mountain className="size-16 mx-auto text-emerald-600 mb-4" />
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Interactive Maps</h3>
                                            <p className="text-gray-600 dark:text-gray-400">3D terrain, real-time weather, and live trail conditions</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating cards */}
                                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                                                <Users className="size-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">5 hikers on Ben Nevis</div>
                                                <div className="text-xs text-muted-foreground">Live now</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -right-4 top-1/4 transform -translate-y-1/2 hidden lg:block">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                <MapPin className="size-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">Clear conditions</div>
                                                <div className="text-xs text-muted-foreground">Cairngorms NP</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}