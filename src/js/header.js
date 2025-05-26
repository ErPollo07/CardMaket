// Prendi il vero utente loggato dal localStorage
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
  // Rimuovi l'utente loggato dal localStorage
  localStorage.removeItem("user");
  alert("Effettuato il logout!");
  $(".dropdown-content").removeClass("show");
  window.location.href = "login.html";
});
