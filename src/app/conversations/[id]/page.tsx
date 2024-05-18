"use client";
import { useParams } from 'next/navigation'; 
import {ConversationDetail} from '../../../components/Conversations/ConversationDetail';
import {useConversationById} from '../../../components/Conversations/useConversationById';
import {Spinner} from '../../../components/Spinner';

export default function ConversationById() {
    const params = useParams();
    const id = params.id as string;
    return <div>
        <ConversationDetail id={id} />
    </div>
}

