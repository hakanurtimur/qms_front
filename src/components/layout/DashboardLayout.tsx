"use client";
import Logo from "@/components/ui/Logo";
import { userNavItems } from "@/constants/userNavItems";
import NavItem from "@/components/layout/NavItem";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bars3Icon, BellIcon, UserIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Props {
  navItems: {
    icon: React.ElementType;
    label: string;
    href: string;
    items: {
      icon: React.ElementType;
      label: string;
      href: string;
    }[];
  }[];
  children: React.ReactNode;
}

const DashboardLayout = ({ navItems, children }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/40">
      {open && (
        <aside
          className={`animate-slide-in-from-left fixed inset-y-0 left-0 z-10 hidden w-64 flex-col bg-primary-900 sm:flex items-stretch`}
        >
          <nav className="flex flex-col gap-4 px-2 sm:py-5">
            <div className="p-5 relative z-50">
              <Logo className={"text-white"} />
            </div>
            {navItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </nav>
        </aside>
      )}
      <div
        className={`transition-all ease duration-500 flex flex-col sm:gap-4 sm:pb-4 ${open ? "sm:pl-64" : "sm:pl-0"}`}
      >
        <header className="sticky py-4 bg-primary-900 top-0 z-0 flex sm:flex-row-reverse h-14 items-center justify-between border-b px-4 sm:static sm:h-auto sm:border-0 sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Bars3Icon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="sm:max-w-xs bg-primary-900 text-slate-50"
            >
              <nav className="flex flex-col gap-4 px-2 sm:py-5">
                <div className="p-5">
                  <Logo className={"text-primary-50"} />
                </div>
                {userNavItems.map((item) => (
                  <NavItem item={item} key={item.label} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex flex-shrink gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full relative"
            >
              <BellIcon className="h-5 w-5" />
              <Badge
                className={"absolute -top-2 -right-2 rounded-full"}
                variant={"destructive"}
              >
                3
              </Badge>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <UserIcon className="h-5 w-5" />
            </Button>
          </div>
          <Button
            size={"icon"}
            variant={"outline"}
            className={"sm:flex hidden"}
            onClick={() => setOpen(!open)}
          >
            <Bars3Icon className="h-5 w-5" />
          </Button>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
