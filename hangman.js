// Kelimeler ve ipuçları
const words = [
    { word: "HAUS", hints: ["Ein Ort, wo Menschen leben", "Ein Gebäude mit Wänden und Dach"] },
    { word: "BUCH", hints: ["Man kann es lesen", "Hat viele Seiten mit Text"] },
    { word: "TISCH", hints: ["Ein Möbelstück", "Man isst daran"] },
    { word: "STUHL", hints: ["Zum Sitzen", "Steht oft am Tisch"] },
    { word: "FENSTER", hints: ["Lässt Licht herein", "Man kann hindurchsehen"] },
    { word: "SCHULE", hints: ["Ein Ort zum Lernen", "Kinder gehen täglich hierhin"] },
    { word: "BAUM", hints: ["Wächst in der Natur", "Hat Blätter und Wurzeln"] },
    { word: "KATZE", hints: ["Ein beliebtes Haustier", "Fängt gerne Mäuse"] },
    { word: "HUND", hints: ["Bester Freund des Menschen", "Bellt und wedelt mit dem Schwanz"] },
    { word: "AUTO", hints: ["Ein Transportmittel", "Hat vier Räder"] },
    { word: "BROT", hints: ["Ein Grundnahrungsmittel", "Wird vom Bäcker gemacht"] },
    { word: "WASSER", hints: ["Zum Trinken wichtig", "Fällt als Regen vom Himmel"] },
    { word: "SONNE", hints: ["Scheint am Tag", "Gibt Licht und Wärme"] },
    { word: "MOND", hints: ["Leuchtet in der Nacht", "Umkreist die Erde"] },
    { word: "STERN", hints: ["Leuchtet am Nachthimmel", "Funkelt wie ein Diamant"] },
    { word: "BLUME", hints: ["Wächst im Garten", "Hat oft schöne Blüten"] },
    { word: "VOGEL", hints: ["Kann fliegen", "Hat Federn und einen Schnabel"] },
    { word: "FISCH", hints: ["Lebt im Wasser", "Hat Flossen und Schuppen"] },
    { word: "APFEL", hints: ["Ein Obst", "Rot oder grün"] },
    { word: "BANANE", hints: ["Ein gelbes Obst", "Affen mögen es"] },
    { word: "KAFFEE", hints: ["Ein heißes Getränk", "Macht wach"] },
    { word: "MILCH", hints: ["Kommt von der Kuh", "Weiß und gesund"] },
    { word: "BETT", hints: ["Zum Schlafen", "Hat eine Matratze"] },
    { word: "LAMPE", hints: ["Gibt Licht", "Braucht Strom"] },
    { word: "UHR", hints: ["Zeigt die Zeit", "Tickt und hat Zeiger"] },
    { word: "BRIEF", hints: ["Wird verschickt", "Braucht eine Briefmarke"] },
    { word: "MUSIK", hints: ["Man kann es hören", "Hat Rhythmus und Melodie"] },
    { word: "RADIO", hints: ["Spielt Musik und Nachrichten", "Ein Empfangsgerät"] },
    { word: "GARTEN", hints: ["Im Freien", "Hier wachsen Pflanzen"] },
    { word: "STRAND", hints: ["Am Meer", "Hat Sand"] },
    { word: "MEER", hints: ["Großes Gewässer", "Salzig und blau"] },
    { word: "BERG", hints: ["Sehr hoch", "Kann man besteigen"] },
    { word: "WALD", hints: ["Viele Bäume", "Grün und schattig"] },
    { word: "REGEN", hints: ["Fällt vom Himmel", "Macht nass"] },
    { word: "SCHNEE", hints: ["Weiß und kalt", "Fällt im Winter"] },
    { word: "WIND", hints: ["Man kann ihn nicht sehen", "Bewegt Blätter"] },
    { word: "WOLKE", hints: ["Am Himmel", "Bringt manchmal Regen"] },
    { word: "SCHIFF", hints: ["Fährt auf dem Wasser", "Ein großes Boot"] },
    { word: "FLUGZEUG", hints: ["Fliegt am Himmel", "Transport durch die Luft"] },
    { word: "ZUG", hints: ["Fährt auf Schienen", "Hat viele Waggons"] },
    { word: "FAHRRAD", hints: ["Hat zwei Räder", "Man tritt in die Pedale"] },
    { word: "TELEFON", hints: ["Zum Kommunizieren", "Man kann damit anrufen"] },
    { word: "COMPUTER", hints: ["Eine Maschine", "Zum Arbeiten und Spielen"] },
    { word: "KAMERA", hints: ["Macht Bilder", "Zum Fotografieren"] },
    { word: "BRILLE", hints: ["Hilft beim Sehen", "Sitzt auf der Nase"] },
    { word: "SCHUHE", hints: ["Zum Anziehen", "Schützt die Füße"] },
    { word: "HOSE", hints: ["Ein Kleidungsstück", "Für die Beine"] },
    { word: "JACKE", hints: ["Hält warm", "Trägt man über dem T-Shirt"] },
    { word: "MÜTZE", hints: ["Für den Kopf", "Hält die Ohren warm"] },
    { word: "SCHAL", hints: ["Für den Hals", "Lang und warm"] }
];

