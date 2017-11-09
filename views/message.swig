{% extends "layout.swig" %}

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