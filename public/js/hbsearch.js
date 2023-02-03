var searchResults = {};
var searchResultsTemplate = document.querySelector(
  "#searchResultsDisplay"
).innerHTML;
const resultsDisplay = Handlebars.compile(searchResultsTemplate);

var artSearch = async (event) => {
  event.preventDefault();
  const source = document.getElementById("userSearchInput").value.trim();
  console.log("userinput", source);
  const response = await fetch(`/api/art/search/${source}`, {
    method: "GET",
  });
  if (response.ok) {
    console.log("response", response);
    searchResults = await response.json();

    console.log("response body", searchResults);
    resultsDisplay(searchResults);
    //window.location.replace("/");
  }
};

// populateSearch = (event) => {
//   event.preventDefault();
//   artSearch().then(() => {
//     window.location.reload();
//   });
// };

document.querySelector("#searchBtn").addEventListener("click", artSearch);

// const template = Handlebars.compile(source);
// const context = {
//   //FIGURE OUT HOW SEARCH FUNCTION NEEDS TO WORK, WHAT ARE WE SEARCHING
// }
// const compiledHtml = template(context);
// const fill = document.getElementById('');
// fill.innerHTML = compiledHtml;
