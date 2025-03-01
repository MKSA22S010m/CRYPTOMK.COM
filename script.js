document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const searchInput = document.getElementById("search");
    const updateTime = document.getElementById("update-time");
    const livePrices = document.getElementById("live-prices");

    // Load Theme Preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark");
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        localStorage.setItem("darkMode", body.classList.contains("dark") ? "enabled" : "disabled");
    });

    function fetchCryptoData() {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
            .then(response => response.json())
            .then(data => {
                livePrices.innerHTML = "";
                data.forEach(coin => {
                    const coinElement = document.createElement("div");
                    coinElement.className = "coin";
                    coinElement.innerHTML = `<strong>${coin.name}</strong>: $${coin.current_price}`;
                    livePrices.appendChild(coinElement);
                });
                updateTime.textContent = new Date().toLocaleTimeString();
            });
    }

    setInterval(fetchCryptoData, 10000);
    fetchCryptoData();
});
