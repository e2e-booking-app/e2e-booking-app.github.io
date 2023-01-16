import { html, nothing } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as roomService from '../data/room.js';
import { repeat } from '../lib/directives/repeat.js'
import { hasUser } from '../middleware/guards.js';
import {  } from '../lib/directives/repeat.js'
import * as reserVationService from '../data/reservation.js'


const detailsTemplate = (room, hasUser, onDelete, onBook) => html`
<h2>${room.name}</h2>
<p>Location: ${room.location}</p>
<p>Beds: ${room.beds}</p>
${hasUser && !room.isOwner ? reservationForm(onBook) : nothing}
${room.isOwner ? html`
<a href="/edit/${room.objectId}">Edit</a>
<a href="javascript:void(0)" @click=${onDelete}>Delete</a>
`: nothing}
${hasUser ? html `
<ul>
    ${repeat(room.reservations, r => r.objectId, reservationCard)}
</ul>
` : nothing}
`;


const reservationForm = (onSubmit) => html`
<form @submit=${onSubmit}>
    <label>From <input type="date" name="startDate"></label>
    <label>To <input type="date" name="endDate"></label>
    <button>Request reservation</button>
</form>
`;

const reservationCard = (reservation) => html `
<li>From ${reservation.startDate.toISOString().slice(0,10)} to:
 ${reservation.endDate.toISOString().slice(0,10)} ; made by: ${reservation.owner.username}</li>
` 


export async function detailsView(ctx) {

    const id = ctx.params.id;
    const room = ctx.data;
    const hasUser = Boolean(ctx.user);
    room.isOwner = room.owner?.objectId === ctx.user?.objectId;
    room.reservations = [];

    if (hasUser) {
        const result = await reserVationService.getByRoomId(id);
        room.reservations = result.results;
    }

    ctx.render(detailsTemplate(ctx.data, hasUser, onDelete, createSubmitHandler(book)));

    async function onDelete() {
        const choice = confirm('Are you sure you want to permanently delete your offer?');

        if (choice) {
            await roomService.deleteByID(id);
            ctx.page.redirect('/rooms')
        }

    }

    async function book({ startDate, endDate }) {

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        if (Number.isNaN(startDate.getDate()) || Number.isNaN(endDate.getDate())) {
            return alert('Invalid date!');
        }

        if (endDate <= startDate) {
            return alert('End date must be after start date');
        }
        
        const reservationData = {
            startDate,
            endDate,
            room: id,
            host: ctx.data.owner.objectId
        }

        const result = await reserVationService.create(reservationData, ctx.user.objectId);
        ctx.page.redirect(`/rooms/${id}`);

    }

}



