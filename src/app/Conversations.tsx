"use client";
import {NewConversation} from "../components/Conversations/NewConversation";
import {ConversationsStyled} from "./Conversations.styles";
import { useRouter } from 'next/navigation';



export const Conversations = () => {
    const router = useRouter();

  return (
    <ConversationsStyled>
      <NewConversation onCreate={
        (id) => router.push(`/conversations/${id}`)
      } />
    </ConversationsStyled>
  );

};
