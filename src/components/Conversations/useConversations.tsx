import {useEffect, useState} from "react";
import {ConversationWithUser, getConversations} from "../../app/backend/api";

export const useConversations = () => {
  const [conversations, setConversations] = useState<ConversationWithUser[] | null>(null);

  const fetchConversations = async () => {
    const response = await getConversations();
    setConversations(response);
  };

  useEffect(() => {
    (async () => {
      await fetchConversations();
    })();
  }, []);

    return {
        conversations,
        refetch: fetchConversations,
    }
};
