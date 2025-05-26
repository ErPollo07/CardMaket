async function getUsers() {
  const users = await fetch("../data/users.json");
  return await users.json();
}

getUsers().then((data) => {
  localStorage.setItem("users", JSON.stringify(data));
}).catch((error) => {
  console.error("Error fetching users:", error);
});

// check if the user is logged in
if (!localStorage.getItem("user")) {
  // if not, redirect to the login page
  window.location.href = "login.html";
}


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

search_form.on("submit", function (event) {
  console.log(search_bar.val());

  const search_term = search_bar.val();

  window.location.href = `products.html?search=${encodeURIComponent(
    search_term
  )}`;
});
