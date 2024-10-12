import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  className?: string;
  title: string;
  description: string;
}

const GridCard = ({ title, description, className }: Props) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{description}</CardContent>
    </Card>
  );
};

export default GridCard;
