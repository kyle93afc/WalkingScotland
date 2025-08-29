'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, CloudRain, Navigation, CheckCircle2, AlertCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useAuth } from '@clerk/nextjs';

interface WalkCompletionDialogProps {
  walkId: Id<"walks">;
  walkTitle: string;
  estimatedTime: number;
  difficulty: string;
  children: React.ReactNode;
}

export function WalkCompletionDialog({ 
  walkId, 
  walkTitle, 
  estimatedTime, 
  difficulty, 
  children 
}: WalkCompletionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  
  const { userId } = useAuth();
  const logWalkCompletion = useMutation(api.walkReports.logWalkCompletion);

  const [formData, setFormData] = useState({
    title: `Completed ${walkTitle}`,
    content: '',
    actualTime: estimatedTime,
    weatherConditions: '',
    trailConditions: '',
    experiencedDifficulty: difficulty,
    completedAt: new Date().toISOString().slice(0, 16) // Format for datetime-local input
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setIsSubmitting(true);
    try {
      await logWalkCompletion({
        walkId,
        rating,
        title: formData.title,
        content: formData.content,
        actualTime: formData.actualTime,
        weatherConditions: formData.weatherConditions,
        trailConditions: formData.trailConditions,
        difficulty: formData.experiencedDifficulty as "Easy" | "Moderate" | "Hard" | "Strenuous",
        completedAt: new Date(formData.completedAt).getTime()
      });
      
      setShowSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setShowSuccess(false);
        // Reset form
        setFormData({
          title: `Completed ${walkTitle}`,
          content: '',
          actualTime: estimatedTime,
          weatherConditions: '',
          trailConditions: '',
          experiencedDifficulty: difficulty,
          completedAt: new Date().toISOString().slice(0, 16)
        });
        setRating(5);
      }, 2000);
    } catch (error) {
      console.error('Failed to log walk completion:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="size-16 text-emerald-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Walk Completed!</h3>
            <p className="text-muted-foreground mb-4">
              Your walking statistics have been updated automatically.
            </p>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
              +{formData.actualTime}h walking time
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-emerald-600" />
            Log Walk Completion
          </DialogTitle>
          <DialogDescription>
            Record your experience and help other walkers by sharing your completion details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Report Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Give your walk completion a title..."
                required
              />
            </div>

            <div>
              <Label htmlFor="completedAt">Completion Date & Time</Label>
              <Input
                id="completedAt"
                type="datetime-local"
                value={formData.completedAt}
                onChange={(e) => handleInputChange('completedAt', e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Your Rating</Label>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`size-6 cursor-pointer transition-colors ${
                      star <= (hoveredStar || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 hover:text-yellow-300'
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({rating} star{rating !== 1 ? 's' : ''})
                </span>
              </div>
            </div>
          </div>

          {/* Walk Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="actualTime" className="flex items-center gap-2">
                <Clock className="size-4" />
                Actual Time (hours)
              </Label>
              <Input
                id="actualTime"
                type="number"
                step="0.5"
                min="0"
                value={formData.actualTime}
                onChange={(e) => handleInputChange('actualTime', parseFloat(e.target.value) || 0)}
                placeholder={`Est. ${estimatedTime}h`}
              />
            </div>

            <div>
              <Label htmlFor="experiencedDifficulty" className="flex items-center gap-2">
                <Navigation className="size-4" />
                Experienced Difficulty
              </Label>
              <Select
                value={formData.experiencedDifficulty}
                onValueChange={(value) => handleInputChange('experiencedDifficulty', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                  <SelectItem value="Strenuous">Strenuous</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weatherConditions" className="flex items-center gap-2">
                <CloudRain className="size-4" />
                Weather Conditions
              </Label>
              <Select
                value={formData.weatherConditions}
                onValueChange={(value) => handleInputChange('weatherConditions', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select weather..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clear and sunny">Clear and sunny</SelectItem>
                  <SelectItem value="Partly cloudy">Partly cloudy</SelectItem>
                  <SelectItem value="Overcast">Overcast</SelectItem>
                  <SelectItem value="Light rain">Light rain</SelectItem>
                  <SelectItem value="Heavy rain">Heavy rain</SelectItem>
                  <SelectItem value="Foggy/misty">Foggy/misty</SelectItem>
                  <SelectItem value="Windy">Windy</SelectItem>
                  <SelectItem value="Snow">Snow</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="trailConditions">Trail Conditions</Label>
              <Select
                value={formData.trailConditions}
                onValueChange={(value) => handleInputChange('trailConditions', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select conditions..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent - dry and clear</SelectItem>
                  <SelectItem value="Good">Good - mostly dry</SelectItem>
                  <SelectItem value="Muddy">Muddy but passable</SelectItem>
                  <SelectItem value="Very muddy">Very muddy/boggy</SelectItem>
                  <SelectItem value="Icy">Icy conditions</SelectItem>
                  <SelectItem value="Snow covered">Snow covered</SelectItem>
                  <SelectItem value="Overgrown">Overgrown vegetation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Experience Description */}
          <div>
            <Label htmlFor="content">Your Experience</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Describe your walking experience, any highlights, challenges, or tips for other walkers..."
              rows={4}
              required
            />
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <AlertCircle className="size-4 text-blue-600" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Your completion will automatically update your walking statistics and achievements.
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging Walk...' : 'Log Completion'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}