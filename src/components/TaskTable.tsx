import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tasks = [
  { id: 1, name: "Rapor hazırla", status: "Devam ediyor", date: "2023-06-15" },
  {
    id: 2,
    name: "Müşteri görüşmesi",
    status: "Tamamlandı",
    date: "2023-06-14",
  },
  { id: 3, name: "Proje sunumu", status: "Beklemede", date: "2023-06-16" },
  { id: 4, name: "Kod incelemesi", status: "Devam ediyor", date: "2023-06-15" },
];

export default function TaskTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Görevler</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Görev Adı</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Tarih</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
