import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  className?: string;
  children: React.ReactNode;
}
const FormContainerCard = ({ title, className, children }: Props) => {
  return (
    <Card className={`border-slate-900 border-4 ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormContainerCard;
