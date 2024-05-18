"use client";
import {NewConversation} from "../components/Conversations/NewConversation";
import {ConversationsStyled} from "./Conversations.styles";
import { useRouter } from 'next/navigation';
import {getConversationDetailURL} from "../utils/routes";
import {Conversations} from "../components/Conversations/Conversations";
import {useConversations} from "../components/Conversations/useConversations";

export const ConversationsPage = () => {
  const router = useRouter();
  const goToConversationDetail = (id: string) => router.push(getConversationDetailURL(id));
  const { conversations } = useConversations();

  return (
    <ConversationsStyled>
      <NewConversation onCreate={goToConversationDetail} />
      <Conversations conversations={conversations} onRowClick={goToConversationDetail} />
    </ConversationsStyled>
  );

};
