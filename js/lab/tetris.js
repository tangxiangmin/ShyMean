/**
 * 元素形状
 */

const shapes = [
    [
        [0,1],
        [1,1],
        [0,1],
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

// 按键
const keyLeft = 37;
const keyRight = 39;
const keyUp = 38;
const keyDown = 40;
const keySpace = 32;

/**
 * 精灵
 * @param
 * {
 *      speed: animate speed
 * }
 * @constructor
 */
function Sprite(params) {
    // 随机形状
    let shape = Math.floor(Math.random()*shapes.length);
    this.coords = shapes[shape];


    this.speed = params && params.speed || 1000;
    this.matrixSize = this.coords.length;

    // 随机位置
    let pos = Math.floor(Math.random()*col);

    this.position = {
        x: pos*spriteSize,
        y: 0
    };
    this.size = {
        w: this.coords[0].length,
        h: this.coords.length
    }

}

Sprite.prototype = {
    constructor: Sprite,
    // 工具方法
    clear(){
        /* 清除相应区域 */
        // 应当根据coords进行清除，而不是直接清除这个9方格，暂时先挖个坑
        ctx.clearRect(this.position.x, this.position.y, spriteSize*this.matrixSize, spriteSize*this          .matrixSize);
    },
    draw(){
        /* 绘制新图像 */
        let position = this.position,
            size = spriteSize,
            matrixSize = this.matrixSize;

        this.clear();

        for (let i = 0,row = this.coords.length; i < row; ++i){
            for (let j = 0,col=this.coords[i].length; j < col; ++j){
                if (this.coords[i][j] == 1){
                    ctx.fillStyle = "#000";
                    ctx.fillRect(position.x + size*j, position.y+size*i, size, size);
                }else {
                    ctx.fillStyle = "#ccc";
                    ctx.fillRect(position.x + size*j, position.y+size*i, size, size);
                }
            }
        }
    },
    _getSize(){


        // 获取元素的实际宽度
        let wMax = 0;
        for (let i = 0, len = this.coords.length; i< len; i ++){
            let count = 0;
            for (let j = 0; j < len; ++j){
                if (this.coords[i][j] == 1){
                    count++;
                    if (count > wMax) {
                        wMax = count
                    }
                }
            }
        }

        // 获取元素的宽度
        this.size.w = wMax*spriteSize;


    },
    // 边界检测
    _checkBoundary(){
        let x = canvasWidth  - this.size.w;
        let y = canvasHeight - this.size.h;


        // 右侧临界点
        if (this.position.x > x - spriteSize) {
            this.position.x = x;
            this.draw();
            return keyRight;
        }


    },

    // 接口
    init() {
        /* 初始化 */
        // 设置尺寸
        this._getSize();
        this.draw();

        // 由于操作时单次按键而不是连续按键，因此使用定时器而不是requestAnimationFrame()
        let _that = this;

        // 下落
        // update();
        function update() {
            _that.clear();
            _that.down();
            _that.draw();
            if (!_that.isBottom()){
                setTimeout(update, _that.speed);
            }

        }

        document.addEventListener("keyup", function (e) {

            let boundary = _that._checkBoundary();
            let keyCode = e.keyCode;

            if (boundary == keyCode){
                e.preventDefault();
                return ;
            }

            _that.clear();
            switch (keyCode){
                case keySpace:
                    _that.transform();
                    break;
                case keyLeft:
                    _that.left();
                    break;
                case keyUp:
                    console.log("⊙﹏⊙b汗，怎么能够往上面跑呢~~");
                    break;
                case keyRight:
                    _that.right();
                    break;
                case keyDown:
                    _that.down();
                    break;
            }
            _that.draw();
        }, false);
    },
    // 位移
    left(){
        this.position.x -= spriteSize;
    },
    right(){
        this.position.x += spriteSize;
    },
    down(){
        this.position.y += spriteSize;
        let y = canvasHeight - this.matrixSize*spriteSize;
        if (this.position.y > y){
            this.position.y = y;
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

        let w = this.size.w;
        this.size.w = this.size.h;
        this.size.w = w;
        // this._getSize();
    },
    // 边界检测，这里存在BUG
    // 需要剔除数组中多余的占位符0
    isBottom(){
        let y = canvasHeight - this.matrixSize*spriteSize;
        if (this.position.y > y){
            this.position.y = y;
            return true;
        }
    }
};

/**
 * 画布
 */
function Tetris() {
    this.sprite = new Sprite();
    this.keyDown = {};

    this.init = function () {
        let sprite = this.sprite;
        sprite.init();
    }
}

