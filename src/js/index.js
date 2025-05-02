const search_bar = $("#search-bar");
const search_form = $("#search-form");

search_form.on('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log(search_bar.val());
 
  const search_term = search_bar.val()

  // check if the search bar is fill with something
  if (search_term.trim() !== "") {
    window.location.href = `products.html?search=${encodeURIComponent(search_term)}`
  }
})
