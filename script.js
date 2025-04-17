// DOM 元素
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const message = document.querySelector('.message');

// 消息数组
const messages = [
    "Hi Lia! Happy Birthday! 🎉",
    "On this special day, I wish you endless joy, laughter, and all the happiness in the world. May your year ahead be filled with love, success, and beautiful memories. 💖",
    "You're an amazing person and I'm so grateful to have you in my life. Cheers to another fabulous year! 🥂",
    "May all your dreams come true and may you always shine as bright as you do today! ✨"
];

let currentMessage = 0;
let messageInterval;

// 自动播放音乐
function playMusic() {
    bgMusic.volume = 0.5;
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // 自动播放成功
            isPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        })
        .catch(error => {
            // 自动播放失败，显示播放按钮
            isPlaying = false;
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
        });
    }
}

// 页面加载时尝试播放音乐
document.addEventListener('DOMContentLoaded', playMusic);

// 用户交互后播放音乐
document.addEventListener('click', () => {
    if (!isPlaying) {
        playMusic();
    }
}, { once: true });

// 音乐控制
let isPlaying = false;
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// 显示消息
function showNextMessage() {
    const message = document.querySelector('.message');
    message.classList.remove('show');
    
    setTimeout(() => {
        // 如果是最后一条消息，添加特殊效果并停止切换
        if (currentMessage >= messages.length - 1) {
            message.innerHTML = `
                <p>${messages[currentMessage]}</p>
                <div class="final-hint">This is the end. Thank you for reading! ✨</div>
            `;
            message.classList.add('show', 'final');
            return;
        }
        
        message.innerHTML = `<p>${messages[currentMessage]}</p>`;
        message.classList.add('show');
        currentMessage++;
    }, 500);
}

// 初始化消息显示
function initializeMessages() {
    const message = document.querySelector('.message');
    message.innerHTML = `<p>${messages[0]}</p>`;
    message.classList.add('show');
    currentMessage = 1;  // 设置为1，因为第一条消息已经显示
}

// 初始化主界面
function initializeMainContent() {
    welcomeScreen.style.display = 'none';
    mainContent.classList.remove('hidden');
    initializeMessages();
    
    // 添加点击事件监听器
    document.addEventListener('click', showNextMessage);
}

// 开始倒计时
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const countdownContainer = document.querySelector('.countdown-container');
    const welcomeText = document.querySelector('.welcome-text');
    let count = 3;

    countdownContainer.classList.remove('hidden');
    
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownElement.textContent = count;
        } else {
            clearInterval(countdownInterval);
            countdownContainer.classList.add('hidden');
            welcomeText.classList.remove('hidden');
            
            // 显示欢迎文字2秒后切换到主界面
            setTimeout(() => {
                initializeMainContent();
            }, 2000);
        }
    }, 1000);
}

// 页面加载动画序列
window.addEventListener('load', () => {
    // 添加准备按钮点击事件
    const readyBtn = document.getElementById('readyBtn');
    const readyDialog = document.querySelector('.ready-dialog');
    const countdownContainer = document.querySelector('.countdown-container');
    
    readyBtn.addEventListener('click', () => {
        // 按钮点击效果
        readyBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            readyBtn.style.transform = 'scale(1)';
        }, 100);
        
        // 淡出对话框
        readyDialog.style.opacity = '0';
        readyDialog.style.transform = 'scale(0.9)';
        readyDialog.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            // 隐藏对话框，显示倒计时
            readyDialog.style.display = 'none';
            startCountdown();
        }, 500);
    });
}); 
