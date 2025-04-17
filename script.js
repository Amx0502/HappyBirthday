// 粒子效果配置
const particlesConfig = {
    particles: {
        number: {
            value: 150,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ["#ff6b6b", "#ff9f9f", "#ffd700", "#ffffff", "#ff69b4", "#87ceeb"]
        },
        shape: {
            type: ["circle", "triangle", "star"]
        },
        opacity: {
            value: 0.7,
            random: true
        },
        size: {
            value: 4,
            random: true
        },
        move: {
            enable: true,
            speed: 4,
            direction: "none",
            random: true,
            out_mode: "out",
            bounce: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        }
    }
};

// 初始化粒子效果
particlesJS('particles-js', particlesConfig);

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
    const clickHint = document.querySelector('.click-hint');
    message.classList.remove('show');
    
    setTimeout(() => {
        // 如果是最后一条消息，添加特殊效果并停止切换
        if (currentMessage >= messages.length - 1) {
            message.innerHTML = `
                <p>${messages[currentMessage]}</p>
                <div class="final-hint">This is the end. Thank you for reading! ✨</div>
            `;
            message.classList.add('show', 'final');
            clickHint.style.display = 'none';  // 隐藏点击提示
            
            // 创建多个烟花效果
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createFireworkParticles(
                        window.innerWidth * Math.random(),
                        window.innerHeight * Math.random()
                    );
                }, i * 300);
            }
            return;
        }
        
        message.innerHTML = `<p>${messages[currentMessage]}</p>`;
        message.classList.add('show');
        createMessageParticles();
        
        currentMessage++;
    }, 500);
}

// 创建消息粒子效果
function createMessageParticles() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'message-particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDuration = Math.random() * 2 + 2 + 's';
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        particle.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

// 创建烟花效果
function createFireworkParticles(x, y) {
    const colors = ['#ff6b6b', '#ff9f9f', '#ffd700', '#ff69b4', '#87ceeb', '#ffffff'];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        // 随机角度和速度
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 0.5 + Math.random() * 0.5;
        
        // 设置粒子属性
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty('--startX', `${x}px`);
        particle.style.setProperty('--startY', `${y}px`);
        particle.style.setProperty('--velocityX', `${Math.cos(angle) * velocity}`);
        particle.style.setProperty('--velocityY', `${Math.sin(angle) * velocity}`);
        
        // 随机大小
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        document.body.appendChild(particle);
        
        // 动画结束后移除粒子
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// 初始化消息显示
function initializeMessages() {
    const message = document.querySelector('.message');
    message.innerHTML = `<p>${messages[0]}</p>`;
    message.classList.add('show');
    currentMessage = 1;  // 设置为1，因为第一条消息已经显示
}

// 页面加载动画序列
window.addEventListener('load', () => {
    // 创建装饰元素
    createDecorations();
    
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
        
        // 创建点击特效
        const rect = readyBtn.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createFireworkParticles(
                    rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
                    rect.top + rect.height / 2 + (Math.random() - 0.5) * 100
                );
            }, i * 100);
        }
        
        // 淡出对话框
        readyDialog.style.opacity = '0';
        readyDialog.style.transform = 'scale(0.9)';
        readyDialog.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            // 隐藏对话框，显示倒计时
            readyDialog.style.display = 'none';
            countdownContainer.classList.remove('hidden');
            countdownContainer.style.opacity = '1';
            countdownContainer.style.transform = 'scale(1)';
            
            // 开始倒计时
            startCountdown();
        }, 500);
    });
});

// 倒计时结束后初始化主界面
function initializeMainContent() {
    welcomeScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    // 初始化第一条消息
    initializeMessages();
    
    // 添加点击事件监听
    let canClick = true; // 添加点击控制变量
    
    document.addEventListener('click', (e) => {
        // 只有当可以点击且不是音乐控制按钮时才处理点击
        if (canClick && !e.target.closest('.music-control') && currentMessage < messages.length) {
            canClick = false; // 禁用点击
            createHeart(e.clientX, e.clientY);
            createFireworkParticles(e.clientX, e.clientY);
            
            // 创建多个烟花效果
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const offsetX = (Math.random() - 0.5) * 100;
                    const offsetY = (Math.random() - 0.5) * 100;
                    createFireworkParticles(e.clientX + offsetX, e.clientY + offsetY);
                }, i * 200);
            }
            
            // 切换消息
            showNextMessage();
            
            // 500ms后重新启用点击
            setTimeout(() => {
                canClick = true;
            }, 500);
        }
    });
}

// 更新倒计时函数
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const welcomeText = document.querySelector('.welcome-text');
    let count = 3;
    
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownElement.textContent = count;
            // 创建烟花效果
            const rect = countdownElement.getBoundingClientRect();
            createFireworkParticles(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        } else {
            clearInterval(countdownInterval);
            // 隐藏倒计时，显示欢迎文字
            countdownElement.parentElement.style.opacity = '0';
            setTimeout(() => {
                countdownElement.parentElement.style.display = 'none';
                welcomeText.classList.remove('hidden');
                
                // 创建多个烟花效果
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createFireworkParticles(
                            window.innerWidth * Math.random(),
                            window.innerHeight * Math.random()
                        );
                    }, i * 200);
                }
                
                // 3秒后切换到主界面
                setTimeout(() => {
                    welcomeScreen.style.opacity = '0';
                    welcomeScreen.style.transition = 'opacity 1s ease';
                    
                    setTimeout(() => {
                        initializeMainContent(); // 使用新的初始化函数
                    }, 1000);
                }, 3000);
            }, 500);
        }
    }, 1000);
}

// 创建心形效果
function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// 创建装饰元素
function createDecorations() {
    // 创建气球
    const balloonColors = ['#ff6b6b', '#ff9f9f', '#ffd700', '#ff69b4', '#87ceeb'];
    for (let i = 0; i < 8; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.top = `${Math.random() * 100}vh`;
        balloon.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.animationDelay = `${Math.random() * 2}s`;
        balloon.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(balloon);
    }
}

// 创建星星效果
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDuration = Math.random() * 2 + 3 + 's';
    star.style.opacity = Math.random() * 0.5 + 0.5;
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 5000);
}

// 定期创建星星
setInterval(() => {
    createStar();
}, 800); 