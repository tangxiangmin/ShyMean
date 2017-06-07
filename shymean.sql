
-- 文章表，包含文章的基本信息
CREATE TABLE shymean_article(
  id int(10) unsigned NOT NULL PRIMARY KEY auto_increment,
  title varchar (255) NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  abstract text NOT NULL DEFAULT '',
  category varchar(30) NOT NULL DEFAULT '',
  tags varchar(30) NOT NULL DEFAULT '',
  status tinyint(1) NOT NULL DEFAULT 1,
  comment_id int(20) NOT NULL DEFAULT 0,
  created_at int(11) NOT NULL DEFAULT 0,
  updated_at int(11) NOT NULL DEFAULT 0,
  browse int(11) NOT NULL DEFAULT 0
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
);

-- 站点统计
CREATE TABLE shymean_site (
  ip VARCHAR(15) NOT NULL DEFAULT '',
  time int(11) NOT NULL DEFAULT 0
)