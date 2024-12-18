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
import { ArrowRight, SearchIcon, UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
const tasks = [
  {
    id: 1,
    name: "-",
    status: "-",
    date: "-",
    avatar: "../../../../../public/icons/profile.jpg",
    initials: "AY",
    actions: "Düzenle",
  },
  {
    id: 2,
    name: "-",
    status: "-",
    date: "-",
    avatar: "/avatars/02.png",
    initials: "MB",
    actions: "Düzenle",
  },
  {
    id: 3,
    name: "-",
    status: "-",
    date: "-",
    avatar: "/avatars/03.png",
    initials: "CK",
    actions: "Düzenle",
  },
  {
    id: 4,
    name: "-",
    status: "-",
    date: "-",
    avatar: "/avatars/04.png",
    initials: "DL",
    actions: "Düzenle",
  },
];

export default function SearchableTaskTable() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Aksiyon Takip Listesi</CardTitle>
        <div className="flex justify-end w-full items-center gap-0 ">
          <Input
            type="text"
            placeholder="Ara"
            className="w-1/4  rounded-l rounded-r-none"
          />
          <SearchIcon className="w-9 h-9 rounded-l-none text-gray-800 hover:bg-gray-10   0 cursor-pointer justify-center items-center  border p-1 rounded-sm" />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Görev Adı</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>İşlemler</TableHead>
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
                <TableCell>
                  <ArrowRight className="w-7 h-7 text-gray-800" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
