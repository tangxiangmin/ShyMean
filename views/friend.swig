{% extends './layout.swig' %}

 {% block seo %}
     <title>友情链接_shymean</title>
     <meta name="keywords" content="友情链接,友链,shymean,橙红年代">
     <meta name="describle" content="此页面统计了shymean博客的友情链接，一起学习，共同进步。">
 {% endblock seo %}


{% block main %}
    {% include "./_page/friend.swig" %}
{% endblock %}