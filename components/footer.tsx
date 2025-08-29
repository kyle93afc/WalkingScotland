"use client";

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Mountain, Mail, Phone, MapPin, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Harris Tweed inspired pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(16, 185, 129, 0.1) 20px, rgba(16, 185, 129, 0.1) 22px),
            repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(139, 69, 19, 0.1) 20px, rgba(139, 69, 19, 0.1) 22px)
          `,
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600 rounded-lg">
                  <Mountain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Walking Scotland</h3>
                  <p className="text-slate-400 text-sm italic">Coiseachd na h-Alba</p>
                </div>
              </div>
              
              <p className="text-slate-300">
                Discover Scotland&apos;s magnificent walking heritage through authentic Highland experiences 
                and modern mountaineering wisdom.
              </p>

              <div className="space-y-2">
                <p className="text-slate-400 text-sm">
                  &quot;Thig crioch air an t-saoghal ach mairidh gaol is ceòl&quot;
                </p>
                <p className="text-slate-500 text-xs italic">
                  The world may come to an end, but love and music will endure
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <div className="w-5 h-5 bg-current opacity-60" />
                </a>
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <div className="w-5 h-5 bg-current opacity-60" />
                </a>
                <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <div className="w-5 h-5 bg-current opacity-60" />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="grid md:grid-cols-3 gap-8 lg:col-span-3">
              {/* Explore Section */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Explore Scotland</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/walks?filter=munros" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      All 282 Munros
                    </Link>
                  </li>
                  <li>
                    <Link href="/walks?filter=corbetts" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      Corbetts & Donalds
                    </Link>
                  </li>
                  <li>
                    <Link href="/walks?filter=islands" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      Island Adventures
                    </Link>
                  </li>
                  <li>
                    <Link href="/walks?filter=coastal" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      Coastal Walks
                    </Link>
                  </li>
                  <li>
                    <Link href="/walks?filter=historic" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      Historic Routes
                    </Link>
                  </li>
                  <li>
                    <Link href="/walks?gaelic=true" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      Gaelic Place Names
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Community Section */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Highland Community</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/community/stories" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      Walker Stories
                    </Link>
                  </li>
                  <li>
                    <Link href="/planning" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      Route Planning
                    </Link>
                  </li>
                  <li>
                    <Link href="/safety" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      Safety Guidelines
                    </Link>
                  </li>
                  <li>
                    <Link href="/weather" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      Weather Alerts
                    </Link>
                  </li>
                  <li>
                    <Link href="/community/groups" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      Walking Groups
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/achievements" className="text-slate-300 hover:text-emerald-400 transition-colors">
                      Achievement Badges
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Scottish Organizations */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Scottish Partners</h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://www.mountaineering.scot" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2"
                    >
                      Mountaineering Scotland
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.scottishmountainrescue.org" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2"
                    >
                      Scottish Mountain Rescue
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.nature.scot" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2"
                    >
                      NatureScot
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.johnmuirtrust.org" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2"
                    >
                      John Muir Trust
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.ramblers.org.uk/scotland" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2"
                    >
                      Ramblers Scotland
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Highland Heritage Section */}
          <div className="mt-16 pt-8 border-t border-slate-800">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-100 border-emerald-400/30 mb-4">
                Highland Heritage
              </Badge>
              <div className="flex justify-center gap-8 text-slate-400">
                <div className="text-center">
                  <div className="text-2xl">🏴󠁧󠁢󠁳󠁣󠁴󠁿</div>
                  <p className="text-xs mt-1">Proud Scottish</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl">🥾</div>
                  <p className="text-xs mt-1">Safe Walking</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl">🦌</div>
                  <p className="text-xs mt-1">Wildlife Respect</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl">🌿</div>
                  <p className="text-xs mt-1">Leave No Trace</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                <Mail className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-sm text-slate-400">Email Us</div>
                  <div className="text-white">hello@walkingscotland.co.uk</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                <Phone className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-sm text-slate-400">Emergency Only</div>
                  <div className="text-white">999 / 112</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-sm text-slate-400">Based in</div>
                  <div className="text-white">Edinburgh, Scotland</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <p>&copy; {currentYear} Walking Scotland. All rights reserved.</p>
                <span className="hidden md:inline">•</span>
                <p className="hidden md:inline">Registered Scottish Charity</p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <Link href="/privacy" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Terms of Use
                </Link>
                <Link href="/cookies" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Cookie Policy
                </Link>
                <div className="flex items-center gap-1 text-slate-400">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>Made in Scotland</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}