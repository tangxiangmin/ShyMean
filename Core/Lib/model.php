<?php
/**
 * 模型类
 */
namespace Core\Lib;
class Model {
    private $table = '';
    private $field = '*';
    private $conn = '';
    private $where = '';
    private $order= '';
    private $distinct= '';

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

    // 执行sql语句
    public function query($sql){
        $res = $this->conn->query($sql);
        return $res->fetchAll(\PDO::FETCH_ASSOC);
    }

    // 拼接sql语句
    public function sql(){
        $sql = 'SELECT '.$this->distinct.$this->field.' FROM '.$this->table.$this->order;
        return $sql;
    }

    // ------------必需子句，主要功能为CURD----------- //

    // 查询
    public function select(){
        $res = $this->conn->query($this->sql());
        return $res->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function selectOne(){
        $res = $this->conn->query($this->sql());
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

    // 设置字段
    public function distinct(){
        $this->distinct = ' DISTINCT ';
        return $this;
    }
    
    // 由于默认升序，这里只需要定义降序
    public function orderBy($filed){
        $this->order = ' ORDER BY '.$filed.' DESC';
        return $this;
    }

}