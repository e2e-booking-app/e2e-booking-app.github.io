import { getUserData } from "../util.js";

const host = 'https://parseapi.back4app.com';

const appId = 'JMa9rqdDjWrnMaBahmaqwAKfw7qun6bClW0HWbWE';
const apiKey = 'IZ1WMz7A9g99Xqg0ANVNOdVE2hsW3BGVzDVoknCP';


async function request(method, url='/', data) {

    const options = {
        method,
        headers: {

            'X-Parse-Application-Id': appId,
            'X-Parse-JavaScript-Key': apiKey,
        //    'X-Parse-REST-API-Key': 'DC57KWXrLXUHuzeoIPIbmG0jbpKFGNWhfPjHFqPu'

        }
    };

    if (data !== undefined) {

        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);

    }

    const userData = getUserData();

    if (userData) {
        options.headers['X-Parse-Session-Token'] = userData.sessionToken;
    }

    try {

        console.log(url);
        const response = await fetch(host + url, options);
        console.log(response)
        if (response.status == 204) {
            return response
        }

        const result = await response.json();

        if (response.ok !==true) {
            console.log(result);
            throw new Error(result.message || result.error);
        }

        return result;

    } catch (err) {
        alert(err.message);
        throw err;
    }

}


export const get = request.bind(null, 'get')
export const post = request.bind(null, 'post')
export const put = request.bind(null, 'put')
// export const del = request.bind(null, 'delelete')  I wonder why it wasn't deleleting :DDDD
export const del = request.bind(null, 'delete')
