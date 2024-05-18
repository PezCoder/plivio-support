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
    const newConversation: Conversation = {
        id: v4(),
        createdAt: nowTime,
        updatedAt: nowTime,
        user_id: userId,
        messages: []
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

export type ConversationWithUser = Pick<Conversation, 'id' | 'createdAt' | 'updatedAt'> & {
    user: User,
    last_message?: string,
}
export const getConversations = async () => {
    const dbValue = await localforage.getItem('conversations') as Conversation[];
    const conversations = dbValue ?? [];

    let result: ConversationWithUser[] = [];
    for (let key in conversations) {
        const {user_id, messages, ...rest} = conversations[key];
        const user = await getUserById(user_id);
        result.push({
            ...rest,
            user,
            last_message: messages[messages.length-1]?.text
        });
    }

    return result;
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
