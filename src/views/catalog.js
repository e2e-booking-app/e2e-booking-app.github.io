import { html } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as roomService from '../data/room.js';
import { repeat } from '../lib/directives/repeat.js';
import { classMap } from '../lib/directives/class-map.js'

const catalogtemplate = (list) => html `
<h2>Available rooms</h2>
${list}
`;

const listTemplate = (rooms) => html `
<section>
    ${repeat (rooms, r => r.objectId, roomCard)}
</section>
`;

const roomCard = (room) => html `
<article class=${classMap({ 'room-card':true, 'own-room': room.isOwner })}>
    <h3>${room.name}</h3>
    <p>Location: ${room.location}</p>
    <p>Beds: ${room.beds}</p>
    <p>Hosted by ${room.owner.username}</p>
    <p><a class="action" href="/rooms/${room.objectId}">More details</a></p>
</article>
`;


export async function catalogView(ctx) {

    ctx.render(catalogtemplate(html `<p>Loading &hellip; </p>`))
    const { results: rooms } = await roomService.getAll(ctx.user?.objectId);

    if (ctx.user) {
        rooms.forEach(r => r.isOwner = r.owner.objectId == ctx.user.objectId);
    }

    ctx.render(catalogtemplate(listTemplate(rooms)));

}
