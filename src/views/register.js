import { register } from "../data/user.js";
import { html } from "../lib/lit-html.js";
import { createSubmitHandler } from "../util.js";


const registerTemplate = (onSubmit) => html `
<h2>Register</h2>
<form @submit=${onSubmit}>
    <label>Email: <input type="text" name="email"></label>
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Password: <input type="password" name="repass"></label>
    <button>R3gister</button>
</form>
`


export function registerView (ctx) {

    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister ({ email, username, password, repass }) {

        if (email == '' || username == '' || password == '' || repass == '') {
            return alert('Please fill in all the fields!');
        }

        if (password !== repass) {
            return alert('Passwords do not match!');
        }

        await register(email, username, password);

        ctx.page.redirect('/');

    }

}

