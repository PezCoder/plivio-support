import localforage from "localforage";
import {User} from "./types";

localforage.config({
    storeName: 'plivio-support',
    description: 'stores data for plivio support like users & conversations'
});

export const createUser = async (user: User) => {
    const dbValue = await localforage.getItem('users') as User[];
    const users = dbValue ?? [];
    users.push(user);

    return await localforage.setItem('users', users);
};

export const getUsers = async () => {
    const dbValue = await localforage.getItem('users') as User[];
    const users = dbValue ?? [];
    return users;
};
