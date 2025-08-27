'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Download, FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface GpxUploadProps {
  walkId?: string;
  onUploadComplete?: (result: any) => void;
  className?: string;
}

interface UploadState {
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  progress: number;
  error?: string;
  result?: any;
}

export default function GpxUpload({ walkId, onUploadComplete, className = '' }: GpxUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>({ status: 'idle', progress: 0 });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const storeGpxFile = useMutation(api.files.storeGpxFile);
  const validateGpxFile = useMutation(api.files.validateGpxFile);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.gpx')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select a .gpx file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'GPX files must be smaller than 10MB',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
    setUploadState({ status: 'idle', progress: 0 });
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadState({ status: 'uploading', progress: 0 });

      // Step 1: Generate upload URL
      const uploadUrl = await generateUploadUrl();
      setUploadState({ status: 'uploading', progress: 25 });

      // Step 2: Upload file to Convex storage
      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': selectedFile.type },
        body: selectedFile,
      });

      if (!result.ok) {
        throw new Error('Failed to upload file');
      }

      const { storageId } = await result.json();
      setUploadState({ status: 'uploading', progress: 50 });

      // Step 3: Store file metadata
      await storeGpxFile({
        storageId,
        walkId: walkId as any,
        filename: selectedFile.name,
        fileSize: selectedFile.size,
      });
      setUploadState({ status: 'processing', progress: 75 });

      // Step 4: Validate and process GPX file
      const validation = await validateGpxFile({ storageId });
      
      if (!validation.isValid) {
        throw new Error(validation.error || 'Invalid GPX file');
      }

      setUploadState({ 
        status: 'success', 
        progress: 100,
        result: { ...validation, storageId }
      });

      toast({
        title: 'GPX file uploaded successfully',
        description: `Track with ${validation.trackPoints} points processed`,
      });

      if (onUploadComplete) {
        onUploadComplete({ ...validation, storageId });
      }

    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadState({ 
        status: 'error', 
        progress: 0,
        error: error.message || 'Upload failed'
      });

      toast({
        title: 'Upload failed',
        description: error.message || 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadState({ status: 'idle', progress: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusIcon = () => {
    switch (uploadState.status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="size-5 animate-spin text-blue-600" />;
      case 'success':
        return <CheckCircle className="size-5 text-green-600" />;
      case 'error':
        return <XCircle className="size-5 text-red-600" />;
      default:
        return <FileText className="size-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (uploadState.status) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Processing GPX data...';
      case 'success':
        return 'Upload complete!';
      case 'error':
        return uploadState.error || 'Upload failed';
      default:
        return selectedFile ? 'Ready to upload' : 'No file selected';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="size-5" />
          Upload GPX Track
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File input */}
        <div className="space-y-2">
          <Label htmlFor="gpx-file">GPX File</Label>
          <div className="flex gap-2">
            <Input
              ref={fileInputRef}
              id="gpx-file"
              type="file"
              accept=".gpx"
              onChange={handleFileSelect}
              disabled={uploadState.status === 'uploading' || uploadState.status === 'processing'}
              className="flex-1"
            />
            {selectedFile && uploadState.status !== 'success' && (
              <Button
                variant="outline"
                onClick={resetUpload}
                disabled={uploadState.status === 'uploading' || uploadState.status === 'processing'}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* File info */}
        {selectedFile && (
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <div className="flex-1">
                <div className="font-medium text-sm">{selectedFile.name}</div>
                <div className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB • {getStatusText()}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            {(uploadState.status === 'uploading' || uploadState.status === 'processing') && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadState.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Success details */}
            {uploadState.status === 'success' && uploadState.result && (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                <div className="text-sm text-green-800 dark:text-green-200 mb-2 font-medium">
                  Track processed successfully
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">Track points:</span>
                    <span className="ml-1 font-medium">{uploadState.result.trackPoints}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="ml-1 font-medium">{uploadState.result.distance} km</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Elevation gain:</span>
                    <span className="ml-1 font-medium">{uploadState.result.elevationGain} m</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {selectedFile && uploadState.status === 'idle' && (
            <Button onClick={handleUpload} className="flex-1">
              <Upload className="size-4 mr-2" />
              Upload GPX
            </Button>
          )}
          
          {uploadState.status === 'success' && uploadState.result?.storageId && (
            <Button variant="outline" className="flex-1">
              <Download className="size-4 mr-2" />
              Download GPX
            </Button>
          )}

          {uploadState.status === 'error' && (
            <Button onClick={resetUpload} variant="outline" className="flex-1">
              Try Again
            </Button>
          )}
        </div>

        {/* Help text */}
        <div className="text-xs text-muted-foreground">
          Upload a GPX file to add route data to your walk. Files must be smaller than 10MB.
        </div>
      </CardContent>
    </Card>
  );
}