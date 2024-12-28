"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClockIcon } from "lucide-react";

interface TimeoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
  title?: string;
  description?: string;
  onTimeUpdate?: (remainingTime: number) => void;
  onTimeExpired?: () => void;
  showTimer?: boolean;
}

export function TimeoutModal({
  isOpen,
  onClose,
  duration = 60,
  title = "Oturum Süreniz Dolmak Üzere",
  description = "Oturumunuz sonlanmadan işleminize devam etmek istiyor musunuz?",
  onTimeUpdate,
  onTimeExpired,
  showTimer = true,
}: TimeoutModalProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  const updateTime = (newTime: number) => {
    setTimeLeft(newTime);
    onTimeUpdate?.(newTime);
  };

  useEffect(() => {
    if (!isOpen) {
      updateTime(duration);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpired?.();
          onClose();
          return 0;
        }
        const newTime = prev - 1;
        onTimeUpdate?.(newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, duration, onClose, onTimeExpired, onTimeUpdate]);

  return (
    <Dialog open={isOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-yellow-500" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-gray-600 mb-4">{description}</p>
          {showTimer && (
            <div className="text-center text-2xl font-bold text-yellow-500">
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
