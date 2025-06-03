const cardImages = ['N', 'I', 'S', 'A'];
const targetWord = 'NISA';
let hideLettersFlag = false; // Flag to determine whether to hide letters

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    hideLettersFlag = false; // Reset the flag to show letters
    document.getElementById('score').textContent = '0';
    currentIndex = 0;

   
    // After a delay of 2 seconds, shuffle the cards and re-render
    setTimeout(() => {
        shuffleArray(cardImages);
        renderCards();

        // After 2 more seconds, hide the letters
        setTimeout(() => {
            hideLettersFlag = true; // Set the flag to hide letters
            renderCards();
        }, 2000);
    }, 10);
}

function restartGame() {
	// Sayfayı yenile
	location.reload();

    hideLettersFlag = false; // Reset the flag to show letters
    document.getElementById('score').textContent = '0';
    currentIndex = 0;

    // Display the initial state of the cards in the "HAMSOGLU" sequence
    renderCards();

    // After a delay of 2 seconds, shuffle the cards and re-render
    setTimeout(() => {
        shuffleArray(cardImages);
        renderCards();

        // After 2 more seconds, hide the letters
        setTimeout(() => {
            hideLettersFlag = true; // Set the flag to hide letters
            renderCards();
        }, 2000);
    }, 2000);
}

function renderCards() {
    const memoryGameElement = document.getElementById('memoryGame');
    memoryGameElement.innerHTML = '';

    cardImages.forEach((letter, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        // SVG dosyasını ekleyin
        const svgElement = document.createElement('img');
        
        if (hideLettersFlag) {
            // Eğer harfler gizleniyorsa, bir kapalı kapı resmi veya başka bir şey ekleyebilirsiniz.
            svgElement.src = 'grin.svg';
        } else {
            svgElement.src = `${letter}n.svg`;
        }
        
        svgElement.alt = letter;
        cardElement.appendChild(svgElement);

        cardElement.addEventListener('click', () => handleCardClick(index));
        memoryGameElement.appendChild(cardElement);
    });
}

let currentIndex = 0;

function handleCardClick(index) {
    const clickedLetter = cardImages[index];

    if (clickedLetter === targetWord[currentIndex]) {
        currentIndex++;
        updateScore(100.0 / targetWord.length);

        if (currentIndex === targetWord.length) {
            showPopup('Congratulations! You won. Your score: 100');
        }
    } else {
        showPopup(`Game over! Your score: ${getScore()}`);
    }
}

function updateScore(points) {
    const scoreElement = document.getElementById('score');
    const currentScore = parseFloat(scoreElement.textContent, 10);
    scoreElement.textContent = (currentScore + points).toString();
}

function getScore() {
    return document.getElementById('score').textContent;
}

function showPopup(message) {
    alert(message);
}
