"use client";
import {NewConversation} from "../components/Conversations/NewConversation";
import {ConversationsStyled} from "./Conversations.styles";
import { useRouter } from 'next/navigation';
import {getConversationDetailURL} from "../utils/routes";
import {Conversations} from "../components/Conversations/Conversations";
import {useConversations} from "../components/Conversations/useConversations";
import {ShowingResults} from "../components/ShowingResults";

export const ConversationsPage = () => {
  const router = useRouter();
  const goToConversationDetail = (id: string) => router.push(getConversationDetailURL(id));
  const { conversations } = useConversations();

  return (
    <ConversationsStyled>
      <NewConversation onCreate={goToConversationDetail} />

      {conversations && conversations.length > 0 ? 
        <>
          <ShowingResults count={conversations.length} label="Conversation" />
          <Conversations conversations={conversations} onRowClick={goToConversationDetail} /> 
        </>
        : <p>No Conversations</p>}
    </ConversationsStyled>
  );

};
