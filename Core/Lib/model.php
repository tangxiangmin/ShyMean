<?php
/**
 * 模型类
 */
namespace Core\Lib;
class Model {
    private $tablename="";
    private $fieldname="*";
    private $pdo;
    private $where;
    private $sql;

    public function __construct($tablename){
        $dsn = Conf::get('db','DSN');
        $username = Conf::get('db','USERNAME');
        $passwd = Conf::get('db','PASSWD');

        // 连接数据库
        try{
            $this->pdo = new \PDO($dsn,$username,$passwd,array(\PDO::ATTR_PERSISTENT => true));
//            $this->conn->exec("SET NAMES 'utf8';"); //设置数据库字符编码

            $this->setTableName($tablename);
        }catch (\PDOException $e){
           die($e);
        }
    }

    public function setTableName($tablename){
        $this->tablename = $tablename;
    }

    // 设置条件查询
    public function where($where){
        $this->where = " WHERE ".$where;
        return $this;
    }

    // 设置字段
    public function field($field){
        $this->fieldname = $field;
        return $this;
    }
    // 设置表名
    public  function settable($tablename){
        $this->tablename = $tablename;
        return $this;
    }
    // 执行sql语句
    public function query($sql){
        $res = $this->conn->query($sql);
        return $res->fetchAll();
    }

    // CURD

}