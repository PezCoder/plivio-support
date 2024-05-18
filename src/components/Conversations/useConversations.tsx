import {useEffect, useState} from "react";
import {ConversationFilters, ConversationWithUser, getConversations} from "../../app/backend/api";
import {ConversationStatus} from "../../app/backend/types";

export const useConversations = () => {
  const [conversations, setConversations] = useState<ConversationWithUser[] | null>(null);

  const fetchConversations = async (filters?: ConversationFilters) => {
    const response = await getConversations(filters);
    setConversations(response);
  };

  useEffect(() => {
    (async () => {
      await fetchConversations({
        statuses: [
          ConversationStatus.OPEN,
          ConversationStatus.PENDING,
        ]
      });
    })();
  }, []);

    return {
        conversations,
        refetch: fetchConversations,
    }
};
