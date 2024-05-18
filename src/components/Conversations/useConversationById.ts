import {useEffect, useState} from "react";
import {ConversationById, getConversationById} from "../../app/backend/api";

export const useConversationById = (id: string) => {
  const [conversation, setConversation] = useState<ConversationById | null>(null);

  const fetchConversationById = async (id: string) => {
    const response = await getConversationById(id);
    setConversation(response);
  };

  useEffect(() => {
    (async () => {
      await fetchConversationById(id);
    })();
  }, [id]);

  return {
    conversation,
    refetch: () => fetchConversationById(id)
  }
};
