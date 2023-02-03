
var container = document.querySelector("#searchResultsDisplay");


renderSearch = (arr) => {
  for (var i = 0; i < arr.length; i++) {
    var div = document.createElement("div");
    div.setAttribute("class", "card col-md-4");
    div.innerHTML = ` <img src=${arr[i].image} alt=${arr[i].description} class="userart" />
    <div class="container">
      <h4>Title: ${arr[i].title}</h4>
      <h4>Description: ${arr[i].description}</h4>
      <h4>Type: ${arr[i].type}</h4>
    </div>`;
    container.appendChild(div);
  }
};

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
    renderSearch(searchResults);
  
  }
};



document.querySelector("#searchBtn").addEventListener("click", artSearch);
