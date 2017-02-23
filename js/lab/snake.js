// 贪吃蛇
const spriteSize = 30;

// 按键
const keyLeft = 37;
const keyRight = 39;
const keyUp = 38;
const keyDown = 40;
const keySpace = 32;

const keyArr = [keyLeft, keyRight, keyUp, keyDown];

// 颜色
const colorArr = ['red','blue','green','yellow','pink'];
const colorNum = colorArr.length;

// 精灵类
class Sprite{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.dir = keyDown;
        this.size = spriteSize;

        // this.randomBgColor();
    }
    draw(){
        ctx.fillStyle = this.bgColor || '#000';

        ctx.fillRect(
            this.x*this.size,
            this.y*this.size,
            this.size,
            this.size);
    }
    clear(){
        ctx.clearRect(
            this.x*this.size,
            this.y*this.size,
            this.size,
            this.size);
    }
    randomBgColor(){

        let color = Math.floor(Math.random()*colorNum);
        this.bgColor = colorArr[color];
    }
}

// 食物类
class Food extends Sprite{
    constructor(col, row){
        super();
        this.col = col;
        this.row = row;
        let x = Math.floor(Math.random()*col),
            y = Math.floor(Math.random()*row);

        this.x = x;
        this.y = y;
        this.bgColor = "red";
    }

    init(){
        this.draw();
    }
    reset(){
        let x = Math.floor(Math.random()*this.col),
            y = Math.floor(Math.random()*this.row);

        this.x = x;
        this.y = y;
        this.draw();
    }
}

// 贪吃蛇
class Snake{
    constructor(x,y){
        this.head = new Sprite(x,y);
        this.length = 1;
        this.node = [this.head];
        this.biteSelf = false;
    }

    init(){
        this.draw();
    }
    clear(){
        this.node.forEach((node)=>{
            node.clear();
        });
    }
    draw(){
        this.node.forEach((node)=>{
            node.draw();
        });
    }
    move(keyCode){
        // 清除画布
        this.clear();
        // 更新节点位置
        this.update();
        // 移动蛇头的位置
        switch (keyCode){
            case keyLeft:
                this.left();
                break;
            case keyUp:
                this.up();
                break;
            case keyRight:
                this.right();
                break;
            case keyDown:
                this.down();
                break;
        }
        // 检测是否咬到自己
        this.cheakBite();

        // 绘制
        this.draw();
    }
    // 移动
    left(){
        this.head.x--;
        this.head.dir = keyLeft;

    }
    right(){
        this.head.x++;
        this.head.dir = keyRight;
    }
    up(){
        this.head.y--;
        this.head.dir = keyUp;
    }
    down(){
        this.head.y++;
        this.head.dir = keyDown;
    }
    // 移动更新节点位置
    update(){
        for (let i = this.length - 1; i > 0; --i){
            let cur = this.node[i],
                prev = this.node[i - 1];
            cur.dir = prev.dir;
            cur.x = prev.x;
            cur.y = prev.y;
        }
    }
    // 获得食物
    add(){
        let last = this.node[this.length - 1];
        // 获取添加节点所需坐标
        let x,y;
        switch (this.head.dir){
            case keyLeft:
                x = last.x + 1;
                y = last.y;
                break;
            case keyUp:
                x = last.x;
                y = last.y + 1;
                break;
            case keyRight:
                x = last.x - 1;
                y = last.y;
                break;
            case keyDown:
                x = last.x;
                y = last.y - 1;
                break;
            default:
                console.log("添加节点出BUG啦~");
        }

        // 增加节点
        let node = new Sprite(x,y);
        node.bgColor = "#ccc";
        node.dir = this.head.dir;

        this.node.push(node);
        this.length++;
        node.draw();
    }
    cheakBite(){
        let head = this.head;
        for (let i = this.length - 1; i > 0; --i){
            let cur = this.node[i];
            if (head.x == cur.x && head.y == cur.y){
                this.biteSelf = true;
                break;
            }
        }
    }
    getBiteSelf(){
        return this.biteSelf;
    }

    print(){
        this.node.forEach((node)=>{
            console.log(node);
        });
        console.log("=============")
    }
}

// 地图类
class Game{
    constructor(){
        this.col = canvasWidth/spriteSize;
        this.row = canvasHeight/spriteSize;

        this.snake = new Snake(this.col/2, this.row/2);
        this.food = new Food(this.col, this.col);

        this.speed = 1000;
        this.isOver = false;

        this.init()
            .listen()
            .start();


    }
    init(){
        // 创建对象
        this.snake.init();
        this.food.init();
        return this;
    }
    listen(){
        let snake = this.snake;
        let _that = this;
        document.addEventListener("keyup", function (e) {
            let keyCode = e.keyCode;

            if (keyArr.indexOf(keyCode) != -1 && !_that.checkNegativeDir(keyCode)){
                snake.move(e.keyCode);
                _that.checkEat();
                _that.checkCrash();
            }

        });
        return this;
    }
    // 自动运行游戏
    start(){
        let snake = this.snake;
        let dir = snake.head.dir;
        let _that = this;

        snake.move(dir);
        this.checkEat();
        this.checkCrash();

        if (!this.isOver) {
            setTimeout(function () {
                _that.start();

            },_that.speed);
        }
    }
    // 按键反方向检测
    checkNegativeDir(keyCode){
        // 初始时可以控制任意方向
        if (this.snake.length == 1) {
            return false;
        }

        // 检测按键
        let dir = this.snake.head.dir;
        if ((keyCode == keyLeft && dir == keyRight) ||
            (keyCode == keyRight && dir == keyLeft) ||
            (keyCode == keyUp && dir == keyDown) ||
            (keyCode == keyDown && dir == keyUp)){
            return true;
        }
    }
    // 食物检测
    checkEat(){
        let head = this.snake.head;
        let food = this.food;
        if (head.x == food.x && head.y == food.y){
            this.snake.add();
            food.reset();
        }
    }
    // 碰撞检测
    checkCrash(){
        let head = this.snake.head;
        let biteSelf = this.snake.getBiteSelf();
        // 检测自身碰撞和边界碰撞
        if (biteSelf || head.x < 0 || head.x > this.col || head.y < 0 || head.y > this.row){
            this.gameover();
        }
    }
    // 游戏结束
    gameover(){
        this.isOver = true;
        ctx.clearRect(0, 0, canvasWidth,canvasHeight);
        ctx.font = '20px';
        ctx.textAlign = 'center';
        ctx.fillText("游戏结束，得分" + this.snake.length, canvasWidth/2, canvasHeight/2);
    }
}