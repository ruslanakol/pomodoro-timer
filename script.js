const button = document.querySelector('.button-start');
const resetBtn = document.querySelector('.button-reset');
const pomodoroBack = document.querySelector('.pomodoro-navi');
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

function render() {
    let minutes = Math.floor(secondTimer / 60);
    let secondsLeft = secondTimer % 60;
    if (secondsLeft < 10) secondsLeft = "0" + secondsLeft;
    counter.innerText = `${minutes}:${secondsLeft}`;
}

function updateTheme() {
    const elements = [document.body, mainContainer, redLine, resetBtn, button, pomodoroBack];

    // прибираємо всі додаткові класи
    elements.forEach(el => el.classList.remove('basic', 'blue', 'purple'));

    // додаємо dark завжди
    elements.forEach(el => el.classList.add('dark'));

    // додаємо колір залежно від режиму
    if (currentMode === 'pomodoro') {
        elements.forEach(el => el.classList.add('basic')); // базовий колір для pomodoro
    } else if (currentMode === 'shortBreak') {
        elements.forEach(el => el.classList.add('blue')); // синій для short break
    } else if (currentMode === 'longBreak') {
        elements.forEach(el => el.classList.add('purple')); // фіолет для long break
    }
}


function tick() {
    secondTimer--;
    render();

    if (secondTimer <= 0) {
        clearInterval(timerId);
        timerId = null;
        button.textContent = "START";
        resetBtn.style.display = "none"; // ховаємо reset
        secondTimer = 1500;
        render();
    }
}

button.addEventListener('click', () => {
    if (timerId === null) {
        // START
        timerId = setInterval(tick, 1000);
        button.textContent = "PAUSE";
        resetBtn.style.display = "inline-block"; // показуємо reset

        }
    else {
        // PAUSE
        clearInterval(timerId);
        timerId = null;
        button.textContent = "START";
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    secondTimer = 1500;
    render();
    button.textContent = "START";
    resetBtn.style.display = "none"; // знову ховаємо reset

});

render();
resetBtn.style.display = "none"; // спочатку прихована









// short break
shortBreak.addEventListener('click', () => {
    currentMode = 'shortBreak';
    secondTimer = modes[currentMode];
    render();
    button.textContent = "START";
    resetBtn.style.display = "none";
    updateTheme();
});
pomodoroBack.addEventListener('click', () => {
    currentMode = 'pomodoro';
    secondTimer = modes[currentMode];
    render();
    button.textContent = "START";
    resetBtn.style.display = "none";
    updateTheme();
});
longBreak.addEventListener('click', () => {
    currentMode = 'longBreak';
    secondTimer = modes[currentMode];
    render();
    button.textContent = "START";
    resetBtn.style.display = "none";
    updateTheme();
});


