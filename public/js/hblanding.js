//import { Users } from './models/users/users.js';

const source = document.getElementById('landing').innerHTML;
const template = Handlebars.compile(source);
const context = {Users}
const compiledHtml = template(context);
const fill = document.getElementById('');
fill.innerHTML = compiledHtml;