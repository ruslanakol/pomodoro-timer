const button = document.querySelector('.button-start');
const resetBtn = document.querySelector('.button-reset');
const pomodoroBack = document.querySelector('.pomodoro-navi');
const counter = document.getElementById('counter');
const mainContainer = document.getElementById('main-container');
const redLine = document.getElementById('red-line');

let timerId = null;
let secondTimer = 1500;

function render() {



    let minutes = Math.floor(secondTimer / 60);
    let secondsLeft = secondTimer % 60;
    if (secondsLeft < 10) secondsLeft = "0" + secondsLeft;
    counter.innerText = `${minutes}:${secondsLeft}`;
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
        document.body.classList.toggle('basic');
        document.body.classList.toggle('dark');
        mainContainer.classList.toggle('basic');
        mainContainer.classList.toggle('dark');
        redLine.classList.toggle('basic');
        redLine.classList.toggle('dark');
        resetBtn.classList.toggle('basic');
        resetBtn.classList.toggle('dark');
        button.classList.toggle('basic');
        button.classList.toggle('dark');
        pomodoroBack.classList.toggle('basic');
        pomodoroBack.classList.toggle('dark');

    } else {
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
    document.body.classList.toggle('basic');
    document.body.classList.toggle('dark');
    mainContainer.classList.toggle('basic');
    mainContainer.classList.toggle('dark');
    redLine.classList.toggle('basic');
    redLine.classList.toggle('dark');
    resetBtn.classList.toggle('basic');
    resetBtn.classList.toggle('dark');
    button.classList.toggle('basic');
    button.classList.toggle('dark');
    pomodoroBack.classList.toggle('basic');
    pomodoroBack.classList.toggle('dark');
});

render();
resetBtn.style.display = "none"; // спочатку прихована
