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

// 创建生日粒子
function createBirthdayParticle(type) {
    const particle = document.createElement('div');
    particle.className = `birthday-particle ${type}`;
    
    // 随机颜色
    const colors = {
        balloon: ['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#FFD700'],
        confetti: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
        star: ['#FFD700', '#FFA07A', '#87CEEB', '#98FB98', '#DDA0DD'],
        'cake-bit': ['#FF69B4', '#FFD700', '#FF6B6B', '#87CEEB', '#DDA0DD']
    };
    const color = colors[type][Math.floor(Math.random() * colors[type].length)];
    
    // 设置样式
    particle.style.backgroundColor = color;
    
    // 随机位置
    const width = window.innerWidth;
    const height = window.innerHeight;
    let x, y;
    
    switch(type) {
        case 'balloon':
            x = Math.random() * width;
            y = height + 30;
            break;
        case 'confetti':
            x = Math.random() * width;
            y = -10;
            break;
        case 'star':
            x = Math.random() * width;
            y = Math.random() * height;
            break;
        case 'cake-bit':
            const card = document.querySelector('.birthday-card');
            const cardRect = card.getBoundingClientRect();
            x = cardRect.left + Math.random() * cardRect.width;
            y = cardRect.top + cardRect.height / 2;
            break;
    }
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // 随机大小
    const baseSize = {
        balloon: { min: 15, max: 25 },
        confetti: { min: 5, max: 8 },
        star: { min: 8, max: 12 },
        'cake-bit': { min: 4, max: 6 }
    };
    const size = Math.random() * (baseSize[type].max - baseSize[type].min) + baseSize[type].min;
    particle.style.width = `${size}px`;
    particle.style.height = type === 'balloon' ? `${size * 1.25}px` : `${size}px`;
    
    // 添加到容器
    const container = document.querySelector('.main-particles');
    container.appendChild(particle);
    
    // 设置动画结束后移除元素
    const durations = {
        balloon: 8000,
        confetti: 4000,
        star: 2000,
        'cake-bit': 3000
    };
    
    setTimeout(() => {
        particle.remove();
    }, durations[type]);
}

// 生成生日粒子效果
function generateBirthdayParticles() {
    function createRandomParticles() {
        // 创建气球
        if (Math.random() < 0.1) {
            createBirthdayParticle('balloon');
        }
        
        // 创建彩带
        if (Math.random() < 0.2) {
            createBirthdayParticle('confetti');
        }
        
        // 创建星星
        if (Math.random() < 0.15) {
            createBirthdayParticle('star');
        }
        
        // 创建蛋糕碎片
        if (Math.random() < 0.1) {
            createBirthdayParticle('cake-bit');
        }
    }
    
    // 定期创建粒子
    return setInterval(createRandomParticles, 100);
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
    
    // 启动生日粒子效果
    generateBirthdayParticles();
}

// 创建倒计时粒子
function createCountdownParticle(x, y, isSpecial = false) {
    const particle = document.createElement('div');
    particle.className = `countdown-particle${isSpecial ? ' special' : ''}`;
    
    // 随机大小，特殊粒子更大
    const size = isSpecial ? Math.random() * 8 + 6 : Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // 初始位置
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // 随机方向和速度
    const angle = Math.random() * Math.PI * 2;
    const velocity = isSpecial ? Math.random() * 3 + 2 : Math.random() * 2 + 1;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - (isSpecial ? 2 : 1); // 向上的额外速度
    
    // 添加到容器
    const container = document.querySelector('.countdown-particles');
    container.appendChild(particle);
    
    // 动画
    let posX = x;
    let posY = y;
    let opacity = 1;
    let life = isSpecial ? 1.5 : 1;
    let scale = 1;
    
    function animate() {
        if (life <= 0) {
            particle.remove();
            return;
        }
        
        posX += vx;
        posY += vy;
        life -= 0.02;
        opacity = life;
        scale = isSpecial ? 1 + Math.sin(life * Math.PI) * 0.5 : 1;
        
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;
        particle.style.transform = `scale(${scale})`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 生成倒计时粒子效果
function generateCountdownParticles() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    
    function createParticles() {
        // 创建普通粒子
        for (let i = 0; i < 3; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            createCountdownParticle(x, y);
        }
        
        // 创建特殊粒子
        if (Math.random() < 0.3) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 100;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            createCountdownParticle(x, y, true);
        }
    }
    
    // 定期创建粒子
    const intervalId = setInterval(createParticles, 50);
    
    // 返回清理函数
    return () => clearInterval(intervalId);
}

