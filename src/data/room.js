import { addOwner, createPointer, encodeObject, filterRelation } from "../util.js";
import { del, get, post, put } from "./api.js";


const endpoints = {
    // 'rooms': '/classes/Room',

    // endpoint for when there is no user authenticated, include makes back4app return the associated foreign key isntance
    'rooms': `/classes/Room?where=${encodeURIComponent(`{"openForBooking":true}`)}&include=owner`,
    // returns open for booking rooms, as well as the ones owned by the logged in user
    'roomsWithUser': (userId) => `/classes/Room?where=${encodeObject({ $or: [{ openForBooking: true }, filterRelation('owner', '_User', userId)] })}&include=owner`,
    // 'roomsWithUser': (userId) => `/classes/Room?where=${encodeURIComponent(`{"$or":[{"openForBooking":true},{"owner":${JSON.stringify(createPointer('_User', userId))}}]}`)}&include=owner`,
    'roomById': '/classes/Room/',
}


export async function getAll(userId) {

    if (userId) {
        return get(endpoints.roomsWithUser(userId));
    } else {
        return get(endpoints.rooms);
    }

}

export async function getByID(id) {
    return get(endpoints.roomById + id);
}

export async function create(roomData, userId) {

    // const data = Object.assign({}, roomData);
    // data.owner = { __type: 'Pointer', className: '_User', objectId: userId };

    return post(endpoints.rooms, addOwner(roomData, userId));

}

export async function update(id, roomData, userId) {
    return put(endpoints.roomById + id, addOwner(roomData, userId));
}

export async function deleteByID(id) {
    return del(endpoints.roomById + id);
}
