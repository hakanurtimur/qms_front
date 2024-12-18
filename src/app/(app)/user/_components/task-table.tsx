import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
const tasks = [
  {
    id: 1,
    name: "-",
    status: "-",
    date: "-",
    avatar: "../../../../../public/icons/profile.jpg",
    initials: "AY",
  },
  {
    id: 2,
    name: "-",
    status: "-",
    date: "-",
    avatar: "../../../../../public/icons/profile.jpg",
    initials: "MB",
  },
  {
    id: 3,
    name: "-",
    status: "-",
    date: "-",
    avatar: "../../../../../public/icons/profile.jpg",
    initials: "CK",
  },
  {
    id: 4,
    name: "-",
    status: "-",
    date: "-",
    avatar: "../../../../../public/icons/profile.jpg",
    initials: "DL",
  },
];

export default function TaskTable() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Son Yapılan İşlemler</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Görev Adı</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Tarih</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      className="justify-center items-center"
                      src={task.avatar}
                      alt={`${task.initials} avatar`}
                    />
                    <UserIcon className="rounded-full border  w-9 h-9 text-gray-800" />
                  </Avatar>
                </TableCell>
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
