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

// GIF控制变量
let currentGifIndex = 1;
let gifChangeEnabled = false;

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

// 创建烟花效果
function createFirework(x, y) {
    const colors = ['#ff6b6b', '#ff9f9f', '#ffd700', '#ff69b4', '#87ceeb'];
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    document.body.appendChild(firework);

    // 创建烟花粒子
    const particleCount = 20; // 移动端使用较少的粒子数量
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        // 随机角度和距离
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 2 + Math.random() * 2;
        const distance = 30 + Math.random() * 30; // 移动端使用较小的扩散范围
        
        // 设置粒子属性
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty('--x', Math.cos(angle) * distance * velocity);
        particle.style.setProperty('--y', Math.sin(angle) * distance * velocity);
        
        firework.appendChild(particle);
    }

    // 创建上升轨迹效果
    const trailCount = 5;
    for (let i = 0; i < trailCount; i++) {
        setTimeout(() => {
            const trail = document.createElement('div');
            trail.className = 'firework-trail';
            trail.style.left = x + 'px';
            trail.style.top = (y + i * 10) + 'px';
            document.body.appendChild(trail);

            setTimeout(() => trail.remove(), 500);
        }, i * 50);
    }

    // 移除烟花元素
    setTimeout(() => firework.remove(), 1000);
}

// 随机创建烟花
function randomFirework() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // 在屏幕上半部分随机位置创建烟花
    const x = Math.random() * width;
    const y = height * 0.2 + Math.random() * (height * 0.4);
    
    createFirework(x, y);
}

// 创建多个烟花
function createMultipleFireworks() {
    // 随机位置创建3-5个烟花
    const count = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            randomFirework();
        }, i * 200); // 每个烟花之间间隔200毫秒
    }
}

// 切换GIF图片
function switchGif() {
    if (!gifChangeEnabled || currentGifIndex >= 4) return;
    
    currentGifIndex++;
    const cakeGif = document.getElementById('cake-gif');
    
    // 创建新的Image对象来处理GIF加载
    const newGif = new Image();
    newGif.onload = function() {
        cakeGif.src = this.src;
    };
    newGif.src = `img/cake${currentGifIndex}.gif`;
}

// 初始化主界面
function initializeMainContent() {
    welcomeScreen.style.display = 'none';
    mainContent.classList.remove('hidden');
    initializeMessages();
    
    // 添加点击事件监听器
    document.addEventListener('click', (e) => {
        showNextMessage();
        switchGif();
    });

    // 每秒创建多个烟花
    createMultipleFireworks(); // 立即创建第一组烟花
    setInterval(createMultipleFireworks, 1000); // 每秒创建一组烟花
    
    // 启用GIF切换
    setTimeout(() => {
        gifChangeEnabled = true;
    }, 1000); // 等待1秒后启用GIF切换，确保欢迎界面完全结束
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

// 创建心形效果
function createHeart(x, y) {
    // 创建主爱心
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    // 创建多个小爱心
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const miniHeart = document.createElement('div');
            miniHeart.className = 'mini-heart';
            miniHeart.style.left = x + 'px';
            miniHeart.style.top = y + 'px';
            
            // 随机方向和距离
            const angle = (Math.random() * Math.PI * 2);
            const distance = 30 + Math.random() * 40;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 20;
            
            miniHeart.style.setProperty('--tx', `${tx}px`);
            miniHeart.style.setProperty('--ty', `${ty}px`);
            miniHeart.style.animation = `floatMiniHeart 1s ease-out forwards ${i * 0.1}s`;
            
            document.body.appendChild(miniHeart);
            
            setTimeout(() => {
                miniHeart.remove();
            }, 1000 + i * 100);
        }, i * 100);
    }
    
    setTimeout(() => {
        heart.remove();
    }, 1500);
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

    // 添加点击事件，显示爱心效果
    document.addEventListener('click', (e) => {
        createHeart(e.clientX, e.clientY);
    });
}); 
