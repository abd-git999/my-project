// ===== DARK MODE =====

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});


// ===== SEARCH =====

// ===== MAIN QURAN SEARCH =====

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", function() {

    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    const quranCards =
        document.querySelectorAll(".quran-card");

    // ===== SEARCH SURAH : VERSE =====

    if (searchText.includes(":")) {

        const parts = searchText.split(":");

        const surahNumber = parts[0].trim();
        const verseNumber = parts[1].trim();

        let found = false;

        quranCards.forEach(function(card) {

            if (card.dataset.surah === surahNumber) {

                card.style.display = "block";

                const verses =
                    card.querySelectorAll(".verse");

                verses.forEach(function(verse) {

                    if (
                        verse.dataset.verse === verseNumber
                    ) {

                        verse.style.display = "block";

                        verse.classList.add("verse-found");

                        verse.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                        found = true;

                    } else {

                        verse.style.display = "none";

                        verse.classList.remove("verse-found");

                    }

                });

            } else {

                card.style.display = "none";

            }

        });

        if (!found) {
            alert("❌ Surah or verse not found.");
        }

        return;
    }


    // ===== NORMAL SURAH SEARCH =====

    quranCards.forEach(function(card) {

        const cardText =
            card.textContent.toLowerCase();

        if (cardText.includes(searchText)) {

            card.style.display = "block";

            // Show all verses again
            const verses =
                card.querySelectorAll(".verse");

            verses.forEach(function(verse) {

                verse.style.display = "block";
                verse.classList.remove("verse-found");

            });

        } else {

            card.style.display = "none";

        }

    });

});

// ===== RESET SEARCH =====

resetBtn.addEventListener("click", function() {

    searchInput.value = "";

    surahCards.forEach(function(card) {
        card.style.display = "block";
    });

    document.getElementById("noResult").style.display = "none";

    currentIndex = 0;

    currentSurah.textContent = "Surah 1";

});
// ===== MOBILE MENU =====

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function() {

    navLinks.classList.toggle("active");

});  
// Close menu after clicking a link

const links = document.querySelectorAll(".nav-links a");

links.forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("active");

    });

});
// ===== SURAH NAVIGATION =====

const surahCards = document.querySelectorAll(".quran-card");

const prevSurah = document.getElementById("prevSurah");
const nextSurah = document.getElementById("nextSurah");
const currentSurah = document.getElementById("currentSurah");

let currentIndex = 0;


function showSurah(index) {

    surahCards.forEach(function(card) {
        card.style.display = "none";
    });

    surahCards[index].style.display = "block";

    currentSurah.textContent =
        "Surah " + (index + 1);

    surahCards[index].scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


nextSurah.addEventListener("click", function() {

    if (currentIndex < surahCards.length - 1) {

        currentIndex++;

        showSurah(currentIndex);

    }

});


prevSurah.addEventListener("click", function() {

    if (currentIndex > 0) {

        currentIndex--;

        showSurah(currentIndex);

    }

});
// ===== FAVORITES =====

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");


favoriteButtons.forEach(function(button, index) {

    const savedFavorite =
        localStorage.getItem("favorite-" + index);

    if (savedFavorite === "true") {

        button.classList.add("favorite");

        button.textContent = "♥ Favorite";

    }


    button.addEventListener("click", function() {

        if (button.classList.contains("favorite")) {

            button.classList.remove("favorite");

            button.textContent = "♡ Favorite";

            localStorage.setItem(
                "favorite-" + index,
                "false"
            );

        } else {

            button.classList.add("favorite");

            button.textContent = "♥ Favorite";

            localStorage.setItem(
                "favorite-" + index,
                "true"
            );

        }

    });

});
// ===== SURAH DIRECTORY =====

// ===== SURAH DIRECTORY =====

function goToSurah(surahId) {

    const surah = document.getElementById(surahId);

    surah.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    surah.classList.add("selected-surah");

    setTimeout(function() {
        surah.classList.remove("selected-surah");
    }, 1500);

} 
// ===== VERSE SEARCH =====

const verseSearchButtons =
    document.querySelectorAll(".verse-search-btn");

verseSearchButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card = button.closest(".quran-card");

        const input =
            card.querySelector(".verse-input");

        const message =
            card.querySelector(".verse-message");

        const verses =
            card.querySelectorAll(".verse");

        const number =
            input.value.trim();

        if (number === "") {

            message.textContent =
                "⚠️ Enter a verse number.";

            return;
        }

        let found = false;

        verses.forEach(function(verse) {

            const verseNumber =
                verse.dataset.verse;

            if (verseNumber === number) {

                verse.style.display = "block";
                verse.classList.add("verse-found")

                verse.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                found = true;

            } else {

                verse.style.display = "none";
               verse.classList.remove("verse-found");
            }

        });

        if (found) {

            message.textContent =
                "✅ Verse " + number + " found.";

        } else {

            message.textContent =
                "❌ Verse " + number + " not found.";

        }

    });

});
const verseResetButtons =
    document.querySelectorAll(".verse-reset-btn");

verseResetButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card =
            button.closest(".quran-card");

        const input =
            card.querySelector(".verse-input");

        const message =
            card.querySelector(".verse-message");

        const verses =
            card.querySelectorAll(".verse");

        input.value = "";

        message.textContent = "";

        verses.forEach(function(verse) {

            verse.style.display = "block";
            verse.classList.remove("verse-found");

        });

    });

});
// ===== SHARE + COPY VERSE =====

document.querySelectorAll(".copy-verse-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const verse = button.closest(".verse");

        const arabic =
            verse.querySelector(".arabic").textContent.trim();

        const translation =
            verse.querySelector(".translation").textContent.trim();

        const text =
            arabic + "\n\n" + translation;

        navigator.clipboard.writeText(text).then(function() {

            button.textContent = "✅ Copied!";

            setTimeout(function() {
                button.textContent = "📋 Copy Verse";
            }, 1500);

        });

    });

});


document.querySelectorAll(".share-verse-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const verse = button.closest(".verse");

        const arabic =
            verse.querySelector(".arabic").textContent.trim();

        const translation =
            verse.querySelector(".translation").textContent.trim();

        const text =
            arabic + "\n\n" + translation;

        if (navigator.share) {

            navigator.share({
                title: "Sound of Kuran",
                text: text
            });

        } else {

            navigator.clipboard.writeText(text).then(function() {

                button.textContent = "✅ Copied!";

                setTimeout(function() {
                    button.textContent = "📤 Share";
                }, 1500);

            });

        }

    });

});
// ===== READING PROGRESS =====

const progressFill =
    document.getElementById("progressFill");

const progressPercent =
    document.getElementById("progressPercent");

window.addEventListener("scroll", function() {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    const finalProgress =
        Math.min(Math.round(progress), 100);

    progressFill.style.width =
        finalProgress + "%";

    progressPercent.textContent =
        finalProgress + "%";

});