// 开始倒计时
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const countdownContainer = document.querySelector('.countdown-container');
    const welcomeText = document.querySelector('.welcome-text');
    let count = 3;

    // 显示倒计时容器
    countdownContainer.classList.add('visible');
    
    // 启动粒子效果
    const cleanupParticles = generateCountdownParticles();
    
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            // 数字切换动画
            countdownElement.classList.add('fade-out');
            setTimeout(() => {
                countdownElement.textContent = count;
                countdownElement.classList.remove('fade-out');
            }, 300);
        } else {
            // 倒计时结束
            clearInterval(countdownInterval);
            countdownElement.classList.add('fade-out');
            
            // 停止粒子效果
            cleanupParticles();
            
            setTimeout(() => {
                countdownContainer.classList.remove('visible');
                welcomeText.classList.remove('hidden');
                
                // 添加欢迎文字动画
                setTimeout(() => {
                    welcomeText.classList.add('show');
                    
                    // 2秒后切换到主界面
                    setTimeout(() => {
                        welcomeText.classList.remove('show');
                        setTimeout(() => {
                            initializeMainContent();
                        }, 500);
                    }, 2000);
                }, 100);
            }, 500);
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

// 创建粒子
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 随机大小
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // 初始位置
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // 随机方向和速度
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 2 + 1;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    // 添加到容器
    const container = document.getElementById('particles-container');
    container.appendChild(particle);
    
    // 动画
    let posX = x;
    let posY = y;
    let opacity = 1;
    let life = 1;
    
    function animate() {
        if (life <= 0) {
            particle.remove();
            return;
        }
        
        posX += vx;
        posY += vy;
        life -= 0.02;
        opacity = life;
        
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 生成粒子效果
function generateParticles() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // 每帧创建的粒子数
    const particlesPerFrame = 2;
    
    function createParticles() {
        for (let i = 0; i < particlesPerFrame; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            createParticle(x, y);
        }
    }
    
    // 定期创建粒子
    const intervalId = setInterval(createParticles, 50);
    
    // 返回清理函数
    return () => clearInterval(intervalId);
}

// 创建欢迎界面粒子
function createWelcomeParticle(x, y, type = 'normal') {
    const particle = document.createElement('div');
    particle.className = `welcome-particle ${type}`;
    
    // 随机颜色
    const colors = [
        '#FF69B4', '#FFD700', '#FF6B6B', '#87CEEB', 
        '#98FB98', '#DDA0DD', '#F0E68C', '#00CED1'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // 随机大小
    const size = type === 'glow' ? 
        Math.random() * 6 + 4 : 
        Math.random() * 4 + 2;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.color = color; // 用于glow效果
    
    // 初始位置
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // 添加到容器
    const container = document.querySelector('.welcome-particles');
    container.appendChild(particle);
    
    // 动画参数
    const angle = Math.random() * Math.PI * 2;
    const velocity = type === 'glow' ? 
        Math.random() * 2 + 1 : 
        Math.random() * 1.5 + 0.5;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    const rotationSpeed = (Math.random() - 0.5) * 4;
    
    // 动画状态
    let posX = x;
    let posY = y;
    let rotation = 0;
    let opacity = 1;
    let scale = 1;
    let life = type === 'glow' ? 2 : 1.5;
    
    function animate() {
        if (life <= 0) {
            particle.remove();
            return;
        }
        
        posX += vx;
        posY += vy;
        rotation += rotationSpeed;
        life -= 0.01;
        opacity = life;
        scale = 1 + Math.sin(life * Math.PI) * 0.2;
        
        particle.style.transform = `translate(${posX - x}px, ${posY - y}px) rotate(${rotation}deg) scale(${scale})`;
        particle.style.opacity = opacity;
        
        // 创建轨迹粒子
        if (type === 'glow' && Math.random() < 0.3) {
            const trail = document.createElement('div');
            trail.className = 'welcome-particle trail';
            trail.style.width = `${size * 0.8}px`;
            trail.style.height = `${size * 0.8}px`;
            trail.style.backgroundColor = color;
            trail.style.left = `${posX}px`;
            trail.style.top = `${posY}px`;
            container.appendChild(trail);
            
            // 轨迹粒子淡出
            setTimeout(() => {
                trail.style.opacity = '0';
                trail.style.transform = 'scale(0.5)';
                trail.style.transition = 'all 0.5s ease';
                setTimeout(() => trail.remove(), 500);
            }, 10);
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 生成欢迎界面粒子效果
function generateWelcomeParticles() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    function createParticles() {
        // 创建普通粒子
        for (let i = 0; i < 2; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            createWelcomeParticle(x, y);
        }
        
        // 创建发光粒子
        if (Math.random() < 0.3) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            createWelcomeParticle(x, y, 'glow');
        }
    }
    
    // 定期创建粒子
    const intervalId = setInterval(createParticles, 50);
    
    // 返回清理函数
    return () => clearInterval(intervalId);
}

// 页面加载动画序列
window.addEventListener('load', () => {
    // 启动欢迎界面粒子效果
    const cleanupWelcomeParticles = generateWelcomeParticles();
    
    // 添加准备按钮点击事件
    const readyBtn = document.getElementById('readyBtn');
    const readyDialog = document.querySelector('.ready-dialog');
    
    readyBtn.addEventListener('click', () => {
        // 按钮点击效果
        readyBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            readyBtn.style.transform = 'scale(1)';
        }, 100);
        
        // 停止欢迎界面粒子效果
        cleanupWelcomeParticles();
        
        // 淡出对话框
        readyDialog.classList.add('fade-out');
        
        setTimeout(() => {
            readyDialog.style.display = 'none';
            startCountdown();
        }, 500);
    });

    // 添加点击事件，显示爱心效果
    document.addEventListener('click', (e) => {
        createHeart(e.clientX, e.clientY);
    });
}); 
