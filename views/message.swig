{% extends "layout.swig" %}

 {% block seo %}
     <title>留言板_shymean</title>
     <meta name="keywords" content="留言板,留言,橙红年代,shymean">
     <meta name="describle" content="此页面为shymean博客的留言板，用于记录访客的留言。">
 {% endblock seo %}

{% block main %}

    <div id="SOHUCS" sid="请将此处替换为配置SourceID的语句"></div>
    <script charset="utf-8" type="text/javascript" src="https://changyan.sohu.com/upload/changyan.js" ></script>
    <script type="text/javascript">
        window.changyan.api.config({
            appid: 'cyt6VyDws',
            conf: 'prod_0c399ea5f3cc9a3cae8a9fdf7820aabb'
        });
    </script>
{% endblock %}