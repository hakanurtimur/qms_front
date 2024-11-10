"use client";
import Logo from "@/components/ui/Logo";
import { userNavItems } from "@/constants/userNavItems";
import NavItem from "@/components/layout/NavItem";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import authService from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChangePasswordModel } from "@/models/auth";
import ChangePassowordForm from "@/components/ui/reusable-forms/change-passoword-form";

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
  open: boolean;
  onSetOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const DashboardLayout = ({ navItems, open, onSetOpen, children }: Props) => {
  const router = useRouter();
  const { onSetAuthenticated, user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/40">
      {open && (
        <aside
          className={`animate-slide-in-from-left fixed inset-y-0 left-0 z-10 hidden w-64 flex-col bg-primary-900 sm:flex items-stretch justify-between`}
        >
          <nav className="flex flex-col gap-4 px-2 sm:py-5">
            <div className="p-5 relative z-50">
              <Logo className={"text-white"} />
            </div>
            {navItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </nav>
          <div className="flex flex-grow items-end px-2 py-5">
            <Button
              variant="darkGhost"
              className="flex gap-2 w-full justify-start"
              onClick={async () => {
                await authService.logout();
                onSetAuthenticated(false);
                router.push("/login");
              }}
            >
              <ArrowLeftStartOnRectangleIcon className={"h-5 w-5"} />
              <span>Çıkış Yap</span>
            </Button>
          </div>
        </aside>
      )}
      <div
        className={`transition-[padding] ease duration-500 flex flex-col sm:gap-4 sm:pb-4 ${open ? "sm:pl-64" : "sm:pl-0"}`}
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
              className="sm:max-w-xs bg-primary-900 text-primary-50"
            >
              <nav className="flex flex-col gap-4 px-2 sm:py-5">
                <div className="p-5">
                  <Logo className={"text-primary-50"} />
                </div>
                {userNavItems.map((item) => (
                  <NavItem item={item} key={item.label} />
                ))}
                <div className="flex flex-grow justify-end">
                  <Button
                    variant="darkGhost"
                    className="flex gap-2 w-full justify-start"
                    onClick={async () => {
                      await authService.logout();
                      onSetAuthenticated(false);
                      router.push("/login");
                    }}
                  >
                    <ArrowLeftStartOnRectangleIcon className={"h-5 w-5"} />
                    <span>Çıkış Yap</span>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex flex-shrink gap-4 items-center">
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"darkGhost"}
                  className="flex w-fit justify-start"
                >
                  <UserIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 flex flex-col gap-2">
                <div className="font-bold px-2.5">{user?.username}</div>
                <Link
                  href={"/profile"}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  Profil
                </Link>
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex cursor-pointer items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                      Şifremi Unuttum
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Şifremi Unuttum</SheetTitle>
                    </SheetHeader>
                    <ChangePassowordForm
                      onSubmit={(data: ChangePasswordModel) => {
                        console.log(data);
                      }}
                      error={null}
                      formLoading={false}
                      variant={"sheet"}
                    />
                    <SheetClose>
                      <Button className="mt-5" variant={"outline"}>
                        Kapat
                      </Button>
                    </SheetClose>
                  </SheetContent>
                </Sheet>

                <div
                  onClick={async () => {
                    await authService.logout();
                    onSetAuthenticated(false);
                    router.push("/login");
                  }}
                  className="cursor-pointer flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  Çıkış Yap
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Button
            size={"icon"}
            variant={"outline"}
            className={"sm:flex hidden"}
            onClick={() => onSetOpen(!open)}
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
