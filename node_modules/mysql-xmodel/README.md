xModel
===
> 一个极简的`node-mysql`模型类

## Features
* `Promise`化，告别回调地狱
* 简洁的api，支持链式调用

### todo
* [ ] 格式化数据，如时间戳，数据分组等
* [ ] 事务处理
* [ ] 目前只支持连接单个数据库

### bug
* 异步导致`sql`属性返回值错乱，需要进行调试

## Step
```
npm i mysql-xmodel -S
```
```js
let Model = require("mysql-xmodel");

// 创建连接池
Model.init({
    "host": "localhost",
    "user": "root",
    "password": "123456",
    "database": "shymean",
});

// 实例化模型
let admin = new Model("shymean_admin");
```
## API

### sql
使用`sql`属性获得上一次操作的`SQL`语句
```js
admin.where("id", 1).select(["id", "name", "password"]).then(res=>{
    //  SELECT  `id`, `name`, `password` FROM shymean_admin WHERE id = 1
    console.log(admin.sql)
})
```

### query
执行原始SQL语句
```
admin.query(sql, values).then(res=>{
    // result
})
```

### where
`where(key, logic, value)`用来配置`WHERE`子句，当逻辑操作符是`=`时可省略
```
where("id", 1) // WHERE id = 1
where("id", ">", 1) // WHERE id > 1
```
如果存在多个条件子句，须调用`andWhere(key, logic, value)`或`orWhere(key, logic, value)`
```
andWhere(name, "root"); // AND name = 'root'
orWhere(id, "<", 10); // OR id < 10
```
调用顺序决定了条件的排列顺序。

### select
`select(field)`用来执行`SELECT`操作，`field`参数为需要获取的字段数组，默认为`["*""]`，该方法返回查询结果
```js
admin.select(["id", "name", "password"]).then(res=>{
    // SELECT `id`, `name`, `password` FROM shymean_admin
});

admin.select().then(res=>{
    // SELECT * FROM shymean_admin
});
```

#### distinct
对应`DISTINCT`，去除重复结果
```
admin.distinct().select()
```
#### alias
为模型表设置别名，用于联结查询
```
admin.alias("a"); // shymean_admin AS a
```
#### join
`join(table, key, logic, value)`联结查询：
* `table`为需要联结的表名，如果需要设置别名则直接传入
* `key, logic, value`后续三个参数对应`where`方法参数，用于设置联结条件，同上`logic = '='`时可不传

```js
article.alias("a").join("shymean_article_tag AS t", "a.id", "t.article_id")
       .select(["a.title", "t.tag_id"]).then((res) => {
    //SELECT  `a`.`title`, `t`.`tag_id` FROM shymean_article AS a , shymean_article_tag AS t  WHERE a.id = t.article_id                
});
```
`leftJoin(table, key, logic, value)`和`rightJoin(table, key, logic, value)`参数同上，分别对应左联结和右联结
### groupBy
`groupBy(field)`用于设置分组

###having
`having(key, logic, value)`用于设置分组筛选

### orderBy
`orderBy(field, logic = "DESC")`，用于设置排序，多个排序条件可链式调用
```
admin.orderBy("name").orderBy("id").select()
```
### limit
`limit(num)`限制输出个数

### offset
`offset(num)`，跟`limit(num)`同时使用，用于指定偏移量

### insert
`insert(value)`用来执行`INSERT`操作，`value`参数为一个`JSON`对象，该方法返回`insertId`
```js
admin.insert({ name: "test", password: "1234" }).then((id) => {
    // insertId
});
```
### update
`update(value)`用来执行`UPDATE`操作，`value`参数为一个`JSON`对象，该方法返回`changedRows`。
需要的注意的是为了防止误操作，必须在调用`update()`之前调用`where()`
```js
admin.where("id", 18).update({ name: "test_update", password: "1234" }).then((length) => {
    // changedRows
});
```
### delete
`delete()`用来执行`DELETE`操作，该方法返回`affectedRows`，同上，必须在调用`delete()`之前调用`where()`
```js
admin.where("id", 19).delete().then((length) => {
    // affectedRows
});
```

### 聚集函数
提供了相关聚集函数的快捷方式
* `count()`，返回行数
* `max(field)`，返回对应字段最大值
* `min(field)`，返回对应字段最小值
* `avg(field)`，返回平均值
* `sum(field)`，求和