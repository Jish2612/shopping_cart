if (localStorage.getItem("currentUser")) {
  window.location.href = "../shop/index.html";
}
const btn = document.getElementById("btn");
const errorMessage = document.getElementById("error-message");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const getUser = JSON.parse(localStorage.getItem("users")) || [];
  errorMessage.textContent = "";
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  const user = getUser.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    errorMessage.textContent = "Invalid email or password.";
    return;
  }

  const token = Math.random().toString(36).substring(2);

  const currentUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: token,
  };

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  alert("Login successful!");
  window.location.href = "../shop/index.html";
});
