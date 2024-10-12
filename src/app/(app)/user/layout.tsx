import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/ui/Logo";
import NavItem from "@/components/layout/NavItem";

import { navItems } from "@/constants/navItems";
import { Badge } from "@/components/ui/badge";
import { BellIcon, UserIcon } from "@heroicons/react/24/outline";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-fit flex-col bg-primary-900 sm:flex items-stretch">
        <nav className="flex flex-col gap-4 px-2 sm:py-5">
          <div className="p-5">
            <Logo className={"text-primary-50"} />
          </div>
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:pb-4 sm:pl-14">
        <header className="sticky py-4 bg-primary-900 top-0 z-0 flex sm:flex-row-reverse h-14 items-center justify-between border-b px-4 sm:static sm:h-auto sm:border-0 sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
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
                {navItems.map((item) => (
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
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          {children}
        </main>
      </div>
    </div>
  );
}
