const search_bar = $("#search-bar");
const search_form = $("#search-form");
const search_button = $("#search-button");

async function getProducts() {
  const products = await fetch("../data/products.json");
  return await products.json();
}

getProducts()
  .then((data) => {
    // Store the products in localStorage
    localStorage.setItem("products", JSON.stringify(data));
    console.log("Products stored in localStorage");
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
  });

search_button.on("mouseup", function (event) {
  console.log(search_bar.val());

  const search_term = search_bar.val();

  window.location.href = `products.html?search=${encodeURIComponent(
    search_term
  )}`;
});
