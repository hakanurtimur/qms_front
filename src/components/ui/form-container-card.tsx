import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title?: string;
  className?: string;
  children: React.ReactNode;
}
const FormContainerCard = ({ title, className, children }: Props) => {
  return (
    <Card className={`border-primary-900 border-4 p-10 ${className}`}>
      {title && (
        <CardHeader className="text-center">
          <CardTitle className="text-2xl mb-10">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormContainerCard;
