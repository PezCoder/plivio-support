"use client";
import { useParams } from 'next/navigation'; 

export default function ConversationById() {
    const params = useParams();
  const id = params.id; // Get the conversationId from the URL

  return <p>Post: {id}</p>
}

