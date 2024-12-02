import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import profileImg from "../../../../../public/icons/profile.jpg"
import { UserIcon } from "lucide-react"
  const tasks = [
    { id: 1, name: "Rapor hazırla", status: "Devam ediyor", date: "2023-06-15", avatar: "../../../../../public/icons/profile.jpg", initials: "AY" },
    { id: 2, name: "Müşteri görüşmesi", status: "Tamamlandı", date: "2023-06-14", avatar: "/avatars/02.png", initials: "MB" },
    { id: 3, name: "Proje sunumu", status: "Beklemede", date: "2023-06-16", avatar: "/avatars/03.png", initials: "CK" },
    { id: 4, name: "Kod incelemesi", status: "Devam ediyor", date: "2023-06-15", avatar: "/avatars/04.png", initials: "DL" },
  ]
  
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
                      <AvatarImage className="justify-center items-center" src={task.avatar} alt={`${task.initials} avatar`} />
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
    )
  }
  
  