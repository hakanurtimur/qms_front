"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { BellIcon, CheckCheckIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/solid";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  isRead: boolean;
}

interface NotificationsModelProps {
  notifications: NotificationItem[];
  onNotificationClick?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onNotificationRead?: (id: string) => void;
  onNotificationDelete?: (id: string) => void;
}

export function NotificationsModel({
  notifications,
  onNotificationClick,
  onMarkAllAsRead,
  onNotificationRead,
  onNotificationDelete,
}: NotificationsModelProps) {
  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.isRead && onNotificationRead) {
      onNotificationRead(notification.id);
    }
    onNotificationClick?.(notification.id);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onNotificationDelete?.(id);
  };

  const hasUnreadNotifications = notifications.some(
    (notification) => !notification.isRead,
  );

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full relative"
            >
              <BellIcon className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge
                  className="absolute -top-2 -right-2 rounded-full"
                  variant="destructive"
                >
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Bildirimlerim</TooltipContent>
      </Tooltip>

      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              Bildirimler({notifications.length})
            </div>
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={onMarkAllAsRead}
                disabled={!hasUnreadNotifications}
              >
                <CheckCheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    !hasUnreadNotifications && "opacity-50",
                  )}
                />
                Hepsini Okundu İşaretle
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between bg-black-100 w-full px-2 py-1">
          <div className="text-md text-muted-foreground font-medium ">
            Okunmayan Bildirimler
          </div>
        </div>
        <ScrollArea className="h-[350px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Bildirim bulunmamakta
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex flex-col gap-1 p-4 cursor-pointer hover:bg-gray-100",
                  !notification.isRead && "bg-accent/50",
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="font-medium text-sm flex items-center justify-between gap-2">
                  {notification.title}
                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-primary-800 animate-pulse" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground truncate max-w-[214px]">
                  {notification.description}
                </div>
                <div className="flex justify-between">
                  <ArchiveBoxArrowDownIcon
                    className="text-xs h-6 w-6 text-muted-foreground mt-1 text-white cursor-pointer hover:bg-primary-700 hover:underline bg-primary-800 p-1 rounded-md"
                    onClick={(e) => handleDelete(e, notification.id)}
                  />
                  <div className="text-xs text-muted-foreground mt-1 text-right text-white bg-primary-800 p-1 rounded-md">
                    {notification.date}
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
