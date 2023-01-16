import { html } from "../lib/lit-html.js";



export const navTemplate = (hasUSer) => html `
<nav>
    <a href="/">Home</a>
    <a href="/rooms">Rooms</a>
    ${hasUSer ? html `
        <a href="/create">Create Room</a>
        <a href="/logout">Logout</a>
    `: html `
        <a href="/login">LogIn</a>
        <a href="/register">Register</a>
    `}
</nav>
`;
