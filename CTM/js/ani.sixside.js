$("body").after('<canvas id="anibg0"></canvas>');
var canvas = document.getElementById("anibg0");
let ctx0 = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,   
    height = canvas.height = window.innerHeight,
    particles = [];

let settings = {
    speed: 1,
    lifeTime: 1000,
    maxParticles: 50,
    lineLength: 35,
    radius: 0.6
};

function rotate(vec, angle) {
    // convert the angle from degrees to radians
    angle = angle * Math.PI / 180;
    return [(vec[0] * Math.cos(angle)) - (vec[1] * Math.sin(angle)), (vec[0] * Math.sin(angle)) + (vec[1] * Math.cos(angle))];
}

// 方向
let dirVecs = [
    [1, 0],
    rotate([1, 0], 120),
    rotate([1, 0], 240)
];

function particle() {
    this.x = 0;
    this.y = 0;
    this.age = 0;
    // 从方向里随机取一个值，0-2
    this.dir = dirVecs[Math.floor(Math.random() * 3)];
    // 时间随机颜色
    // H：0(或360)表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360。
    // S：取值为：0.0% - 100.0%；0% 意味着灰色，而 100% 是全彩
    // L：取值为：0.0% - 100.0%；0% 是黑色，100% 是白色。
    this.color = 'hsl(' + ((Date.now() / 240.0) % 360.0) + ', 90%, light%)';
}

particle.prototype.updateAndDraw = function() {
    this.age++;
    // 滚动时间能整除边长 则表示要转向了
    if (this.age % settings.lineLength === 0) {
        let dir1 = rotate(this.dir, 60);
        let dir2 = rotate(this.dir, -60);

        let options = [];

        options = [dir1, dir2];

        this.dir = options[Math.floor(Math.random() * options.length)];
    }

    ctx0.fillStyle = this.color.replace('light', '40');
    ctx0.beginPath();
    // 画圆
    ctx0.arc(width / 2.0 + this.x, height / 2.0 + this.y, settings.radius, 0, 6.3);

    ctx0.shadowBlur = settings.radius * 6;
    ctx0.shadowColor = this.color.replace('light', '40');
    ctx0.fill();

    this.x += this.dir[0] * settings.speed;
    this.y += this.dir[1] * settings.speed;
};


function updateAndDraw() {
    ctx0.shadowBlur = 0;
    ctx0.globalCompositeOperation = 'source-over';

    ctx0.fillStyle = 'rgb(0, 0, 0, 0.03)';
    ctx0.fillRect(0, 0, width, height);
    ctx0.globalCompositeOperation = 'lighter';

    for (let i = particles.length - 1; i >= 0; i--) {
        // 移动粒子
        particles[i].updateAndDraw();
        if (particles[i].age > settings.lifeTime) {
            // remove the particle if it is to old
            particles.splice(i, 1);
        }
    }

    if (particles.length < settings.maxParticles) {
        // if more particles can be added
        if (Math.random() > 0.9) {
            particles.push(new particle());
        }
    } else if (particles.length > settings.maxParticles) {
        // if there are two many particles
        particles.splice(0, settings.maxParticles);
    }

    requestAnimationFrame(updateAndDraw);
}

function onResize() {
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
		
    particles.length = 0; // 重加载的时候是否需要清除粒子树
    ctx0.fillStyle = '#F0FFFF';
    ctx0.fillRect(0, 0, width, height);
}


function init() {
    ctx0.fillStyle = '#F0FFFF';
    ctx0.fillRect(0, 0, width, height);
    window.onresize = onResize;

    updateAndDraw();
}

init();


