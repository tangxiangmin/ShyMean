{% extends './layout.swig' %}



 {% block seo %}
     <title>标签_shymean</title>
     <meta name="keywords" content="{{ categories | joinKey("name") }}">
     <meta name="describle" content="此页面用于统计shymean博客文章的分类和标签，用于筛选相关类型的文章">
 {% endblock seo %}

{% block main %}
    {% include './_page/tags.swig' %}
{% endblock %}