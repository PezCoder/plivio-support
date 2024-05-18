"use client";
import {NewConversation} from "../components/Conversations/NewConversation";
import {ConversationsStyled} from "./Conversations.styles";
import { useRouter } from 'next/navigation';
import {getConversationDetailURL} from "../utils/routes";
import {Conversations} from "../components/Conversations/Conversations";
import {useConversations} from "../components/Conversations/useConversations";
import {ShowingResults} from "../components/ShowingResults";
import {StatusFilter} from "../components/StatusFilter";
import {ConversationStatusType} from "./backend/types";

export const ConversationsPage = () => {
  const router = useRouter();
  const goToConversationDetail = (id: string) => router.push(getConversationDetailURL(id));
  const { conversations, refetch } = useConversations();

  const handleStatusChange = async (newStatuses: ConversationStatusType[]) => {
    await refetch({ statuses: newStatuses })
  };

  return (
    <ConversationsStyled>
      <NewConversation onCreate={goToConversationDetail} />
      <StatusFilter onStatusChange={handleStatusChange} />
      {conversations && conversations.length > 0 ? 
        <>
          <ShowingResults count={conversations.length} label="Conversation" />
          <Conversations conversations={conversations} onRowClick={goToConversationDetail} /> 
        </>
        : <p>No Conversations</p>}
    </ConversationsStyled>
  );

};
