import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  className?: string;
  variant?: "dark" | "light";
}

const PageHeader = ({
  title,
  description,
  className,
  variant = "light",
}: Props) => (
  <Card
    className={`${className} ${variant === "light" ? "bg-primary-50" : "bg-gradient-to-r from-primary-900 to-primary-700 text-white"}`}
  >
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription
        className={`
      ${variant === "light" ? "" : "text-primary-300"}
      `}
      >
        {description}
      </CardDescription>
    </CardHeader>
  </Card>
);

export default PageHeader;
