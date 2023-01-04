const source = document.getElementById('search').innerHTML;
const template = Handlebars.compile(source);
const context = {
  
}
const compiledHtml = template(context);
const fill = document.getElementById('');
fill.innerHTML = compiledHtml;