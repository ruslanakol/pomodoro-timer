const button = document.getElementById('button');
const counter = document.getElementById('counter');


button.addEventListener('click', (e) => {
    let secondTimer = 1500;

    const timerId = setInterval(() => {
        secondTimer--;

        let minutes = Math.floor(secondTimer / 60);
        let secondsLeft = secondTimer % 60;

        if ( secondsLeft < 10 ) {
            secondsLeft = "0" + secondsLeft;
        }
        counter.innerText = `${minutes}:${secondsLeft}`;


        if (secondTimer <= 0) {
            clearInterval(timerId);
        }
    }, 1000);

});