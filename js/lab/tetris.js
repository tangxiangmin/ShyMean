// 元素形状
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
    [
        [0,1,1],
        [1,1,0],
    ]
    // [
    //     [1,1,0],
    //     [0,1,0],
    //     [0,1,1],
    // ],
];


// canvas 相关
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
 */
function Sprite(activeRange) {
    // 随机形状
    let shape = shapes[Math.floor(Math.random()*shapes.length)];

    this.coords = shape;
    this.size = spriteSize;
    this.w = shape[0].length;
    this.h = shape.length;

    this.speed = 500;

    // 随机位置, -2防止溢出

    // 方块的初始坐标
    this.col = Math.floor(Math.random()*(col-3));
    this.row = 0;

    // 方块偏移原点的距离
    this.x = this.col *this.size;
    this.y = this.row * this.size;

    // 根据方块在画布中的位置动态改变，限制元素的活动范围
    this.activeRange = activeRange;
    this.activeWidth = [0,0];
    this.activeHeight = [0,0];

    // 是否到达底部
    this.isDie = false;
}

Sprite.prototype = {
    constructor: Sprite,
    init() {

        // 初始化活动范围
        this.setActiveRange(this.activeRange);

        // 绘制
        this.draw();

    },
    clear(){
        // 应当根据coords进行清除，而不是直接清除这个9方格，暂时先挖个坑
        for (let i = 0,row = this.h; i < row; ++i){
            for (let j = 0,col= this.w; j < col; ++j){
                if (this.coords[i][j] == 1){
                    ctx.clearRect(this.x + this.size*j, this.y+this.size*i, this.size, this.size);
                }
            }
        }
    },
    draw(){
        for (let i = 0,row = this.h; i < row; ++i){
            for (let j = 0,col= this.w; j < col; ++j){
                if (this.coords[i][j] == 1){
                    ctx.fillStyle = "#000";
                    ctx.fillRect(this.x + this.size*j, this.y+this.size*i, this.size, this.size);
                }
                // else {
                //     ctx.fillStyle = "#ccc";
                //     ctx.fillRect(this.x + this.size*j, this.y+this.size*i, this.size, this.size);
                // }
            }
        }
    },
    setActiveRange(activeRange){
        activeRange = activeRange || this.activeRange;

        let xRange = activeRange[0];
        let xStart = xRange[0];
        let xEnd = xRange[1] - this.getWidth();
        this.activeWidth = [xStart,xEnd];

        this.setActiveHeight(activeRange[1]);
        // let yRange = activeRange[1];
        // let yStart = yRange[0];
        // let yEnd = yRange[1] - this.getHeight();
        // this.activeHeight = [yStart,yEnd];
    },
    setActiveHeight(yRange){
        // console.log(yRange);
        let yStart = yRange[0];
        let yEnd = yRange[1] - this.getHeight();
        this.activeHeight = [yStart,yEnd];
    },

    getWidth(){
        return this.size*this.w;
    },
    getHeight(){
        return this.size*this.h;
    },
    getCol(){
        return this.x / this.size;
    },
    getRow(){
        return this.y / this.size;
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

        this.clear();
        this.coords = tmp;

        // 长宽切换
        let w = this.w;
        this.w = this.h;
        this.h = w;

        // 调整active的范围防止在侧边旁转换时溢出

        this.setActiveRange();
        if (this.x  >= this.activeWidth[1] ) {
            this.x = this.activeWidth[1];
        }else if (this.x - this.size < this.activeWidth[0]) {
            this.x = this.activeWidth[0];
        }

        this.draw();
    },
    left(){
        this.clear();

        if (this.x - this.size < this.activeWidth[0]) {
            this.x = this.activeWidth[0];
        }else {
            this.x -= this.size;
        }

        this.draw();
    },
    right(){
        this.clear();

        if (this.x  >= this.activeWidth[1] ) {
            this.x = this.activeWidth[1];
        }else {
            this.x += this.size;
        }

        this.draw();
    },
    up(){
        console.log("%c⊙﹏⊙b汗，怎么能够往上面跑~~这个秘籍我还没写呢","color:green");
    },
    down(){
        this.clear();

        if (this.y >= this.activeHeight[1]){
            this.y = this.activeHeight[1];
            this.isDie = true;
        }else {
            this.y += this.size;
        }

        this.draw();
    },
};

/**
 * 画布
 */
function Tetris() {

    this.sprite = null;
    this.col = canvasWidth / spriteSize;
    this.row = canvasHeight / spriteSize;

    this.box = [];
    this.activeRange = [
        [0,canvasWidth],
        [0,canvasHeight]
    ];

    // 设置范围
    this.minHeight = canvasHeight/spriteSize;
    // 得分
    this.score = 0;

    // 暂停
    this.pause = false;
}

