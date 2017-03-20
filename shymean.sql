
-- 文章表，包含文章的基本信息
CREATE TABLE shymean_article(
  id int(10) unsigned NOT NULL PRIMARY KEY auto_increment,
  title varchar (255) NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  category varchar(30) NOT NULL DEFAULT '',
  tags varchar(30) NOT NULL DEFAULT '',
  status tinyint(1) NOT NULL DEFAULT 1,
  comment_id int(20) NOT NULL DEFAULT 0,
  created_at int(11) NOT NULL DEFAULT 0,
  updated_at int(11) NOT NULL DEFAULT 0
);

-- 实验室条目列表
CREATE TABLE shymean_lab(
    name VARCHAR(30) NOT NULL PRIMARY KEY,
    path VARCHAR(60) NOT NULL,
    created_at INT(11) NOT NULL DEFAULT 0,
    updated_at INT(11) NOT NULL DEFAULT 0,
    introduce VARCHAR(100) NOT NULL DEFAULT ''
);

-- 书架
CREATE TABLE shymean_book (
  id int(10) unsigned NOT NULL PRIMARY KEY auto_increment,
  name varchar (255) NOT NULL DEFAULT '',
  category varchar(30) NOT NULL DEFAULT '',
  status VARCHAR(100) NOT NULL DEFAULT '',
  created_at int(11) NOT NULL DEFAULT 0,
  updated_at int(11) NOT NULL DEFAULT 0,
  ended_at int(11) not null default 0
)