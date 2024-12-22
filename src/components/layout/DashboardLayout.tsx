"use client";
import Logo from "@/components/ui/Logo";
import NavItem from "@/components/layout/NavItem";
import {
  Sheet,
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
  BriefcaseIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
/*  */ import authService from "@/services/AuthService";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChangePasswordModel } from "@/models/auth";
import ChangePassowordForm from "@/components/ui/reusable-forms/change-passoword-form";
import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import BreadcrumbWithDropdown, {
  NavItemModel,
} from "@/components/ui/breadcrumb-with-dropdown";
import {
  IChangePasswordStore,
  useChangePasswordStore,
} from "@/app/(app)/user/service/change-password.store";
import { useRouter } from "next/navigation";
import { ResponseModel } from "@/models/api/response";
/* import { AIChatBox } from "@/components/ui/ai-chat-box";
 */ /* import { GeminiRequest } from "@/models/gemini-ai";
import geminiService from "@/services/GeminiService";
import { useMutation } from "@tanstack/react-query"; */

interface Props {
  variant: "admin" | "user";
  navItems: NavItemModel[];
  open: boolean;
  onSetOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const DashboardLayout = ({
  navItems,
  open,
  onSetOpen,
  children,
  variant,
}: Props) => {
  const { onSetAuthenticated, user } = useAuth();
  const { changePassword } = useChangePasswordStore(
    (state) => state as IChangePasswordStore,
  );
  const router = useRouter();
  /*   const [messages, setMessages] = useState([
    {
      text: "Merhaba, ben Medicalpoint Hastaneler grubunun Kalite Kontrol Asistanıyım.  Size nasıl yardımcıolabilirim?",
      isUser: false,
    },
  ]); */
  /*   const [input, setInput] = useState("");
   */ /*   const [openChatModal, setOpenChatModal] = useState(false);
   */
  const [popoverOpen, setPopoverOpen] = useState(false);

  /* const modelPrompt = `


  `; */

  const handlePasswordChange = async (data: ChangePasswordModel) => {
    const res: unknown = await changePassword(data, Number(user?.userId));
    console.log("res", res);
    const resWithTyped = res as ResponseModel;
    if (resWithTyped.isSuccessful) {
      await authService.logout();
      //if path is in /user redirect to login page, else redirect to admin login page
      const currentPath = window.location.pathname;
      if (currentPath.includes("/user")) {
        router.push("/login");
      } else {
        router.push("/admin-login");
      }
    }
  };

  /*   const sendMessageToAI = useMutation({
    mutationFn: (data: GeminiRequest) => geminiService.getAIResponse(data),
    onSuccess: (res) => {
      const response = res?.data?.candidates[0].content.parts[0].text;
      setMessages((prev) => [
        ...prev,
        { text: response, type: "ai", id: Math.random(), isUser: false },
      ]);
    },
  }); */

  /*   const handleSendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (input.trim()) {
      console.log(input);
      const request: GeminiRequest = {
        contents: [
          {
            parts: [
              {
                text: modelPrompt,
              },
            ],
            role: "model",
          },
          {
            parts: [
              {
                text: input,
              },
            ],
            role: "user",
          },
        ],
      };
      setMessages((prev) => [
        ...prev,
        { text: input, type: "user", isUser: true, id: Math.random() },
      ]);
      setInput("");
      sendMessageToAI.mutate(request);
    }
  }; */

  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/40">
      {popoverOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50"></div>
      )}
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
          <div className="flex flex-col gap-0">
            {variant === "user" && user?.userId && user.roleId === "4" && (
              <div className="flex flex-grow justify-end px-2 py-2">
                <Button
                  variant="darkGhost"
                  className="flex gap-2 w-full justify-start"
                  asChild
                >
                  <Link href={"/admin"}>
                    <BriefcaseIcon className={"h-5 w-5"} />
                    <span>Yönetim Paneline Geç</span>
                  </Link>
                </Button>
              </div>
            )}
            {variant === "admin" && user?.userId && user.roleId === "4" && (
              <div className="flex flex-grow justify-end px-2 py-2">
                <Button
                  variant="darkGhost"
                  className="flex gap-2 w-full justify-start"
                  asChild
                >
                  <Link href={"/user"}>
                    <PersonIcon className={"h-5 w-5"} />
                    <span>Kullanıcı Paneline Geç</span>
                  </Link>
                </Button>
              </div>
            )}
            <div className="flex flex-grow items-end px-2 py-2">
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
              className="sm:max-w-xs  bg-primary-900  text-primary-50"
            >
              <nav className="flex flex-col gap-4 px-2 sm:py-5">
                <div className="p-5">
                  <Logo className={"text-primary-50"} />
                </div>
                {navItems.map((item) => (
                  <NavItem item={item} key={item.label} />
                ))}
                {variant === "user" && user?.userId && user.roleId === "4" && (
                  <div className="flex flex-grow justify-end">
                    <Button className="flex gap-2 w-full justify-start" asChild>
                      <Link href={"/admin"}>
                        <BriefcaseIcon className={"h-5 w-5"} />
                        <span>Yönetim Paneline Geç</span>
                      </Link>
                    </Button>
                  </div>
                )}
                {variant === "admin" && user?.userId && user.roleId === "4" && (
                  <div className="flex flex-grow justify-end px-2 py-2">
                    <Button
                      variant="darkGhost"
                      className="flex gap-2 w-full justify-start"
                      asChild
                    >
                      <Link href={"/user"}>
                        <PersonIcon className={"h-5 w-5"} />
                        <span>Kullanıcı Paneline Geç</span>
                      </Link>
                    </Button>
                  </div>
                )}
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
            {/*  <AIChatBox
              messages={messages}
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              open={openChatModal}
              onOpenChange={setOpenChatModal}
            /> */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full relative"
            >
              <BellIcon className="h-5 w-5" />
              {/*  <Badge
                className={"absolute -top-2 -right-2 rounded-full"}
                variant={"destructive"}
              >
                3
              </Badge> */}
            </Button>

            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild className="">
                <Button
                  variant={"darkGhost"}
                  size={"icon"}
                  className="relative  rounded-full bg-white hover:bg-gray-100"
                >
                  <UserIcon className="h-6 w-6 text-black-900 " />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 z-50 flex flex-col gap-2">
                <div className="font-bold px-2.5">{user?.username}</div>
                <PopoverClose asChild>
                  <Link
                    href={`/${variant}/profile`}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    Profil
                  </Link>
                </PopoverClose>
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex cursor-pointer items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                      Şifre Değiştir
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Şifre Değiştir</SheetTitle>
                    </SheetHeader>
                    <ChangePassowordForm
                      onSubmit={handlePasswordChange}
                      error={null}
                      formLoading={false}
                      variant={"sheet"}
                    />
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
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mb-4">
            <BreadcrumbWithDropdown navItems={navItems} />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
