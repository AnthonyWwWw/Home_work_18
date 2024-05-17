let secondsInputField = document.querySelector('#input');
let minutesInputField = document.querySelector('#input-minutes');
let secondsInputFieldAlt = document.querySelector('#input-second');
let colonBlock = document.querySelector('#colon');
let selectionButton = document.querySelector('#selection_button');

let interval = null;
let selection = false;

document.addEventListener('DOMContentLoaded', () => {
    let inputList = document.querySelector('#input-list');
    for (const child of inputList.children) {
        toggleDisplay(child);
    }
});

selectionButton.addEventListener('click', () => {
    let inputList = document.querySelector('#input-list');
    for (const child of inputList.children) {
        toggleDisplay(child);
    }
    selection = !selection;
});

function toggleDisplay(element) {
    element.toggleAttribute('active');
    if (element.hasAttribute('active')) {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
}

document.querySelector('#round-button').addEventListener('click', () => {
    if (interval !== null) {
        clearInterval(interval);
    }

    if (!selection) {
        let inputValue = getInputValue(secondsInputField.value);
        let minutes = Math.floor(inputValue / 60);
        let seconds = inputValue % 60;
        document.querySelector('#minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('#second').textContent = seconds.toString().padStart(2, '0');
        secondsInputField.value = '';

        if (inputValue) {
            colonBlock.classList.add('--js-active');
            interval = setInterval(() => {
                document.body.style.backgroundColor = '#033E8C';
                if (seconds === 0 && minutes === 0) {
                    clearInterval(interval);
                    interval = null;
                    colonBlock.classList.remove('--js-active');
                    document.body.style.backgroundColor = '#810b0b';
                } else {
                    if (seconds === 0) {
                        minutes--;
                        seconds = 59;
                    } else {
                        seconds--;
                    }
                    document.querySelector('#minutes').textContent = minutes.toString().padStart(2, '0');
                    document.querySelector('#second').textContent = seconds.toString().padStart(2, '0');
                }
            }, 1000);
        }
    } else {
        let inputMinutesValue = getInputValue(minutesInputField.value);
        let inputSecondsValue = getInputValue(secondsInputFieldAlt.value);

        if (inputMinutesValue !== null && inputSecondsValue !== null) {
            colonBlock.classList.add('--js-active');
            document.querySelector('#minutes').textContent = inputMinutesValue.toString().padStart(2, '0');
            document.querySelector('#second').textContent = inputSecondsValue.toString().padStart(2, '0');
            minutesInputField.value = '';
            secondsInputFieldAlt.value = '';

            interval = setInterval(() => {
                document.body.style.backgroundColor = '#033E8C';
                if (inputSecondsValue === 0 && inputMinutesValue === 0) {
                    clearInterval(interval);
                    interval = null;
                    colonBlock.classList.remove('--js-active');
                    document.body.style.backgroundColor = '#810b0b';
                } else {
                    if (inputSecondsValue === 0) {
                        inputMinutesValue--;
                        inputSecondsValue = 59;
                    } else {
                        inputSecondsValue--;
                    }
                    document.querySelector('#minutes').textContent = inputMinutesValue.toString().padStart(2, '0');
                    document.querySelector('#second').textContent = inputSecondsValue.toString().padStart(2, '0');
                }
            }, 1000);
        }
    }
});

function getInputValue(value) {
    if (value !== '') {
        return parseInt(value);
    } else {
        alert('Поле має бути заповненим');
        return null;
    }
}

secondsInputFieldAlt.addEventListener('input', (event) => {
    checkNumberEntered(event);
    checkCorrectness(event);
});

secondsInputField.addEventListener('input', (event) => {
    checkNumberEntered(event);
});

minutesInputField.addEventListener('input', (event) => {
    checkNumberEntered(event);
    checkCorrectness(event);
});

function checkNumberEntered(event) {
    const allowDigits = /^[0-9]+$/;
    let input = event.target.value;
    if (!allowDigits.test(input)) {
        event.target.value = input.slice(0, -1);
    }
}

function checkCorrectness(event) {
    const regex = /^(?:[0-5]?\d|60)$/;
    let input = event.target.value;
    if (input !== "" && !regex.test(input)) {
        event.target.value = input.slice(0, -1);
    }
}
