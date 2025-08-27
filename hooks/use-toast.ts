"use client"

import * as React from "react"
import { toast as sonnerToast } from "sonner"

type ToastVariant = "default" | "destructive"

interface ToastProps {
  title?: string
  description?: string
  variant?: ToastVariant
}

export function useToast() {
  return {
    toast: ({ title, description, variant = "default" }: ToastProps) => {
      if (variant === "destructive") {
        sonnerToast.error(title, {
          description,
        })
      } else {
        sonnerToast.success(title, {
          description,
        })
      }
    },
  }
}