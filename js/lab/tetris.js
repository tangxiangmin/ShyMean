/**
 * 元素形状
 */

const shapes = [
    [
        [0,1],
        [1,1],
        [0,1]
    ],
    [
        [0,1],
        [0,1],
        [1,1]
    ],
    [
        [1,1],
        [1,1]
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

// 按键
const keyLeft = 37;
const keyRight = 39;
const keyUp = 38;
const keyDown = 40;
const keySpace = 32;

/**
 * 方块
 * @param
 * {
 *      speed: animate speed
 * }
 * @constructor
 */
function Sprite(params) {
    // 随机形状
    let shape = shapes[Math.floor(Math.random()*shapes.length)];
    this.coords = shape;
    this.size = spriteSize;
    this.w = shape[0].length;
    this.h = shape.length;

    this.speed = 1000;

    // 随机位置
    this.x = Math.floor(Math.random()*col)*this.size;
    this.y = 0;
    //this.position = {
    //    x: pos*this.size,
    //    y: 0
    //};
}

Sprite.prototype = {
    constructor: Sprite,
    clear(){
        // 应当根据coords进行清除，而不是直接清除这个9方格，暂时先挖个坑
        var x = this.x,
            y = this.y,
            w = this.getWidth(),
            h = this.getHeight();

        ctx.clearRect(x, y, w, h);
    },
    draw(){

        this.clear();
        for (let i = 0,row = this.h; i < row; ++i){
            for (let j = 0,col= this.w; j < col; ++j){
                if (this.coords[i][j] == 1){
                    ctx.fillStyle = "#000";
                    ctx.fillRect(this.x + this.size*j, this.y+this.size*i, this.size, this.size);
                }else {
                    ctx.fillStyle = "#ccc";
                    ctx.fillRect(this.x + this.size*j, this.y+this.size*i, this.size, this.size);
                }
            }
        }
    },
    getWidth(){
        return this.size*this.w;
    },
    getHeight(){
        return this.size*this.h;
    },
    init() {
        // 初始化
        this.draw();

        // 由于操作时单次按键而不是连续按键，因此使用定时器而不是requestAnimationFrame()
        let sprite = this;

    },
    // 方块转换
    transform() {
        let tmp = [];

        for (let i = 0; i < this.w; ++i){
            tmp[i] = [];
        }

        // 顺时针转换90度
        for (let i = 0; i < this.h; ++i) {
            for (let j = 0; j < this.w; ++j) {
                tmp[j][this.h - 1 - i] = this.coords[i][j];
            }
        }

        this.coords = tmp;

        // 长宽切换
        let w = this.w;
        this.w = this.h;
        this.h = w;
    },
    checkBoundary(){
        // left
        if (this.x - this.size < 0){
            this.x = 0;
            return keyLeft;
        }

        // right
        let x = canvasWidth - this.getWidth();
        if (this.x  >= x ) {
            this.x = x;
            return keyRight;
        }

        // bottom
        if (this.isDie()){
            return keyDown;
        }

        return keyUp;
    },

    isDie(){
        let y = canvasHeight - this.getHeight();
        if (this.y >= y){
            this.y = y;
            return true;
        }
    }
};

/**
 * 画布
 */
function Tetris() {
    this.sprite = new Sprite();

    this.init = function () {
        let sprite = this.sprite;
        sprite.init();



        // 下落
        update();
        function update() {
            sprite.clear();
            sprite.y += sprite.size;
            sprite.draw();

            if (!sprite.isDie()){
                setTimeout(update, sprite.speed);
            }else {
                for (var i = 0; i < col; ++i){
                    // 将方块的位置转化成画布的属性，用于计算消除
                }
                
                // 新增另外一个方块
            }
        }

        document.addEventListener("keyup", function (e) {
            let boundary = sprite.checkBoundary();
            let keyCode = e.keyCode;

            if (boundary == keyCode){
                e.preventDefault();
                return ;
            }

            sprite.clear();
            switch (keyCode){
                case keySpace:
                    sprite.transform();
                    break;
                case keyLeft:
                    sprite.x -= sprite.size;
                    break;
                case keyUp:
                    console.log("%c⊙﹏⊙b汗，怎么能够往上面跑呢~~除非开挂","color:green");
                    break;
                case keyRight:
                    sprite.x += sprite.size;
                    break;
                case keyDown:
                    sprite.y += sprite.size;
                    break;
            }
            sprite.draw();
        }, false);
    }
}

