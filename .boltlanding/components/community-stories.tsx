"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Quote, Trophy, Mountain, Heart } from 'lucide-react';

interface WalkerStory {
  id: string;
  name: string;
  location: string;
  title: string;
  story: string;
  walkCompleted: string;
  achievement: string;
  avatar: string;
  badges: string[];
  walkCount: number;
  memberSince: string;
}

const communityStories: WalkerStory[] = [
  {
    id: '1',
    name: 'Fiona MacLeod',
    location: 'Glasgow',
    title: 'From Office Worker to Munro Completer',
    story: 'Started with Arthur\'s Seat on a lunch break, never imagined I\'d complete all 282 Munros. Each summit taught me something new about Scotland\'s wild beauty and my own resilience.',
    walkCompleted: 'Ben More (Mull)',
    achievement: 'Munro Completer #4,821',
    avatar: 'https://images.pexels.com/photos/3767411/pexels-photo-3767411.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    badges: ['Munro Completer', 'Island Explorer', 'Winter Walker'],
    walkCount: 347,
    memberSince: '2019'
  },
  {
    id: '2',
    name: 'James Cameron',
    location: 'Inverness',
    title: 'Conquering Fear on the Cuillin Ridge',
    story: 'Always avoided scrambling until my 50th birthday. The Skye Cuillin changed everything - now I seek out the technical routes that once terrified me. Age is just a number in the Highlands.',
    walkCompleted: 'Inaccessible Pinnacle',
    achievement: 'Skye Scrambler',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    badges: ['Skye Scrambler', 'Technical Routes', 'Courage Award'],
    walkCount: 89,
    memberSince: '2021'
  },
  {
    id: '3',
    name: 'Ailsa Stewart',
    location: 'Edinburgh',
    title: 'My First Munro at 65',
    story: 'Retirement gift to myself was a pair of walking boots. Two years later, I\'ve climbed 47 Munros and discovered a community that welcomes everyone. The hills don\'t care about your age, only your spirit.',
    walkCompleted: 'Ben Lawers',
    achievement: 'Late Starter Champion',
    avatar: 'https://images.pexels.com/photos/3931553/pexels-photo-3931553.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    badges: ['Late Starter', 'Inspiration', 'Community Champion'],
    walkCount: 47,
    memberSince: '2022'
  },
  {
    id: '4',
    name: 'Ruaridh MacKenzie',
    location: 'Fort William',
    title: 'Teaching My Daughter Highland Heritage',
    story: 'Growing up in the shadow of Ben Nevis, I wanted to share our Highland heritage with my daughter. Now she\'s 16 and has climbed more Corbetts than most adults. Proud dad moment on every summit.',
    walkCompleted: 'Beinn Eighe',
    achievement: 'Family Heritage',
    avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    badges: ['Family Guide', 'Heritage Keeper', 'Young Mountaineer Mentor'],
    walkCount: 156,
    memberSince: '2018'
  }
];

const getBadgeIcon = (badge: string) => {
  switch (badge) {
    case 'Munro Completer':
    case 'Skye Scrambler':
    case 'Technical Routes':
      return Mountain;
    case 'Family Guide':
    case 'Community Champion':
    case 'Heritage Keeper':
      return Heart;
    default:
      return Trophy;
  }
};

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case 'Munro Completer':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Skye Scrambler':
    case 'Technical Routes':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Late Starter':
    case 'Inspiration':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Family Guide':
    case 'Community Champion':
    case 'Heritage Keeper':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

export default function CommunityStories() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-emerald-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Tales from the Trail
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Highland Heroes &
            <span className="block text-emerald-600">Their Stories</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real walkers, real adventures, real inspiration. Meet the community that makes 
            Scottish walking culture so special and welcoming.
          </p>
          <p className="text-sm text-slate-500 mt-4 italic">
            "Is math an rathad fada gun charaid" - A long road is good with a friend
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {communityStories.map((story) => (
            <Card 
              key={story.id} 
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
            >
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 h-12 text-emerald-600" />
              </div>

              <CardContent className="p-8">
                {/* Walker Profile */}
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="w-16 h-16">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900">{story.name}</h3>
                    <p className="text-slate-600 text-sm">{story.location}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>{story.walkCount} walks completed</span>
                      <span>Member since {story.memberSince}</span>
                    </div>
                  </div>
                </div>

                {/* Story Title */}
                <h4 className="text-xl font-semibold text-slate-900 mb-4">{story.title}</h4>

                {/* Story Content */}
                <p className="text-slate-600 mb-6 leading-relaxed">{story.story}</p>

                {/* Achievement Highlight */}
                <div className="bg-emerald-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-emerald-800">Latest Achievement</div>
                      <div className="text-sm text-emerald-600">{story.achievement}</div>
                      <div className="text-xs text-emerald-500">Completed: {story.walkCompleted}</div>
                    </div>
                  </div>
                </div>

                {/* Walker Badges */}
                <div className="space-y-3">
                  <h5 className="text-sm font-semibold text-slate-900">Walker Badges</h5>
                  <div className="flex flex-wrap gap-2">
                    {story.badges.map((badge) => {
                      const IconComponent = getBadgeIcon(badge);
                      return (
                        <Badge 
                          key={badge}
                          variant="outline" 
                          className={`${getBadgeColor(badge)} flex items-center gap-1`}
                        >
                          <IconComponent className="w-3 h-3" />
                          {badge}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Stats */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-center text-slate-900 mb-8">
            Our Highland Community
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">10,247</div>
              <div className="text-sm text-slate-600">Active Walkers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4,821</div>
              <div className="text-sm text-slate-600">Munro Completers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">156,432</div>
              <div className="text-sm text-slate-600">Walks Logged</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600 mb-2">2,891</div>
              <div className="text-sm text-slate-600">Stories Shared</div>
            </div>
          </div>
        </div>

        {/* Join Community CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-slate-600 mb-6">
            Ready to write your own Highland story?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
              Join Our Community
            </button>
            <button className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-lg font-semibold transition-colors">
              Share Your Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}