import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mountain, MapPin, Mail, Phone, Github, Twitter, Instagram } from 'lucide-react'

const footerNavigation = {
  explore: [
    { name: 'All Walks', href: '/walks' },
    { name: 'Regions', href: '/regions' },
    { name: 'Featured Routes', href: '/walks?featured=true' },
    { name: 'Beginner Walks', href: '/walks?difficulty=Easy' },
  ],
  regions: [
    { name: 'Scottish Highlands', href: '/regions/fort-william' },
    { name: 'Isle of Skye', href: '/regions/isle-of-skye' },
    { name: 'Cairngorms', href: '/regions/cairngorms-aviemore' },
    { name: 'Loch Lomond', href: '/regions/loch-lomond-trossachs' },
  ],
  resources: [
    { name: 'Walking Safety', href: '/safety' },
    { name: 'Weather Guide', href: '/weather' },
    { name: 'Equipment Tips', href: '/equipment' },
    { name: 'Trail Etiquette', href: '/etiquette' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

const socialLinks = [
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
]

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Brand Section */}
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600">
                  <Mountain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Walking Scotland
                </span>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-md">
                Discover Scotland's most beautiful walking routes, from highland peaks to peaceful island trails. 
                Your guide to exploring Scotland's natural heritage.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-400 hover:text-emerald-600 transition-colors"
                    >
                      <span className="sr-only">{item.name}</span>
                      <Icon className="h-5 w-5" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Links Grid */}
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                    Explore
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {footerNavigation.explore.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-base text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                    Popular Regions
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {footerNavigation.regions.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-base text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                    Resources
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {footerNavigation.resources.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-base text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-base text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="max-w-md">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                  Subscribe to our newsletter
                </h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  Get the latest walking routes and Scottish outdoor news delivered to your inbox.
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-8">
                <div className="flex max-w-md">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="min-w-0 flex-auto"
                  />
                  <Button className="ml-2">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Walking Scotland. All rights reserved.
              </p>
            </div>
            <div className="mt-4 flex items-center space-x-6 md:mt-0">
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Proudly Scottish</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Mail className="h-4 w-4" />
                <Link href="mailto:hello@walkingscotland.com" className="hover:text-emerald-600 transition-colors">
                  hello@walkingscotland.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}