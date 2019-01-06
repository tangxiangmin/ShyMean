{% extends "./layout.swig" %}

 {% block seo %}
     <title>归档_shymean</title>
     <meta name="keywords" content="博客归档,shymean,橙红年代">
     <meta name="describle" content="此页面统计了shymean博客文章的归档记录，用于快速索引文章列表。">
 {% endblock seo %}

{% block main %}

    {% include "../public/view/archive.swig" %}

{% endblock %}
