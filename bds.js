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

// ===== VERSE RESET =====

document.addEventListener("click", function(event) {

    if (!event.target.classList.contains("verse-reset-btn")) {
        return;
    }

    const button = event.target;

    const card =
        button.closest(".quran-card");

    const input =
        card.querySelector(".verse-input");

    const message =
        card.querySelector(".verse-message");

    const verses =
        card.querySelectorAll(".verse");


    // Clear input
    input.value = "";

    // Clear message
    message.textContent = "";


    // Show all verses again
    verses.forEach(function(verse) {

        verse.style.display = "block";

        verse.classList.remove(
            "verse-found"
        );

    });

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
// ===== FAVORITE SURAH =====

document.addEventListener("click", function(event) {

    if (!event.target.classList.contains("favorite-btn")) {
        return;
    }

    const button = event.target;
    const card = button.closest(".quran-card");

    const surahNumber = card.dataset.surah;

    let favorites =
        JSON.parse(localStorage.getItem("favoriteSurahs")) || [];

    if (favorites.includes(surahNumber)) {

        favorites = favorites.filter(function(number) {
            return number !== surahNumber;
        });

        button.textContent = "♡ Favorite";

    } else {

        favorites.push(surahNumber);

        button.textContent = "⭐ Favorite";
    }

    localStorage.setItem(
        "favoriteSurahs",
        JSON.stringify(favorites)
    );

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

document.addEventListener("click", function(event) {

    if (!event.target.classList.contains("verse-search-btn")) {
        return;
    }

    const button = event.target;

    const card =
        button.closest(".quran-card");

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

            verse.style.display =
                "block";

            verse.classList.add(
                "verse-found"
            );

            verse.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            found = true;

        } else {

            verse.style.display =
                "none";

            verse.classList.remove(
                "verse-found"
            );

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
// ===== SHARE + COPY VERSE =====

// ===== COPY VERSE =====

document.addEventListener("click", function(event) {

    if (!event.target.classList.contains("copy-verse-btn")) {
        return;
    }

    const button = event.target;

    const verse =
        button.closest(".verse");

    const arabic =
        verse.querySelector(".arabic").textContent.trim();

    const translation =
        verse.querySelector(".translation").textContent.trim();

    const text =
        arabic + "\n\n" + translation;


    navigator.clipboard.writeText(text)
        .then(function() {

            button.textContent =
                "✅ Copied!";

            setTimeout(function() {

                button.textContent =
                    "📋 Copy Verse";

            }, 1500);

        });

});


// ===== SHARE VERSE =====

document.addEventListener("click", function(event) {

    if (!event.target.classList.contains("share-verse-btn")) {
        return;
    }

    const button = event.target;

    const verse =
        button.closest(".verse");

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

        navigator.clipboard.writeText(text)
            .then(function() {

                button.textContent =
                    "✅ Copied!";

                setTimeout(function() {

                    button.textContent =
                        "📤 Share";

                }, 1500);

            });

    }

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
// ===== DYNAMIC SURAH DIRECTORY =====

const surahList =
    document.getElementById("surah-list");

if (surahList) {

    quranData.forEach(function(surah) {

        const button =
            document.createElement("button");

        button.textContent =
            surah.number + ". " + surah.name;

        button.addEventListener("click", function() {

            goToSurah(surah.number);

        });

        surahList.appendChild(button);

    });

}


// ===== GO TO SURAH =====

function goToSurah(surahNumber) {

    const surah =
        document.querySelector(
            '.quran-card[data-surah="' +
            surahNumber +
            '"]'
        );

    if (!surah) {

        alert(
            "⏳ This Surah is still loading. Please wait a moment."
        );

        return;
    }

    surah.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    surah.classList.add("selected-surah");

    setTimeout(function() {

        surah.classList.remove(
            "selected-surah"
        );

    }, 1500);

}
// ===== DYNAMIC QURAN =====

const dynamicQuran =
    document.getElementById("dynamic-quran");

async function loadAllSurahs() {

    if (!dynamicQuran) {
        return;
    }

    dynamicQuran.innerHTML = `
        <p class="verse-message">
            ⏳ Loading Quran...
        </p>
    `;

    try {

        dynamicQuran.innerHTML = "";

        for (const surah of quranData) {

            await loadSurah(surah);

        }

    } catch (error) {

        console.error(error);

        dynamicQuran.innerHTML = `
            <p class="verse-message">
                ❌ Quran could not be loaded.
                Please check your internet connection.
            </p>
       ` ;

    }

}


// ===== LOAD ONE SURAH =====

async function loadSurah(surah) {

    const arabicURL =
        `https://api.alquran.cloud/v1/surah/${surah.number}/quran-uthmani`;

    const oromoURL =
        `https://quranenc.com/api/v1/translation/sura/oromo_ababor/${surah.number}`;

    const [arabicResponse, oromoResponse] =
        await Promise.all([
            fetch(arabicURL),
            fetch(oromoURL)
        ]);

    if (!arabicResponse.ok ||
        !oromoResponse.ok) {

        throw new Error(
            "Failed to load Surah " + surah.number
        );

    }

    const arabicData =
        await arabicResponse.json();

    const oromoData =
        await oromoResponse.json();
     console.log("OROMO DATA:", oromoData);

    const arabicVerses =
        arabicData.data.ayahs;

    const oromoVerses =
        oromoData.result;


    const card =
        document.createElement("div");

    card.className = "quran-card";

    card.id =
        "surah-" + surah.number;

    card.dataset.surah =
        surah.number;

    card.dataset.name =
        surah.name.toLowerCase();

    card.dataset.verses =
        arabicVerses.length;


    let versesHTML = "";


    arabicVerses.forEach(function(ayah, index) {

        const oromo =
            oromoVerses[index];

        const translation =
            oromo ? oromo.translation : "";


        versesHTML += `

            <div class="verse"
                 data-verse="${ayah.numberInSurah}">

                <span class="verse-number">
                    ${ayah.numberInSurah}
                </span>

                <p class="arabic">
                    ${ayah.text}
                </p>

                <p class="translation">
                    ${translation}
                </p>

                <div class="verse-actions">

                    <button class="copy-verse-btn">
                        📋 Copy Verse
                    </button>

                    <button class="share-verse-btn">
                        📤 Share
                    </button>

                </div>

            </div>

       ` ;

    });


    card.innerHTML = `

        <h3>
            Surah ${surah.name}
        </h3>


        <div class="surah-info">

            <span>
                ${surah.number}
            </span>

            <span>
                ${surah.name}
            </span>

            <span>
                ${arabicVerses.length} Verses
            </span>

        </div>


        <p class="surah-instruction">
            Search for a verse number below.
        </p>


        <div class="verse-search">

            <input
                type="number"
                class="verse-input"
                placeholder="🔢 Verse number"
                min="1"
            >

            <button class="verse-search-btn">
                Search
            </button>

            <button class="verse-reset-btn">
                Reset
            </button>

        </div>


        <p class="verse-message"></p>


        <audio controls>
            <source
                src="https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surah.number}.mp3"
                type="audio/mpeg"
            >
        </audio>


        ${versesHTML}

    `;


    dynamicQuran.appendChild(card);
loadFavorites();
}


// ===== START LOADING =====

loadAllSurahs();
// ===== LOAD FAVORITES =====

function loadFavorites() {

    const favorites =
        JSON.parse(localStorage.getItem("favoriteSurahs")) || [];

    document.querySelectorAll(".quran-card").forEach(function(card) {

        const surahNumber = card.dataset.surah;

        const button =
            card.querySelector(".favorite-btn");

        if (!button) {
            return;
        }

        if (favorites.includes(surahNumber)) {

            button.textContent = "⭐ Favorite";

        } else {

            button.textContent = "♡ Favorite";

        }

    });

}
loadFavorites();