Tetris.prototype = {
    constructor:Tetris,
    // 入口
    init(){
        // 初始化容器
        for (let i = 0; i < this.row; ++i) {
            this.box.push([]);
            for (let j = 0; j < this.col; ++j){
                this.box[i][j] = 0;
            }
        }

        // 创建方块，监听时间，执行
        this.createSprite()
            .listen()
            .start();
    },
    // 方法
    createSprite(){
        this.sprite = new Sprite(this.activeRange);
        this.sprite.init();
        return this;
    },
    listen(){
        let _that = this;
        document.addEventListener("keyup", function (e) {
            let keyCode = e.keyCode;
            switch (keyCode){
                case keySpace:
                    _that.sprite.transform();
                    break;
                case keyLeft:
                    _that.sprite.left();
                    break;
                case keyUp:
                    _that.sprite.up();
                    break;
                case keyRight:
                    _that.sprite.right();
                    break;
                case keyDown:
                    _that.sprite.down();
                    break;
            }

        }, false);

        return this;
    },
    start(){
        let _that = this;
        update();
        function update() {
            _that.checkBoundary();
            _that.sprite.down();

            if (_that.sprite.isDie){
                _that.toEnd();
            }

            setTimeout(update, _that.sprite.speed);
        }
    },
    checkBoundary(){
        let sprite = this.sprite;
        let row = sprite.getRow();
        let col = sprite.getCol();

        // 计算停止位置
        // 画布中最高的和方块中最低的，差值最小的就是距离最小的，也就是应该根据这一列做计算作为设置范围的参数
        let spriteColArr = [],
            boxColArr = [];

        let w = sprite.w,
            h1 = sprite.h,
            h2 = this.row;


        for (let i = 0; i < w; ++i){
            for (let j = h1 - 1; j >=0; --j){
                if (sprite.coords[j][i] == 1){
                    spriteColArr[i] = j;
                    break;
                }
            }

            boxColArr[i] = h2;

            for (let k = h1 + row; k < h2; ++k){
                if (this.box[k][col+ i] == 1){
                    boxColArr[i] = k;

                    // 底部不为空表示存在空隙
                    if (spriteColArr[i] != h1 -1) {
                        // console.log("特殊");
                        boxColArr[i] += (h1 - 1) - spriteColArr[i];
                    }
                    break;
                }
            }
        }



        // 找到最小的高度作为限制
        let minHeight =  Math.min.apply(null,boxColArr);
        let stopCol = boxColArr.indexOf(minHeight);
        if (this.box[row + 2][stopCol + col] == 1) {
            console.log("停下");
            this.sprite.isDie = true;
        }else {
            // 由于并不能向上移动，因此竖直方向上的范围只判断最下方位置
            let activeHeight = [0, minHeight * sprite.size];
            this.sprite.setActiveHeight(activeHeight);
            if (activeHeight == h1*sprite.size) {
                console.log("gameover")
            }
        }

    },
    toEnd(){
        let sprite = this.sprite;
        let row = sprite.getRow();
        let col = sprite.getCol();

        // 将方块的坐标存放在画布中
        for (let i = 0; i < sprite.h; ++i){
            for (let j = 0; j < sprite.w; ++j){
                if (sprite.coords[i][j] == 1) {
                    this.box[row + i][col + j] = 1;
                }
            }
        }
        this.update();
    },
    update(){
        let removeRow = [];
        for (let i = 0; i < this.row; ++i){
            for (let j = 0; j < this.col; ++j){
                // 如果这一行存在0则无法消除，直接检查下一行;
                if (this.box[i][j] == 0){
                    break ;
                }

                // 如果这一行全部为1，则表示可以直接进行消除
                if (j == this.col - 1){
                    removeRow.push(i);
                }
            }
        }

        if (removeRow.length > 0){
            // 重绘整个画布
            this.repaint (removeRow);

            // 增加分数
            this.addScore(removeRow.length);
        }

        // 新增方块
        this.createSprite();
    },
    repaint(removeRow){
        // 删除整行
        for (let i = 0, len = removeRow.length; i < len; ++i){
            this.box.splice(removeRow[i] - i, 1);
        }

        let sprite = this.sprite;

        // 清除区域
        // 这里可以优化，只clearRect需要删除的行，后面再搞
        let row = this.box.length;
        let col = this.box[0].length;
        ctx.clearRect(0, (this.row - row)*spriteSize, canvasWidth, canvasHeight);

        // 用0填充被删除的元素
        for (let i = 0, len = removeRow.length; i < len; ++i){
            let tmp = [];
            for (let j = 0; j < this.col; ++j) {
                tmp[j] = 0;
            }
            this.box.unshift(tmp);
        }

        // 重新绘制
        let size = sprite.size;
        for (let i = 0; i < this.row; ++i){
            for (let j = 0; j < this.col; ++j){
                let x = size * j,
                    y = size * i;
                if (this.box[i][j] == 1) {
                    ctx.fillRect(x, y, size, size);
                }
            }
        }
    },
    addScore(score){
        this.score += score;
        console.log("当前得分: " + this.score);
    },

};
