document.addEventListener("DOMContentLoaded", () => {
  const headerDiv = document.getElementById("header");

  headerDiv.innerHTML = `
    <div class="container-fluid py-2">
      <div class="d-flex flex-nowrap align-items-center justify-content-between gap-3">
        <div id="container-logo" class="flex-shrink-0">
          <a href="index.html">
            <img src="../assets/images/LOGO.png" alt="Logo" style="height: 100px; width: auto" />
          </a>
        </div>
        <form id="search-form" class="d-flex flex-nowrap flex-grow-1 mx-3" style="max-width: 600px">
          <input type="text" id="search-bar" class="form-control me-2" placeholder="Search for cards..."
            style="min-width: 0" />
          <button id="search-button" class="btn btn-outline-primary flex-shrink-0" type="submit">
            Search
          </button>
        </form>

        <div class="account-dropdown flex-shrink-0">
          <a href="#" class="account-icon">
            <img src="../assets/icons/account_icon.svg" alt="Account Icon" style="height: 32px; width: auto" />
          </a>
          <div class="dropdown-content">
            <p class="username-display">Nome utente</p>
            <a href="cart.html">Carrello</a>
            <a href="#" id="logout-link">Logout</a>
          </div>
        </div>
      </div>
    </div>
  `;
});


// Get the real logged-in user from localStorage
const user = JSON.parse(localStorage.getItem("user"));
const username = user.username;

$(".dropdown-content .username-display").text("Ciao, " + username + "!");

$(".account-dropdown").on("click", function (event) {
  event.stopPropagation();
  $(this).find(".dropdown-content").toggleClass("show");
});

$(document).on("click", function (event) {
  if (!$(event.target).closest(".account-dropdown").length) {
    $(".dropdown-content").removeClass("show");
  }
});

$("#logout-link").on("click", function (event) {
  event.preventDefault();
  localStorage.clear();
  alert("Effettuato il logout!");
  $(".dropdown-content").removeClass("show");

  // Make sure the users variable is present after logout
  getUsers()
    .then((data) => {
      localStorage.setItem("users", JSON.stringify(data));
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      window.location.href = "login.html";
    });
});
