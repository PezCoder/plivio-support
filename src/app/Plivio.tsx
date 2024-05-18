import { Button } from "@/components/ui/button"
import {useEffect, useState} from "react";
import {createUser, getUsers} from "./backend/api";
import {Home} from "lucide-react";
import Link from "next/link";

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

  return <div>
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      hello
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
    </nav>
    <h1>heading</h1>
    <Button>Testing button</Button>
  </div>
};
