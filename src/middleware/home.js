import { html } from "../lib/lit-html.js";


const homeTemplate = () => html `
<h1>Welcome to SoftUni Booking</h1>
<p>Find the best places <a href="/rooms">here</a></p>
<p>If you have a good offer - <a href="/create">host it here</a></p>
`;


export function homeView (ctx) {

    ctx.render(homeTemplate());

}
