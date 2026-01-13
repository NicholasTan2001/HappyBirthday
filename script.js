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
const cardContainer = document.querySelector('.card-container');


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

        cardContainer.style.display = 'flex';

        setInterval(() => {
            spawnRandomFireworks();
        }, 1000);

        setTimeout(() => {

            spawnNextMessage()

        }, 2000);

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

/* Fireworks Effect 2.0*/
function spawnRandomFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.classList.add('fireworks');
    fireworksContainer.style.position = 'fixed';
    fireworksContainer.style.pointerEvents = 'none';
    fireworksContainer.style.zIndex = 999;

    const maxX = window.innerWidth;
    const maxY = window.innerHeight;
    fireworksContainer.style.left = `${Math.random() * maxX}px`;
    fireworksContainer.style.top = `${Math.random() * maxY}px`;

    document.body.appendChild(fireworksContainer);

    for (let i = 0; i < 150; i++) {
        const spark = document.createElement('div');
        spark.classList.add('spark');

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 500;

        spark.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
        spark.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
        spark.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;

        fireworksContainer.appendChild(spark);
    }

    setTimeout(() => {
        fireworksContainer.remove();
    }, 1500);
}


/* Cards Spawn */
const messages = [
    "生日快乐 🎂",
    "天天开心 ✨",
    "心想事成 💫",
    "幸福安康 ❤️",
    "梦想成真 🌈",
    "好运连连 🍀",
    "笑口常开 😄",
    "前程似锦 🚀",
    "平安喜乐 🕊️",
    "万事顺意 🎉",
    "青春永驻 🌸",
    "福星高照 ⭐",
    "吉祥如意 🐲",
    "快乐无边 🎈",
    "心情美丽 🌷",
    "岁岁平安 🕊️",
    "好运常伴 🌟",
    "幸福满满 💖",
    "笑容灿烂 😁",
    "精彩每一天 ✨",
    "快乐成长 🌱",
    "幸福洋溢 🌸",
    "年年有今日 🎉",
    "青春常驻 🌟",
    "甜蜜满满 🍰",
    "喜气洋洋 🧧",
    "美梦成真 🌈"
];

const template = document.getElementById('card-template');
const spawnInterval = 1000;
let spawnIndex = 0;
const spawnedCards = [];

function heart(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x, y };
}

function spawnNextMessage() {
    if (spawnIndex >= messages.length) {
        setTimeout(() => {

            hideCardsDescending();

        }, 2000);

        return;
    }

    const card = template.cloneNode(true);
    card.id = '';
    card.classList.remove('hidden');

    const p = card.querySelector('p');
    p.textContent = messages[spawnIndex];

    const firstRect = cardContainer.getBoundingClientRect();
    const centerX = firstRect.left + firstRect.width / 2;
    const centerY = firstRect.top + firstRect.height / 2;

    const t = (spawnIndex / messages.length) * 2 * Math.PI;

    let scale = window.innerWidth <= 768 ? 12 : 25;
    const pos = heart(t);

    const x = centerX + pos.x * scale - 100;
    const y = centerY - pos.y * scale - 150;

    card.style.position = 'fixed';
    card.style.left = `${x}px`;
    card.style.top = `${y}px`;
    card.style.zIndex = 1000;
    card.style.display = 'flex';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    document.body.appendChild(card);
    spawnedCards.push(card);

    spawnIndex++;
    setTimeout(spawnNextMessage, spawnInterval);
}


function hideCardsDescending() {
    let i = spawnedCards.length - 1;

    function hideNext() {
        if (i < 0) {

            setTimeout(() => {

                cardContainer.style.display = 'none';

            }, 1500);

            return;
        };

        const card = spawnedCards[i];
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8) translateY(20px)';

        setTimeout(() => {
            card.remove();
        }, 1000);

        i--;
        setTimeout(hideNext, 150);
    }

    hideNext();
}





