import { ChevronDown, Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface BreadcrumbWithDropdownProps {
  navItems: NavItemModel[];
}

export type NavItemModel = {
  icon: React.ElementType;
  label: string;
  href: string;
  items: NavItemModel[] | undefined;
};

const BreadcrumbWithDropdown = ({ navItems }: BreadcrumbWithDropdownProps) => {
  const pathname = usePathname();

  const findBreadcrumbPath = (
    items: NavItemModel[],
    path: string,
  ): NavItemModel[] => {
    for (const item of items) {
      if (item.href === path) {
        return [item];
      }
      if (item.items && item.items.length > 0 && Array.isArray(item.items)) {
        const found: NavItemModel[] = findBreadcrumbPath(item.items!, path);
        if (found.length > 0) {
          return [item, ...found];
        }
      }
    }
    return [];
  };

  const breadcrumbPath = findBreadcrumbPath(navItems, pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbPath.map((item, index) => (
          <BreadcrumbItem key={item.href}>
            {item.items?.length ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.items.map((subItem) => (
                    <DropdownMenuItem key={subItem.href} asChild>
                      <Link href={`${subItem.href}`}>{subItem.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            )}
            {index < breadcrumbPath.length - 1 && (
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbWithDropdown;
