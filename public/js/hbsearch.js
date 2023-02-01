const artSearch = async (event) => {
  event.preventDefault();
  const source = document.getElementById("userSearchInput").value.trim();
  const response = await fetch(`/api/art/search/${source}`, { method: "GET" });
  if (!response.ok) {
    alert("invalid search");
  }
};

document.querySelector("#searchBtn").addEventListener("click", artSearch);
// const template = Handlebars.compile(source);
// const context = {
//   //FIGURE OUT HOW SEARCH FUNCTION NEEDS TO WORK, WHAT ARE WE SEARCHING
// }
// const compiledHtml = template(context);
// const fill = document.getElementById('');
// fill.innerHTML = compiledHtml;
