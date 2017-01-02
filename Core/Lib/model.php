<?php
/**
 * 模型类
 */
namespace Core\Lib;
class Model {
    public $tablename="";
    public $fieldname="*";
    public $conn;
    public $where;
    public $sql;

    public function __construct($tablename){
        $dsn = Conf::get('db','DSN');
        $username = Conf::get('db','USERNAME');
        $passwd = Conf::get('db','PASSWD');

        // 连接数据库
        try{
            $this->conn = new \PDO($dsn,$username,$passwd,array(\PDO::ATTR_PERSISTENT => true));
            $this->conn->exec("SET NAMES 'utf8';"); //设置数据库字符编码
            $this->tablename = $tablename;
        }catch (\PDOException $e){
            dd($e->getMessage());
        }
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
    // 查询
    public function select(){
        $rows = $this->conn->query(" SELECT ".$this->fieldname." FROM ".$this->tablename.$this->where);
        return $rows->fetchAll();
    }
    // 查询一条数据
    public function find(){
        $rows = $this->conn->query(' SELECT '.$this->fieldname." FROM ".$this->tablename.$this->where);
        return $rows->fetch();
    }

    // 增加一条记录
    public function insert($data){
        $keysql = "";
        $valuesql = "";
        foreach($data as $key=>$value){
            $keysql .= ",`$key` ";
            $valuesql .= ", '$value' ";
        }
        $keysql = substr($keysql,1);
        $valuesql = substr($valuesql,1);
        $nums = $this->conn->exec(" INSERT INTO ".$this->tablename." ($keysql) VALUES ($valuesql)");
        return $this->conn->lastInsertId();
    }


    // 删除一条数据
    // 必须显示设定where才能进行删除操作，否则操作无效
    public  function delete(){
        if (empty($this->where)) {
            dd('没有设置where啊~~~找死啊~~~');
        }

        $nums = $this->conn->exec(" DELETE FROM ".$this->tablename.$this->where);
        return $nums;
    }

    // 修改一条数据
    public function update($data){
        if ($this->where == ""){
            return 0;
        }
        $keysql = "";
        foreach($data as $key => $value){
            $keysql .= ",`$key` = '$value'";
        }
        $keysql = substr($keysql,1);

        $nums = $this->conn->exec(" UPDATE ".$this->tablename." SET ".$keysql.$this->where);

        return $nums;
    }

    // 常用方法
    public function getAll(){
        return $this->select();
    }
}