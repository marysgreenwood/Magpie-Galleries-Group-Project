import { Users } from './models/users/users.js';
import { Art } from './models/art.js';

const source = document.getElementById('landing').innerHTML;
const template = Handlebars.compile(source);
const context = {Users, Art}
const compiledHtml = template(context);
const fill = document.getElementById('');
fill.innerHTML = compiledHtml;