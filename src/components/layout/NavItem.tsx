import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface Props {
  item: {
    icon: React.ElementType;
    label: string;
    href: string;
    items: {
      icon: React.ElementType;
      label: string;
      href: string;
    }[];
  };
}

const NavItem = ({ item }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {item.items.length > 0 ? (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"darkGhost"}
              className="flex gap-2 w-full justify-start"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {item.items.map((subItem) => (
              <DropdownMenuItem asChild key={subItem.label}>
                <Link
                  href={subItem.href}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <subItem.icon className="h-5 w-5" />
                  {subItem.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          key={item.label}
          variant={"darkGhost"}
          className="flex gap-2 w-full justify-start"
          asChild
        >
          <Link href={item.href}>
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        </Button>
      )}
    </>
  );
};

export default NavItem;
