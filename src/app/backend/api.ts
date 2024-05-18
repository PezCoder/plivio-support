import localforage from "localforage";
import {Conversation, ConversationStatus, ConversationStatusType, User} from "./types";
import {v4} from "uuid";
import {byDate, byValue} from 'sort-es'
import {getCurrentDateTimeString} from "../../utils/dateUtils";

localforage.config({
    storeName: 'plivio-support',
    description: 'stores data for plivio support like users & conversations'
});

export const startConversation = async (userId: string) => {
    const dbValue = await localforage.getItem('conversations') as Conversation[];
    const conversations = dbValue ?? [];

    const nowTime = getCurrentDateTimeString();
    const newConversation: Conversation = {
        id: v4(),
        createdAt: nowTime,
        updatedAt: nowTime,
        user_id: userId,
        messages: [],
        status: ConversationStatus.OPEN,
    };
    conversations.push(newConversation);

    await localforage.setItem('conversations', conversations);

    return newConversation;
};

// TODO: Potential to normalise this data further into "messages" with
// a linked "conversation_id"
export const addMessageToConversation = async (id: string, message: string) => {
    const dbValue = await localforage.getItem('conversations') as Conversation[];
    const conversations = dbValue ?? [];
    const nowTime = getCurrentDateTimeString();

    const newConversations = conversations.map(
        conversation => conversation.id === id ? ({
            ...conversation,
            messages: conversation.messages.concat({
                id: v4(),
                createdAt: nowTime,
                updatedAt: nowTime,
                text: message,
            }),
            // Conversation updatedAt updates on the last message added
            updatedAt: nowTime,
        }) : conversation
    );

    return await localforage.setItem('conversations', newConversations);
};

export const updateConversationStatus = async (id: string, status: ConversationStatusType) => {
    const dbValue = await localforage.getItem('conversations') as Conversation[];
    const conversations = dbValue ?? [];
    const nowTime = getCurrentDateTimeString();

    const updatedConversations = conversations.map(
        conversation => conversation.id === id ? ({
            ...conversation,
            status,
            // Conversation updatedAt updates on status change
            updatedAt: nowTime,
        }) : conversation
    );

    return await localforage.setItem('conversations', updatedConversations);
};


export type ConversationWithUser = Pick<Conversation, 'id' | 'createdAt' | 'updatedAt' | 'status'> & {
    user: User,
    last_message?: string,
}

export type ConversationFilters = {
    statuses: ConversationStatusType[]
}
export const getConversations = async (filter?: ConversationFilters) => {
    const dbValue = await localforage.getItem('conversations') as Conversation[];
    let conversations = dbValue ?? [];

    const hasStatusFilter = filter?.statuses && filter?.statuses.length > 0;
    let filteredConversations = hasStatusFilter ? conversations.filter(
        conversation => filter.statuses.includes(conversation.status),
    ) : conversations;

    let result: ConversationWithUser[] = [];
    for (let key in filteredConversations) {
        const {user_id, messages, ...rest} = filteredConversations[key];
        const user = await getUserById(user_id);
        result.push({
            ...rest,
            user,
            last_message: messages[messages.length-1]?.text
        });
    }

    return result;
};

export type ConversationById = Conversation & {
    user: User,
}
export const getConversationById = async (id: string) => {
    const dbValue = await localforage.getItem('conversations') as Conversation[];
    const conversations = dbValue ?? [];

    const conversation = conversations.find(conversation => conversation.id === id);
    if (!conversation) {
        throw new Error('conversation not found!');
    }

    const user = await getUserById(conversation?.user_id);
    let conversationById: ConversationById = {
        ...conversation,
        user,
        messages: conversation.messages,
    };

    return conversationById;
};

export const createUser = async (user: Pick<User, 'name'>) => {
    const dbValue = await localforage.getItem('users') as User[];
    const users = dbValue ?? [];
    users.push({
        id: v4(),
        createdAt: getCurrentDateTimeString(),
        name: user.name
    });

    return await localforage.setItem('users', users);
};

export const getUsers = async () => {
    const dbValue = await localforage.getItem('users') as User[];
    const users = dbValue ?? [];

    // TODO: Opportunity to abstract this to util
    return users.sort(byValue(
        i => i.createdAt,
        byDate({desc: true})
    ));
};

export const getUserById = async (id: string) => {
    const dbValue = await localforage.getItem('users') as User[];
    const users = dbValue ?? [];

    const user = users.find(user => user.id === id);
    if (!user) {
        throw new Error('user not found!');
    }

    return user;
};
