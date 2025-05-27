async function getUsers() {
  const users = await fetch("../data/users.json");
  return await users.json();
}

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

  // Get the real logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;

  // Aggiorna il nome utente
  document
    .querySelectorAll(".dropdown-content .username-display")
    .forEach((el) => {
      el.textContent = "Ciao, " + username + "!";
    });

  // Dropdown toggle
  document.querySelectorAll(".account-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("click", function (event) {
      event.stopPropagation();
      this.querySelector(".dropdown-content").classList.toggle("show");
    });
  });

  // Chiudi dropdown cliccando fuori
  document.addEventListener("click", function (event) {
    document.querySelectorAll(".dropdown-content").forEach((content) => {
      content.classList.remove("show");
    });
  });

  // Logout
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.clear();
      alert("Effettuato il logout!");
      document.querySelectorAll(".dropdown-content").forEach((content) => {
        content.classList.remove("show");
      });
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
  }

  // Gestione submit del form di ricerca
  const searchForm = document.getElementById("search-form");
  const searchBar = document.getElementById("search-bar");
  if (searchForm && searchBar) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const search_term = searchBar.value.trim();
      const currentPage = window.location.pathname.split("/").pop();

      if (currentPage === "index.html" || currentPage === "") {
        // Siamo già in index, aggiorna la lista senza ricaricare
        const searchEvent = new CustomEvent("search-cards", {
          detail: search_term,
        });
        document.dispatchEvent(searchEvent);
      } else {
        // Vai su index.html con parametro search
        window.location.href = `index.html?search=${encodeURIComponent(
          search_term
        )}`;
      }
    });
  }
});
