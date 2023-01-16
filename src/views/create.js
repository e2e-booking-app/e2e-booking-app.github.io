import { html } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as roomService from '../data/room.js';

const createTemplate = (onSubmit) => html `
<h2>Host a new room!</h2>
<form @submit=${onSubmit}>
    <label>Name: <input type="text" name="name"></label>
    <label>Location: <input type="text" name="location"></label>
    <label>Beds: <input type="number" name="beds"></label>
    <button>Create</buttno>
</form>
`;

export function createView(ctx) {

    ctx.render(createTemplate(createSubmitHandler(onSubmit)));

    async function onSubmit ({name, location, beds}) {

        beds = parseInt(beds);

        if (name == '' || location == '' || Number.isNaN(beds)) {
            // throw new Error('All fields are required!')
            return alert('All fields are required!');
        }
        const userId = ctx.user?.objectId;
        const result = await roomService.create({name, location, beds}, userId);

        ctx.page.redirect('/rooms/' + result.objectId);

    }

}

