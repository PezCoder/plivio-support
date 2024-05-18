export type User = {
    id: string,
    name: string,
    createdAt: string
}

export type ConversationMessage = {
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
}

export type Conversation = {
    id: string,
    user_id: string,
    messages: ConversationMessage[]
    createdAt: string,
    updatedAt: string,
}
