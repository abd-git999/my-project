// ===== DARK MODE =====

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});


// ===== SEARCH =====

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function() {

    const searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const quranCards = document.querySelectorAll(".quran-card");

    quranCards.forEach(function(card) {

        const cardText = card.textContent.toLowerCase();

        if (cardText.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});


// ===== RESET =====

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function() {

    document.getElementById("searchInput").value = "";

    const quranCards = document.querySelectorAll(".quran-card");

    quranCards.forEach(function(card) {
        card.style.display = "block";
    });

});