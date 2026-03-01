// 🔒 AUTH CHECK
if (!localStorage.getItem("currentUser")) {
  window.location.href = "../login/index.html";
}

const cartItemsContainer = document.getElementById("cartItems");
const checkoutList = document.getElementById("checkoutList");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

renderCart();

function renderCart() {
  cartItemsContainer.innerHTML = "";
  checkoutList.innerHTML = "";

  if (!cart.length) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
    totalPriceEl.textContent = "$0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    // PRODUCT CARD
    const card = document.createElement("div");
    card.className = "item";

    card.innerHTML = `
      <img src="${item.image}">
      <div class="info">
        <p>Title : ${item.title}</p>
        <p>Price : $${item.price}</p>
      </div>
      <button class="removeBtn" data-index="${index}">
        Remove From Cart
      </button>
    `;

    cartItemsContainer.appendChild(card);

    // CHECKOUT LIST ITEM
    const row = document.createElement("div");
    row.className = "checkout-row";
    row.innerHTML = `
      <span>${index + 1}. ${item.title.slice(0, 15)}...</span>
      <span>$${item.price}</span>
    `;
    checkoutList.appendChild(row);
  });

  totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

// 🗑 REMOVE ITEM
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("removeBtn")) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

// 💳 CHECKOUT BUTTON (UI + DEMO)
checkoutBtn.addEventListener("click", () => {
  if (!cart.length) {
    alert("Cart is empty!");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price, 0);

  const options = {
    key: "rzp_test_1DP5mmOlF5G5ag",
    amount: Math.round(total * 100),
    currency: "INR",
    name: "MeShop",
    description: "Test Transaction",
    image: "https://dummyimage.com/100x100/000/fff&text=MeShop",
    handler: function (response) {
      alert("Payment Successful 🎉");

      // Clear cart after success
      localStorage.removeItem("cart");
      window.location.reload();
    },
    theme: {
      color: "#000",
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
});