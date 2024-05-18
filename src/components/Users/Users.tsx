import {
  Table,
  TableBody,
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
import {NewUser} from "./NewUser";


export const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response);
  };

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []);

  if (!users) {
    return <Loader2 className="h-10 w-10 animate-spin self-center"  />
  }

  return (
    <UsersContainer>
      <NewUser onAdd={() => fetchUsers()} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">ID</TableHead>
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
