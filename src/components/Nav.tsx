import {Home, User} from "lucide-react";
import Link from "next/link";
import styled from "styled-components";

const NavStyled = styled.nav({
  display: 'flex',
  gap: '10px',
});

export const Nav = () => {
    return (
    <NavStyled>
      <Link
        href="/"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Home className="h-4 w-4" />
        Conversations
      </Link>
      <Link
        href="/users"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <User className="h-4 w-4" />
        Users
      </Link>
    </NavStyled>);
};
