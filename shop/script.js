// 🔒 AUTH CHECK
if (!localStorage.getItem("currentUser")) {
  window.location.href = "../login/index.html";
}

let allProducts = [];

// 🚀 INIT
fetchProducts();

// 📦 FETCH PRODUCTS
async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    allProducts = data;
    renderProducts(allProducts);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

// 🖼 RENDER PRODUCTS
function renderProducts(products) {
  const container = document.querySelector(".items");
  container.innerHTML = "";

  if (!products.length) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "item";

    card.innerHTML = `
      <img src="${p.image}">
      <div class="info">
        <h4>${p.title}</h4>
        <div class="row">
          <div>$${p.price}</div>
          <div>${"⭐".repeat(Math.round(p.rating.rate))}</div>
        </div>
      </div>
      <button class="addBtn" data-id="${p.id}">Add to Cart</button>
    `;

    container.appendChild(card);
  });
}

// 🎯 MASTER FILTER FUNCTION (ALL FILTERS APPLY TOGETHER)
function applyFilters() {
  let result = [...allProducts];

  // CATEGORY
  const activeCat = document.querySelector(".filter.active")?.dataset.category;
  if (activeCat && activeCat !== "all") {
    result = result.filter((p) => p.category === activeCat);
  }

  // SEARCH
  const searchVal = document.getElementById("searchInput").value.toLowerCase();
  if (searchVal) {
    result = result.filter((p) => p.title.toLowerCase().includes(searchVal));
  }

  // PRICE
  const priceChecks = [
    ...document.querySelectorAll("input[data-price]:checked"),
  ];
  if (priceChecks.length) {
    let priceFiltered = [];

    priceChecks.forEach((r) => {
      const val = r.dataset.price;

      if (val === "100") {
        priceFiltered.push(...result.filter((p) => p.price >= 100));
      } else {
        const [min, max] = val.split("-").map(Number);
        priceFiltered.push(
          ...result.filter((p) => p.price >= min && p.price <= max),
        );
      }
    });

    result = priceFiltered;
  }

  // RATING
  const ratingVal = document.getElementById("ratingFilter")?.value;
  if (ratingVal && ratingVal > 0) {
    result = result.filter((p) => p.rating.rate >= ratingVal);
  }

  // COLORS (FakeStore doesn't provide colors → simulated via title words)
  const colorChecks = [
    ...document.querySelectorAll("input[data-color]:checked"),
  ];
  if (colorChecks.length) {
    result = result.filter((p) =>
      colorChecks.some((c) => p.title.toLowerCase().includes(c.dataset.color)),
    );
  }

  // SIZES (FakeStore doesn't provide sizes → placeholder for future API)
  // Currently ignored but structure ready

  renderProducts(result);
}

// 🔎 SEARCH
document.getElementById("searchInput").addEventListener("input", applyFilters);

// 📂 CATEGORY FILTER
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter")
      .forEach((f) => f.classList.remove("active"));

    btn.classList.add("active");
    applyFilters();
  });
});

// 💰 PRICE FILTER
document.querySelectorAll("input[data-price]").forEach((cb) => {
  cb.addEventListener("change", applyFilters);
});

// ⭐ RATING FILTER
document
  .getElementById("ratingFilter")
  ?.addEventListener("input", applyFilters);

// 🎨 COLOR FILTER
document.querySelectorAll("input[data-color]").forEach((cb) => {
  cb.addEventListener("change", applyFilters);
});

// 📏 SIZE FILTER
document.querySelectorAll("input[data-size]").forEach((cb) => {
  cb.addEventListener("change", applyFilters);
});

// 🛒 ADD TO CART
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("addBtn")) {
    const id = e.target.dataset.id;
    const product = allProducts.find((p) => p.id == id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  }
});
