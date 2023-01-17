import { html } from "../lib/lit-html.js";


const homeTemplate = () => html `
    <div class="hero">
        <div class="hero-container">
            <div class="hero-text">
                <h1>Welcome to SoftUni Booking!</h1>
            </div>
        </div>
    </div>
<p class="home-p">A site in which you can find
the best places from all over the country for accomodation. Browse through the offers <a href="/rooms">here</a></p>
<p class="home-p">You have a wonderful room, apartment, house, villa
or event a camper, which you are willing to rent out? <a href="/create">Host it here</a></p>
`;


export function homeView (ctx) {

    ctx.render(homeTemplate());

}
