const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let currentLetter = '';
let score = 0;
let streak = 0;
const incorrectLetters = {};
const audioCorrect = new Audio('correct.mp3');
const audioWrong = new Audio('wrong.wav');
const jungleMusic = new Audio('jungle-music.mp3');
jungleMusic.loop = true;
jungleMusic.volume = 0.9;
jungleMusic.play();

function getRandomLetter() {
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
}

function displayNewLetter() {
    currentLetter = getRandomLetter();
    const letterElement = document.getElementById('letter');
    letterElement.innerText = currentLetter;
    letterElement.classList.add('animate');
    setTimeout(() => letterElement.classList.remove('animate'), 500);
    document.getElementById('input').value = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('input').focus();
}

function updateScore() {
    const scoreSection = document.getElementById('bananas');
    scoreSection.innerHTML = '';
    const bananaCount = Math.floor(score / 5);
    for (let i = 0; i < bananaCount; i++) {
        const banana = document.createElement('img');
        banana.src = 'banana.png';
        banana.classList.add('banana');
        scoreSection.appendChild(banana);
    }
}

function showStats() {
    const popup = document.getElementById('popup');
    const struggleLetters = document.getElementById('struggle-letters');
    struggleLetters.innerHTML = '';
    for (const letter in incorrectLetters) {
        const listItem = document.createElement('li');
        listItem.innerText = `${letter}: ${incorrectLetters[letter]} times`;
        struggleLetters.appendChild(listItem);
    }
    popup.classList.remove('hidden');
}

function hidePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('hidden');
}

function checkAnswer(event) {
    const userInput = event.key.toUpperCase();
    const feedbackElement = document.getElementById('feedback');
    
    if (!letters.includes(userInput)) return;

    if (userInput === currentLetter) {
        feedbackElement.innerText = 'Correct!';
        feedbackElement.style.color = 'green';
        audioCorrect.play();
        score++;
        streak++;
        if (streak % 5 === 0) {
            updateScore();
            document.body.style.backgroundColor = getRandomColor();
        }
    } else {
        feedbackElement.innerText = 'Try again!';
        feedbackElement.style.color = 'red';
        audioWrong.play();
        streak = 0;
        incorrectLetters[currentLetter] = (incorrectLetters[currentLetter] || 0) + 1;
    }
    displayNewLetter();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener('DOMContentLoaded', (event) => {
    displayNewLetter();
    document.getElementById('input').addEventListener('keydown', checkAnswer);
});
