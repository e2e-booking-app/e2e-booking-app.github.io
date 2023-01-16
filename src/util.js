

export function setUserData(data) {

    sessionStorage.setItem('userData', JSON.stringify(data));

}

export function getUserData() {

    return JSON.parse(sessionStorage.getItem('userData'));

}

export function clearUserData() {

    sessionStorage.removeItem('userData');

}

// function for creating Pointer objects, avoid repeating
export function createPointer(className, objectId) {
    return { __type: 'Pointer', className, objectId };
}

// takes an object (eg. Room object), adds owner field with the appropriate Pointer and returns it 
export function addOwner(record, ownerId) {

    const data = Object.assign({}, record);
    data.owner = createPointer('_User', ownerId);
    return data;

}


export function createSubmitHandler(callback) {

    return function (event) {

        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries([...formData].map(([k, v]) => [k, v.trim()]));

        callback(data, event.target);

    }

}

// creates an object with property field, which has a key 'field' and property - Pointer object with the necessary attributes
export function filterRelation(field, collection, objectId) {

    const relation = {
        [field]: createPointer(collection, objectId)
    };
    return relation;

}

// user more than once, used to reduce the usage of interpolation strings and increase readability
// used in endpoints to Back4App, 
export function encodeObject(object) {
    return encodeURIComponent(JSON.stringify(object));
}

export function encodeDate(date) {
    return {
        __type: 'Date',
        iso: date.toISOString(),
    }
}
