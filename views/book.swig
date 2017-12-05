{% extends "layout.swig" %}


 {% block seo %}
     <title>书架_shymean</title>
     <meta name="keywords" content="书架,shymean,橙红年代">
     <meta name="describle" content="此页面统计了shymean博客已经阅读的技术书籍，包括{{ books | joinKey("name") }}等书籍。">
 {% endblock seo %}

{% block main %}
    {% include "./_page/book.swig" %}
{% endblock %}
