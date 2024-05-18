import localforage from "localforage";
import {User} from "./types";
import {v4} from "uuid";
import {byDate, byValue} from 'sort-es'

localforage.config({
    storeName: 'plivio-support',
    description: 'stores data for plivio support like users & conversations'
});

export const createUser = async (user: Pick<User, 'name'>) => {
    const dbValue = await localforage.getItem('users') as User[];
    const users = dbValue ?? [];
    users.push({
        id: v4(),
        createdAt: new Date().toString(),
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
