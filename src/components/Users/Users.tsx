import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {formatDate} from "../../utils/dateUtils";
import {UsersContainer} from "./Users.styles";
import {NewUser} from "./NewUser";
import {Spinner} from "../Spinner";
import {useUsers} from "./useUsers";
import {ShowingResults} from "../ShowingResults";


export const Users = () => {
  const {users, refetch} = useUsers();

  if (!users) {
    return <Spinner />
  }

  return (
    <UsersContainer>
      <NewUser onAdd={refetch} />
      {users.length > 0 ? 
        <>
        <ShowingResults count={users.length} label="User" />
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
      </>
        : <p>No users</p>}
    </UsersContainer>
  )

};
