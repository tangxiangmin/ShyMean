<?php
/**
 * 模型类
 */
namespace Core\Lib;
class Model {
    private $table = '';
    private $conn = '';
    private $field = '*';
    private $where = '';
    private $order = '';
    private $distinct = '';
    private $group = '';
    private $limit = '';

    public function __construct($tablename){
        $dsn = Conf::get('db','DSN');
        $username = Conf::get('db','USERNAME');
        $passwd = Conf::get('db','PASSWD');

        // 连接数据库
        try{
            $this->conn = new \PDO($dsn,$username,$passwd,array(\PDO::ATTR_PERSISTENT => true));
            $this->conn->exec("SET NAMES 'utf8';"); //设置数据库字符编码
            $this->table = $tablename;

        }catch (\PDOException $e){
           die($e);
        }
    }

    // ------------内部功能方法，执行PDO------------ //

    // 拼接sql语句
    private function setSql(){
        $sql = 'SELECT '.$this->distinct.$this->field.' FROM '.$this->table.$this->where.$this->group.$this->order.$this->limit;
        return $sql;
    }

    // 重置
    public function reset(){
        $this->field = '*';
        $this->where = '';
        $this->order = '';
        $this->distinct = '';
        $this->group = '';
        $this->limit = '';

        return $this;
    }

    // ------------必需子句，主要功能为CURD----------- //

    // 执行sql语句
    public function query($sql){
        $res = $this->conn->query($sql);
        return $res->fetchAll(\PDO::FETCH_ASSOC);
    }

    // 查询
    public function select(){

        $res = $this->conn->query($this->setSql());
        return $res->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function selectOne(){
        $res = $this->conn->query($this->setSql());
        return $res->fetch(\PDO::FETCH_ASSOC);
    }

    // ------------可选子句，用来修饰必选子句------------ //

    // 设置条件查询
    public function where($where){
        $this->where = " WHERE ".$where;
        return $this;
    }

    // 设置字段
    public function field($field){
        $this->field = $field;
        return $this;
    }

    // 去重
    public function distinct(){
        $this->distinct = ' DISTINCT ';
        return $this;
    }

    // 由于默认升序，这里只需要定义降序
    public function orderBy($field){
        $this->order = ' ORDER BY '.$field.' DESC ';
        return $this;
    }

    // 分组
    public function groupBy($field){
        $this->group = ' GROUP BY '.$field;
        return $this;
    }

    // 限制数量
    public function limit($num,$offset){
        $this->limit = ' LIMIT '.$num.' OFFSET '.$offset;
        return $this;
    }

    // ------------聚合函数------------ //
    public function count(){
        $res = $this->field('COUNT(*) AS total')->selectOne();
        $this->reset();
        return $res['total'];
    }
}