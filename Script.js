let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapCount = 0;

function formatTime(ms) {
    const milliseconds = Math.floor(ms % 1000).toString().padStart(3, '0');
    const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((ms / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor(ms / (1000 * 60 * 60)).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    const currentTime = isRunning ? Date.now() - startTime + elapsedTime : elapsedTime;
    document.getElementById('display').textContent = formatTime(currentTime);
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        elapsedTime += Date.now() - startTime;
        clearInterval(timerInterval);
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCount = 0;
    document.getElementById('display').textContent = '00:00:00.000';
    document.getElementById('lapList').innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        lapCount++;
        const lapTime = Date.now() - startTime + elapsedTime;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${formatTime(lapTime)}`;
        document.getElementById('lapList').prepend(lapItem);
    }
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const modeToggle = document.getElementById('modeToggle');
    modeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
}
