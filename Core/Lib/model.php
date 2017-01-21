<?php
/**
 * 模型类
 */
namespace Core\Lib;
class Model {
    private $table="";
    private $field="*";
    private $conn;
    private $where;
    private $sql;

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


    // 设置条件查询
    public function where($where){
        $this->where = " WHERE ".$where;
        return $this;
    }

    // 设置字段
    public function field($field){
        $this->$field = $field;
        return $this;
    }

    // 执行sql语句
    public function query($sql){
        $res = $this->conn->query($sql);
        return $res->fetchAll(\PDO::FETCH_ASSOC);
    }

    // CURD

    public function select(){
        $res = $this->conn->query('SELECT '.$this->field.' FROM '.$this->table);
        return $res->fetchAll(\PDO::FETCH_ASSOC);
    }

}