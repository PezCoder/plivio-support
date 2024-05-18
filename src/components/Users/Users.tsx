import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {useEffect, useState} from "react";
import {getUsers} from "../../app/backend/api";
import {User} from "../../app/backend/types";
import {Loader2} from 'lucide-react';
import {formatDate} from "../../utils/dateUtils";
import {UsersContainer} from "./Users.styles";
import {Button} from "../ui/button";


export const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getUsers();
      setUsers(response);
    })();
  }, []);

  if (!users) {
    return <Loader2 className="h-10 w-10 animate-spin self-center"  />
  }

  return (
    <UsersContainer>
      <Button>Add User</Button>
      <Table>
        <TableCaption>Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{formatDate(user.createdAt)}</TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </UsersContainer>
  )

};
