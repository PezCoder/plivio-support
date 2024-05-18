import {useEffect, useState} from "react";
import {getUsers} from "../../app/backend/api";
import {User} from "../../app/backend/types";

export const useUsers = () => {
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

    return {
        users,
        refetch: fetchUsers,
    }
};
