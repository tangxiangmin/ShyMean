/**
 * 元素形状
 */

const shapes = [
    [
        [0,1,0],
        [1,1,0],
        [0,1,0],
    ],
    [
        [0,1,0],
        [0,1,0],
        [1,1,0],
    ],
    [
        [1,1,0],
        [1,1,0],
        [0,0,0],
    ],
];

/**
 * canvas 相关
 */
let canvas = document.getElementById("xmCanvas");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const spriteSize = 30;

let col = canvasWidth/spriteSize;
let ctx = canvas.getContext("2d");

// 保存按钮情形


/**
 * 精灵
 * @param
 * {
 *      size: the squre sprite width & height
 *      speed: animate speed
 * }
 * @constructor
 */
function Sprite(params) {
    // 随机形状
    let shape = Math.floor(Math.random()*shapes.length);
    this.coords = shapes[shape];

    this.size = params.size || 30;
    this.speed = params.speed || 1000;
    this.matrixSize = this.coords.length;

    // 随机位置
    let pos = Math.floor(Math.random()*col);
    this.startPoint = {
        x: pos*this.size,
        y: 0
    }
}

Sprite.prototype = {
    constructor: Sprite,
    // 工具方法
    clear(){
        /* 清除相应区域 */
        // 应当根据coords进行清除，而不是直接清除这个9方格，暂时先挖个坑
        ctx.clearRect(this.startPoint.x, this.startPoint.y, this.size*this.matrixSize, this.size*this          .matrixSize);
    },
    draw(){
        /* 绘制新图像 */
        let startPoint = this.startPoint,
            size = this.size,
            matrixSize = this.matrixSize;

        this.clear();

        for (let i = 0; i < matrixSize; ++i){
            for (let j = 0; j < matrixSize; ++j){
                if (this.coords[i][j] == 1){
                    ctx.fillRect(startPoint.x + size*j, startPoint.y+size*i, size, size);
                }
            }
        }
    },

    // 接口
    init() {
        /* 初始化 */
        // 随机位置
        this.draw();

        // 由于操作时单次按键而不是连续按键，因此使用定时器而不是requestAnimationFrame()
        let _that = this;
        update();
        function update() {
            _that.clear();
            _that.down();
            _that.draw();
            if (!_that.isBottom()){
                setTimeout(update, _that.speed);
            }

        }
    },
    // 位移
    left(){
        this.startPoint.x -= this.size;
        if (this.startPoint.x < 0) {
            this.startPoint.x = 0;
        }
    },
    right(){
        this.startPoint.x += this.size;
        if (this.startPoint.x > canvasWidth - this.size*this.matrixSize) {
            this.startPoint.x = canvasWidth - this.size*this.matrixSize;
        }
    },
    down(){
        this.startPoint.y += this.size;
        let y = canvasHeight - this.matrixSize*this.size;
        if (this.startPoint.y > y){
            this.startPoint.y = y;
        }
    },
    // 变形，顺时针转换90度
    transform() {
        let tmp = [];
        for (let i = 0; i < this.matrixSize; ++i){
            tmp.push([]);
        }

        for (let i = 0; i < this.matrixSize; ++i) {
            for (let j = 0; j < this.matrixSize; ++j) {
                tmp[j][2-i] = this.coords[i][j];
            }
        }

        this.coords = tmp;

    },
    // 边界检测，这里存在BUG
    // 需要剔除数组中多余的占位符0
    getBoundCheck(){
        let y = canvasHeight - this.matrixSize*this.size;
        let x = canvasWidth - this.matrixSize*this.size;

        if (this.startPoint.y > y ||
            this.startPoint.x > x ||
            this.startPoint.x < 0 ){
            return true;
        }
    },
    isBottom(){
        let y = canvasHeight - this.matrixSize*this.size;
        if (this.startPoint.y > y){
            this.startPoint.y = y;
            return true;
        }
    }
};

/**
 * 画布
 */
function Tetris() {
    this.sprite = new Sprite({size:30});
    this.keyDown = {};

    this.init = function () {
        let sprite = this.sprite;

        sprite.init();

        document.addEventListener("keyup", function (e) {
            sprite.clear();
            switch (e.keyCode){
                case 32:
                    sprite.transform();
                    break;
                case 37:
                    sprite.left();
                    break;
                case 38:
                    console.log("⊙﹏⊙b汗，怎么能够往上面跑呢~~");
                    break;
                case 39:
                    sprite.right();
                    break;
                case 40:
                    sprite.down();
                    break;
            }

            sprite.draw();

        }, false);
    }
}

