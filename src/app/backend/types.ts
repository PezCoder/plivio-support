export type User = {
    id: string,
    name: string,
    createdAt: string
}


export const ConversationStatus = {
    OPEN: 'OPEN',
    PENDING: 'PENDING',
    CLOSED: 'CLOSED',
} as const;
export type ConversationStatusType = typeof ConversationStatus[keyof typeof ConversationStatus];


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
    status: ConversationStatusType,
}