let currentWord = '';
let guessedLetters = new Set();
let remainingGuesses = 7;
let score = 0;
let gameOver = false;

// DOM elementleri
const wordDisplay = document.getElementById('word-display');
const hint1Element = document.getElementById('hint1');
const hint2Element = document.getElementById('hint2');
const keyboard = document.getElementById('keyboard');
const remainingGuessesElement = document.getElementById('remaining-guesses');
const scoreElement = document.getElementById('score');
const newGameButton = document.getElementById('new-game');
const giveUpButton = document.getElementById('give-up');

// Oyunu başlat
function startNewGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].word;
    currentHints = words[randomIndex].hints;
    guessedLetters.clear();
    remainingGuesses = 7;
    gameOver = false;
    
    // Çöp adamı sıfırla
    document.querySelectorAll('.gallows > div').forEach(part => {
        part.classList.remove('visible');
    });
    
    updateWordDisplay();
    updateHints();
    updateKeyboard();
    updateStats();
    
    newGameButton.disabled = true;
    giveUpButton.disabled = false;
}

// Kelime gösterimini güncelle
function updateWordDisplay() {
    wordDisplay.innerHTML = currentWord
        .split('')
        .map(letter => `
            <div class="letter-box ${guessedLetters.has(letter) ? 'revealed' : ''}">
                ${guessedLetters.has(letter) ? letter : ''}
            </div>
        `)
        .join('');
}

// İpuçlarını güncelle
function updateHints() {
    hint1Element.textContent = currentHints[0];
    hint2Element.textContent = currentHints[1];
}

// Klavyeyi güncelle
function updateKeyboard() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    keyboard.innerHTML = alphabet
        .split('')
        .map(letter => `
            <button class="key ${guessedLetters.has(letter) ? 'used' : ''}" 
                    ${guessedLetters.has(letter) ? 'disabled' : ''}>
                ${letter}
            </button>
        `)
        .join('');
    
    document.querySelectorAll('.key:not(.used)').forEach(key => {
        key.addEventListener('click', () => handleGuess(key.textContent));
    });
}

// İstatistikleri güncelle
function updateStats() {
    remainingGuessesElement.textContent = remainingGuesses;
    scoreElement.textContent = score;
}

// Harf tahmin et
function handleGuess(letter) {
    if (gameOver || guessedLetters.has(letter)) return;
    guessedLetters.add(letter);

    // Eğer harf kelimede yoksa 1 hak gider ve adam çizilir
    if (!currentWord.includes(letter)) {
        remainingGuesses--;
        updateHangman();
    }
    // Doğru harf için sadece kutuya yerleştirilecek, çizim yapılmayacak

    updateWordDisplay();
    updateKeyboard();
    updateStats();

    if (remainingGuesses <= 0) {
        gameOver = true;
        alert(`Spiel vorbei! Das Wort war: ${currentWord}`);
        newGameButton.disabled = false;
        giveUpButton.disabled = true;
    } else if (isWordComplete()) {
        gameOver = true;
        score += 10;
        alert('Glückwunsch! Sie haben das Wort erraten!');
        newGameButton.disabled = false;
        giveUpButton.disabled = true;
    }
}

// Kelime tamamlandı mı kontrol et
function isWordComplete() {
    return currentWord.split('').every(letter => guessedLetters.has(letter));
}

// Adam asmaca çizimini güncelle
function updateHangman() {
    const parts = ['rope', 'head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
    const remainingParts = 7 - remainingGuesses;
    
    parts.forEach((part, index) => {
        const element = document.querySelector(`.${part}`);
        if (index < remainingParts) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
}

// Event listeners
newGameButton.addEventListener('click', startNewGame);
giveUpButton.addEventListener('click', () => {
    if (!gameOver) {
        gameOver = true;
        alert(`Spiel vorbei! Das Wort war: ${currentWord}`);
        newGameButton.disabled = false;
        giveUpButton.disabled = true;
    }
});

// Oyunu başlat
startNewGame(); 