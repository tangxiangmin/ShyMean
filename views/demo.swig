{% extends './layout.swig' %}

 {% block seo %}
     <title>代码项目_shymean</title>
     <meta name="keywords" content="demo,友链,shymean,橙红年代">
     <meta name="describle" content="此页面统计了shymean博客的demo">
 {% endblock seo %}

{% block main %}
    {% include "../public/view/demo.swig" %}
{% endblock %}
