// 贪吃蛇
const spriteSize = 30;

//常量
const keyLeft = 37;
const keyRight = 39;
const keyUp = 38;
const keyDown = 40;
const keySpace = 32;

// 精灵类
class Sprite{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.dir = 'down';

        this.size = spriteSize;
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
        this.clear();
        this.update();
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

        //this.print();
        this.draw();

    }
    // 移动
    left(){
        this.head.x--;
        this.head.dir = "left";

    }
    right(){
        this.head.x++;
        this.head.dir = "right";
    }
    up(){
        this.head.y--;
        this.head.dir = "up";
    }
    down(){
        this.head.y++;
        this.head.dir = "down";
    }
    // 克隆节点
    update(){
        console.log("show update");
        // 这里需要一个深拷贝
        let tmp = Object.assign([],this.node);

        for (let i = 1; i < this.length; ++i){
            let cur = this.node[i],
                prev = tmp[i - 1];
            tmp[i] = cur;
            console.log("第" + (i -1) + " 个 : ");
            console.log(prev);

            console.log("第" + i + " 个:");
            console.log(cur);
            cur.dir = prev.dir;
            cur.x = prev.x;
            cur.y = prev.y;
        }
    }
    // 获得食物
    add(){
        let last = this.node[this.length - 1];
        let x,y;
        switch (this.head.dir){
            case "left":
                x = last.x + 1;
                y = last.y;
                break;
            case "up":
                x = last.x;
                y = last.y + 1;
                break;
            case "right":
                x = last.x - 1;
                y = last.y;
                break;
            case "down":
                x = last.x;
                y = last.y - 1;
                break;
            default:
                console.log("添加节点出BUG啦~");
        }

        let node = new Sprite(x,y);
        node.bgColor = "#ccc";
        node.dir = this.head.dir;

        this.node.push(node);
        this.length++;
        console.log("add");
        node.draw();
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

        this.init()
            .listen();
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
            snake.move(e.keyCode);
            _that.checkEat();
        });

        return this;
    }
    checkEat(){
        let head = this.snake.head;
        let food = this.food;
        if (head.x == food.x && head.y == food.y){
            console.log("eat---------");
            this.snake.add();
            food.reset();
        }
    }
}