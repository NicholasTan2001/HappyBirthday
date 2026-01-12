/* Background */
const pattern = document.querySelector('.matrix-pattern');
const columnWidth = 25;

const contents = [
    "生日快乐！祝你在新的一岁里，心想事成，万事如意！🎉🎂🎁🎈",
    "🎈🎉🎁 Happy Birthday! 🎂🎊 May your day be full of joy! 🎈",
    "愿你笑口常开，幸福安康，每一天都精彩！✨🎁🎂",
    "Happy Birthday! 🎂🎉🎈 Wishing you love, health, and happiness! 💖",
    "🎉祝你生日快乐！生活甜美，梦想成真！🍰🎁✨"
];

function createColumns() {
    pattern.innerHTML = '';
    const columns = Math.floor(window.innerWidth / columnWidth);

    for (let i = 0; i < columns; i++) {
        const col = document.createElement('div');
        col.classList.add('matrix-column');
        col.style.left = `${i * columnWidth}px`;

        const contentIndex = Math.floor(Math.random() * contents.length);
        col.innerHTML = `<span class="matrix-text">${contents[contentIndex]}</span>`;

        const duration = 8 + Math.random() * 7;
        const delay = Math.random() * 5;
        col.style.animationDuration = `${duration}s`;
        col.style.animationDelay = `-${delay}s`;

        pattern.appendChild(col);
    }
}

createColumns();

window.addEventListener('resize', createColumns);

/* BG Music Controller */
const audio = document.getElementById('bg-music');
const volumeToggle = document.getElementById('volume-toggle');

volumeToggle.addEventListener('change', function () {

    if (!volumeToggle.checked) {
        audio.play();
    } else {
        audio.pause();
    }
});

/* Mail Controller */
const tooltipContainer = document.querySelector('.tooltip-container');
const matrixContainer = document.querySelector('.matrix-container');
const volumeContainer = document.querySelector('.container');

tooltipContainer.addEventListener('click', () => {

    volumeToggle.checked = false;

    audio.play();

    createFireworks();

    tooltipContainer.classList.add('fade-out');

    matrixContainer.style.display = 'block';

    volumeContainer.style.display = 'block';

    setTimeout(() => {

        matrixContainer.classList.add('fade-in');

        volumeContainer.classList.add('fade-in');

    }, 1000);


    setTimeout(() => {

        tooltipContainer.style.display = 'none';

    }, 3000);
});

/* Fireworks Effect */
function createFireworks() {
    const fireworks = document.querySelector('.fireworks');
    fireworks.innerHTML = '';

    for (let i = 0; i < 150; i++) {
        const spark = document.createElement('div');
        spark.classList.add('spark');

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 500;

        spark.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
        spark.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
        spark.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;

        fireworks.appendChild(spark);
    }

    setTimeout(() => {
        fireworks.innerHTML = '';
    }, 1000);
}

