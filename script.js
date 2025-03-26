// Mobile Menu Toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// Cryptocurrency Price Updates
const coins = {
  bitcoin: "bitcoin",
  ethereum: "ethereum",
  dogecoin: "dogecoin",
};

async function fetchCryptoPrice(coinId) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
    );
    const data = await response.json();
    return data[coinId].usd;
  } catch (error) {
    console.error(`Error fetching ${coinId} price:`, error);
    return null;
  }
}

async function updatePrices() {
  for (const [coinName, coinId] of Object.entries(coins)) {
    const price = await fetchCryptoPrice(coinId);
    if (price) {
      const priceElement = document.querySelector(`#${coinName} .price`);
      if (priceElement) {
        priceElement.textContent = price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
    }
  }
}

// Update prices every 30 seconds
updatePrices();
setInterval(updatePrices, 30000);
