const btn = document.getElementById("btn");
const errorMessage = document.getElementById("error-message");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  errorMessage.textContent = "";
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    errorMessage.textContent = "Please fill in all fields.";

    return;
  }
  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match.";
    return;
  }

  const alreadyExists = existingUsers.find((user) => user.email === email);

  if (alreadyExists) {
    errorMessage.textContent = "User already registered. Please login.";
    return;
    }
    let id =0
    const data = {
     id: Date.now(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };
  existingUsers.push(data);
  localStorage.setItem("users", JSON.stringify(existingUsers));
  alert("Signup successful! Please login to continue.");
  window.location.href = "../login/index.html";
});
