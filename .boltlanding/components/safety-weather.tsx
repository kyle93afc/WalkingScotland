"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Cloud, AlertTriangle, Phone, Radio, Waves, Eye, Thermometer, Wind, CloudRain } from 'lucide-react';

interface WeatherStation {
  id: string;
  name: string;
  location: string;
  temperature: number;
  windSpeed: number;
  conditions: string;
  visibility: string;
  status: 'good' | 'caution' | 'danger';
  lastUpdated: string;
}

interface SafetyAlert {
  id: string;
  type: 'weather' | 'rescue' | 'tide' | 'aurora';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  affectedAreas: string[];
  validUntil: string;
}

const weatherStations: WeatherStation[] = [
  {
    id: '1',
    name: 'Cairn Gorm Summit',
    location: 'Cairngorms National Park',
    temperature: -2,
    windSpeed: 45,
    conditions: 'Snow showers',
    visibility: '200m',
    status: 'danger',
    lastUpdated: '10 mins ago'
  },
  {
    id: '2',
    name: 'Ben Nevis Observatory',
    location: 'West Highlands',
    temperature: 5,
    windSpeed: 25,
    conditions: 'Clear skies',
    visibility: '40km+',
    status: 'good',
    lastUpdated: '5 mins ago'
  },
  {
    id: '3',
    name: 'Skye Cuillin',
    location: 'Isle of Skye',
    temperature: 8,
    windSpeed: 35,
    conditions: 'Partly cloudy',
    visibility: '15km',
    status: 'caution',
    lastUpdated: '15 mins ago'
  }
];

const safetyAlerts: SafetyAlert[] = [
  {
    id: '1',
    type: 'weather',
    severity: 'critical',
    title: 'Severe Weather Warning',
    description: 'High winds and snow expected above 600m. Whiteout conditions likely on high peaks.',
    affectedAreas: ['Cairngorms', 'Ben Nevis', 'Southern Uplands'],
    validUntil: 'Tomorrow 6 PM'
  },
  {
    id: '2',
    type: 'rescue',
    severity: 'info',
    title: 'Mountain Rescue Training',
    description: 'Cairngorm MRT conducting training exercises. Increased helicopter activity expected.',
    affectedAreas: ['Cairngorms'],
    validUntil: 'Today 5 PM'
  },
  {
    id: '3',
    type: 'aurora',
    severity: 'info',
    title: 'Aurora Activity Tonight',
    description: 'High probability of Northern Lights visible from northern peaks after 10 PM.',
    affectedAreas: ['Highlands', 'Islands'],
    validUntil: 'Tonight 11:59 PM'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'good': return 'text-green-600 bg-green-100';
    case 'caution': return 'text-amber-600 bg-amber-100';
    case 'danger': return 'text-red-600 bg-red-100';
    default: return 'text-slate-600 bg-slate-100';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'info': return 'border-blue-200 bg-blue-50';
    case 'warning': return 'border-amber-200 bg-amber-50';
    case 'critical': return 'border-red-200 bg-red-50';
    default: return 'border-slate-200 bg-slate-50';
  }
};

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'weather': return CloudRain;
    case 'rescue': return Shield;
    case 'tide': return Waves;
    case 'aurora': return Eye;
    default: return AlertTriangle;
  }
};

export default function SafetyWeather() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-GB', {
        hour12: false,
        timeZone: 'Europe/London'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-100 border-emerald-400/30 mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Highland Safety & Weather
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Stay Safe in Scotland's
            <span className="block text-emerald-400">Wild Places</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Real-time weather data, Mountain Rescue integration, and local safety alerts 
            to keep you informed in Scotland's ever-changing conditions.
          </p>
          <p className="text-sm text-slate-400 mt-4">
            Current Highland Time: <span className="font-mono text-emerald-400">{currentTime}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Weather Stations */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Live Weather Stations</h3>
              <Badge variant="outline" className="text-green-400 border-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                Live Data
              </Badge>
            </div>

            <div className="space-y-4">
              {weatherStations.map((station) => (
                <Card key={station.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{station.name}</h4>
                        <p className="text-slate-400 text-sm">{station.location}</p>
                        <p className="text-xs text-slate-500">Updated {station.lastUpdated}</p>
                      </div>
                      <Badge className={getStatusColor(station.status)}>
                        {station.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Thermometer className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="text-xl font-bold text-white">{station.temperature}°C</div>
                        <div className="text-xs text-slate-400">Temperature</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Wind className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="text-xl font-bold text-white">{station.windSpeed}</div>
                        <div className="text-xs text-slate-400">mph</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Eye className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="text-xl font-bold text-white">{station.visibility}</div>
                        <div className="text-xs text-slate-400">Visibility</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Cloud className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="text-sm font-bold text-white">{station.conditions}</div>
                        <div className="text-xs text-slate-400">Conditions</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Scottish-specific Safety Features */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Highland Safety Features</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                    <Phone className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-white">Mountain Rescue Direct</div>
                      <div className="text-xs text-slate-400">999 or 112 emergency calling</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                    <Waves className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="font-semibold text-white">Coastal Tide Tables</div>
                      <div className="text-xs text-slate-400">Real-time tidal data</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                    <Radio className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="font-semibold text-white">Bothies Network</div>
                      <div className="text-xs text-slate-400">Mountain shelter locations</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                    <Eye className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="font-semibold text-white">Aurora Alerts</div>
                      <div className="text-xs text-slate-400">Northern Lights forecasting</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Safety Alerts Sidebar */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Highland Alerts</h3>
            
            {safetyAlerts.map((alert) => {
              const IconComponent = getAlertIcon(alert.type);
              return (
                <Card 
                  key={alert.id} 
                  className={`border-2 ${getSeverityColor(alert.severity)} bg-opacity-10`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <IconComponent className={`w-5 h-5 mt-1 ${
                        alert.severity === 'critical' ? 'text-red-400' :
                        alert.severity === 'warning' ? 'text-amber-400' : 'text-blue-400'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{alert.title}</h4>
                        <p className="text-sm text-slate-300 mt-1">{alert.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-slate-400">Affected Areas:</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {alert.affectedAreas.map((area) => (
                            <Badge 
                              key={area} 
                              variant="outline" 
                              className="text-xs text-slate-300 border-slate-600"
                            >
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-xs text-slate-400">
                        Valid until: <span className="text-slate-300">{alert.validUntil}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Emergency Contacts */}
            <Card className="bg-red-950/50 border-red-800">
              <CardContent className="p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-400" />
                  Emergency Contacts
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Mountain Rescue:</span>
                    <span className="text-white font-mono">999 / 112</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Coastguard:</span>
                    <span className="text-white font-mono">999</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Police Scotland:</span>
                    <span className="text-white font-mono">101</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Download Safety App
            </Button>
          </div>
        </div>

        {/* Highland Safety Wisdom */}
        <div className="mt-16 text-center">
          <blockquote className="text-xl italic text-slate-300 max-w-3xl mx-auto">
            "The mountains will be there tomorrow, but you need to be there to enjoy them."
          </blockquote>
          <p className="text-slate-400 mt-4">— Scottish Mountain Safety saying</p>
        </div>
      </div>
    </section>
  );
}