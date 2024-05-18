import {useEffect, useState} from "react";
import {createUser, getUsers} from "./backend/api";

export const Plivio = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    (async () => {
      const users = await getUsers();
      console.log('>> rahul', users);
    })();

    (async () => {
      const response = await createUser({
        createdAt: new Date().toString(),
        id: Math.random(),
        name: 'rahul'
      });
      console.log('>> response', response);
    })();
  }, []);

  return <div>testing</div>
};
