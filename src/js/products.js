// Take the search parameter on the url
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("search");

console.log("Hai cercato: ", searchQuery);
