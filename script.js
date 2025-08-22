const button = document.querySelector('.button-start');
const resetBtn = document.querySelector('.button-reset');
const pomodoroBack = document.querySelector('.pomodoro-navi');
const shortNavi = document.querySelector('.short-navi');
const longNavi = document.querySelector('.long-navi');
const counter = document.getElementById('counter');
const mainContainer = document.getElementById('main-container');
const redLine = document.getElementById('red-line');
const shortBreak = document.getElementById('shortBreak');
const longBreak = document.getElementById('longBreak');

const modes = {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900,
};
let currentMode = 'pomodoro';
let timerId = null;
let secondTimer = 1500;
let isTimerRunning = false;

function render() {
    let minutes = Math.floor(secondTimer / 60);
    let secondsLeft = secondTimer % 60;
    if (secondsLeft < 10) secondsLeft = "0" + secondsLeft;
    counter.innerText = `${minutes}:${secondsLeft}`;

    // титул
    let counterTitle = `${minutes}:${secondsLeft}`;
    document.title = `${counterTitle} - Time to focus!`;
}

function updateTheme() {
    const elements = [document.body, mainContainer, redLine, resetBtn, button, pomodoroBack, longNavi, shortNavi];

    // Прибираємо всі класи тем
    elements.forEach(el => el.classList.remove('basic', 'blue', 'purple', 'dark'));

    if (isTimerRunning) {
        // Якщо таймер запущений - темна тема
        elements.forEach(el => el.classList.add('dark'));
    } else {
        // Якщо таймер зупинений - базова тема відповідно до режиму
        if (currentMode === 'pomodoro') {
            elements.forEach(el => el.classList.add('basic'));
        } else if (currentMode === 'shortBreak') {
            elements.forEach(el => el.classList.add('blue'));
        } else if (currentMode === 'longBreak') {
            elements.forEach(el => el.classList.add('purple'));
        }
    }
}
function bellSound() {
    const sound = document.getElementById('soundPlayer');
    sound.play();
}

function tick() {
    secondTimer--;
    render();

    if (secondTimer <= 0) {
        clearInterval(timerId);
        timerId = null;
        isTimerRunning = false;
        button.textContent = "START";
        resetBtn.style.display = "none";
        secondTimer = modes.pomodoro;
        currentMode = 'pomodoro';
        render();
        updateTheme();
        bellSound();
        bellSound();
        bellSound();
    }
}

button.addEventListener('click', () => {

    if (timerId === null) {
        // START
        timerId = setInterval(tick, 1000);
        button.textContent = "PAUSE";
        resetBtn.style.display = "inline-block";
        isTimerRunning = true;
        updateTheme();
    } else {
        // PAUSE
        clearInterval(timerId);
        timerId = null;
        button.textContent = "START";
        isTimerRunning = false;
        updateTheme();
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    isTimerRunning = false;

    // Повертаємо таймер до часу поточного режиму
    secondTimer = modes[currentMode];
    render();

    button.textContent = "START";
    resetBtn.style.display = "none";

    // Оновлюємо тему на базову
    updateTheme();
});

render();
resetBtn.style.display = "none";

// short break
shortBreak.addEventListener('click', () => {
    // Зупиняємо таймер якщо він працює
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        isTimerRunning = false;
    }

    currentMode = 'shortBreak';
    secondTimer = modes[currentMode];
    render();
    button.textContent = "START";
    resetBtn.style.display = "none";
    updateTheme();
});

pomodoroBack.addEventListener('click', () => {
    // Зупиняємо таймер якщо він працює
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        isTimerRunning = false;
    }

    currentMode = 'pomodoro';
    secondTimer = modes[currentMode];
    render();
    button.textContent = "START";
    resetBtn.style.display = "none";
    updateTheme();
});

longBreak.addEventListener('click', () => {
    // Зупиняємо таймер якщо він працює
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        isTimerRunning = false;
    }

    currentMode = 'longBreak';
    secondTimer = modes[currentMode];
    render();
    button.textContent = "START";
    resetBtn.style.display = "none";
    updateTheme();
});

// Ініціалізуємо тему при завантаженні
updateTheme();