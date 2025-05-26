async function getUsers() {
  const users = await fetch("../data/users.json");
  return await users.json();
}

// Get the real logged-in user from localStorage
const user = JSON.parse(localStorage.getItem("user"));
const username = user ? user.username : "Ospite";

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
