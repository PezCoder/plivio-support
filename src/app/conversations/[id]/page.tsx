"use client";
import { useParams } from 'next/navigation'; 
import {ConversationDetail} from '../../../components/Conversations/ConversationDetail';

export default function ConversationById() {
    const params = useParams();
  const id = params.id; // Get the conversationId from the URL

  return <div>
        <ConversationDetail conversation={{
            id: '1',
            createdAt: '2021-10-01',
            updatedAt: '2021-10-01',
            user_id: '1',
            user: {
                id: '1',
                name: 'John Doe',
                createdAt: '2021-10-01',
            },
            messages: [
                {
                    id: '1',
                    text: 'Hello',
                    createdAt: '2021-10-01',
                    updatedAt: '2021-10-01',
                },
                {
                    id: '2',
                    text: 'Hi',
                    createdAt: '2021-10-01',
                    updatedAt: '2021-10-01',
                }
            ],

        }} />
    </div>
}

