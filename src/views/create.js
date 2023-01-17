import { html } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as roomService from '../data/room.js';

const createTemplate = (onSubmit) => html `
<div class="form-container">
    <div class="form-data">
        <h2>Host a new room!</h2>
        <form @submit=${onSubmit} class="create-form">
            <input type="text" name="name" placeholder="Name">
            <input type="text" name="location" placeholder="Location">
            <input type="number" name="beds" placeholder="Number of beds">
            <button>Create</buttno>
        </form>
    </div>
</div>
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

