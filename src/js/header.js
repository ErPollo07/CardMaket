async function getUsers() {
  // Fetches user data from a local JSON file.
  const users = await fetch("../data/users.json");
  // Parses the JSON response and returns the data.
  return await users.json();
}

document.addEventListener("DOMContentLoaded", () => {
  // Gets the header division element.
  const headerDiv = document.getElementById("header");

  // Sets the inner HTML of the header, including logo, search bar, and account dropdown.
  headerDiv.innerHTML = `
    <div class="container-fluid py-2">
      <div class="d-flex flex-nowrap align-items-center justify-content-between gap-3">
        <div id="container-logo">
          <a href="index.html">
            <img src="../assets/images/LOGO.png" alt="Logo" style="height: 100px; width: auto" />
          </a>
        </div>
        <form id="search-form" class="d-flex flex-nowrap flex-grow-1 mx-3" style="max-width: 600px">
          <input type="text" id="search-bar" class="form-control me-2" placeholder="Search for cards..."
            style="min-width: 0" />
          <button id="search-button" class="flex-shrink-0" type="submit">
            Search
          </button>
        </form>

        <div class="account-dropdown flex-shrink-0">
          <a href="#" class="account-icon">
            <img src="../assets/icons/account_icon.svg" alt="Account Icon" style="height: 32px; width: auto" />
          </a>
          <div class="dropdown-content">
            <p class="username-display">User Name</p>
            <a href="cart.html">Cart</a>
            <a href="#" id="logout-link">Logout</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Get the logged-in user data from localStorage.
  const user = JSON.parse(localStorage.getItem("user"));
  // Extract the username from the user object.
  const username = user.username;

  // Update the displayed username in the dropdown content.
  document
    .querySelectorAll(".dropdown-content .username-display")
    .forEach((el) => {
      el.textContent = "HEY, " + username;
    });

  // Add event listeners for dropdown toggle functionality.
  document.querySelectorAll(".account-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("click", function (event) {
      // Prevents the click event from propagating further, which would close the dropdown immediately.
      event.stopPropagation();
      // Toggles the 'show' class to display or hide the dropdown content.
      this.querySelector(".dropdown-content").classList.toggle("show");
    });
  });

  // Close dropdown when clicking outside of it.
  document.addEventListener("click", function (event) {
    document.querySelectorAll(".dropdown-content").forEach((content) => {
      content.classList.remove("show");
    });
  });

  // Handle user logout.
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      // Prevents the default action of the link (e.g., navigating to '#').
      event.preventDefault();
      // Save the user data in to the list of users in localStorage.
      // Get the users from localStorage
      const users = JSON.parse(localStorage.getItem("users"));

      // Filters out the logged-in user to remove them from the list.
      const updatedUsers = users.filter(
        (u) => u.username !== user.username
      );
      updatedUsers.push(user);

      // Clears all data from localStorage.
      localStorage.removeItem("user");
    
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Alerts the user that they have been logged out.
      alert("Logout successful!");
      // Closes any open dropdowns.
      document.querySelectorAll(".dropdown-content").forEach((content) => {
        content.classList.remove("show");
      });

      window.location.href = "login.html";
    });
  }

  // Handle search form submission.
  const searchForm = document.getElementById("search-form");
  const searchBar = document.getElementById("search-bar");
  if (searchForm && searchBar) {
    searchForm.addEventListener("submit", function (event) {
      // Prevents the default form submission behavior (page reload).
      event.preventDefault();
      // Trims whitespace from the search input.
      const search_term = searchBar.value.trim();
      // Gets the current page file name.
      const currentPage = window.location.pathname.split("/").pop();

      // Checks if the current page is index.html.
      if (currentPage === "index.html" || currentPage === "") {
        // If on the index page, dispatches a custom event to update the card list without reloading.
        const searchEvent = new CustomEvent("search-cards", {
          detail: search_term,
        });
        document.dispatchEvent(searchEvent);
      } else {
        // If not on the index page, redirects to index.html with the search term as a URL parameter.
        window.location.href = `index.html?search=${encodeURIComponent(
          search_term
        )}`;
      }
    });
  }
});
