document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    window.location.href = "shop/index.html";
  }
});
