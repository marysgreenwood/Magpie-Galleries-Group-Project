const source = document.getElementById('search').innerHTML;
const template = Handlebars.compile(source);
const context = {
  //FIGURE OUT HOW SEARCH FUNCTION NEEDS TO WORK, WHAT ARE WE SEARCHING
}
const compiledHtml = template(context);
const fill = document.getElementById('');
fill.innerHTML = compiledHtml;