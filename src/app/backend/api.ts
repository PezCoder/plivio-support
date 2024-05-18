import localforage from "localforage";
import {Conversation, User} from "./types";
import {v4} from "uuid";
import {byDate, byValue} from 'sort-es'
import {getCurrentDateTimeString} from "../../utils/dateUtils";

localforage.config({
    storeName: 'plivio-support',
    description: 'stores data for plivio support like users & conversations'
});

// Add Conversation
// Select user - name
// text
// Status - 'open', 'pending', 'closed'
// <input>, status dropdown

export const startConversation = async (userId: string) => {
    const dbValue = await localforage.getItem('conversations') as Conversation[];
    const conversations = dbValue ?? [];

    const nowTime = getCurrentDateTimeString();
    conversations.push({
        id: v4(),
        createdAt: nowTime,
        updatedAt: nowTime,
        user_id: userId,
        messages: []
    });

    return await localforage.setItem('conversations', conversations);
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
