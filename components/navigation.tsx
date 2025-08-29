'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Mountain, Menu, MapPin, Compass, Info, User, LogOut } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { useTheme } from "next-themes"

const navigationItems = [
  { name: 'Regions', href: '/regions', icon: Mountain, description: 'Explore Scottish regions' },
  { name: 'About', href: '/#about', icon: Info, description: 'Learn more about us' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const { theme } = useTheme()

  const appearance = {
    baseTheme: theme === "dark" ? dark : undefined,
  }

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800' 
        : 'bg-transparent'
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600">
                <Mountain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Walking Scotland
              </span>
              <Badge variant="outline" className="text-xs">
                Beta
              </Badge>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-emerald-600',
                    isActive 
                      ? 'text-emerald-600' 
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center space-x-2">
              <AuthLoading>
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
              </AuthLoading>
              
              <Authenticated>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">
                    Dashboard
                  </Link>
                </Button>
                <UserButton appearance={appearance} />
              </Authenticated>

              <Unauthenticated>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">
                    Get Started
                  </Button>
                </SignUpButton>
              </Unauthenticated>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2 text-left">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-600">
                      <Mountain className="h-4 w-4 text-white" />
                    </div>
                    <span>Walking Scotland</span>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  {/* Mobile Navigation */}
                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                            isActive 
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <div>
                            <div>{item.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </nav>

                  {/* Mobile Auth */}
                  <div className="border-t pt-6">
                    <AuthLoading>
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="text-sm text-gray-500">Loading...</div>
                      </div>
                    </AuthLoading>
                    
                    <Authenticated>
                      <div className="space-y-2">
                        <Button asChild variant="outline" className="w-full justify-start">
                          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                            <User className="mr-2 h-4 w-4" />
                            Dashboard
                          </Link>
                        </Button>
                        <div className="flex justify-center pt-2">
                          <UserButton appearance={appearance} />
                        </div>
                      </div>
                    </Authenticated>

                    <Unauthenticated>
                      <div className="space-y-2">
                        <SignInButton mode="modal">
                          <Button variant="outline" className="w-full">
                            Sign In
                          </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <Button className="w-full">
                            Get Started
                          </Button>
                        </SignUpButton>
                      </div>
                    </Unauthenticated>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}