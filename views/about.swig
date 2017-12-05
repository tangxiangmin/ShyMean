{% extends "layout.swig"%}

 {% block seo %}
     <title>关于_shymean</title>
     <meta name="keywords" content="个人简介,关于博客,橙红年代,shymean">
     <meta name="describle" content="此页面介绍了shymean博客的相关信息，包括关于我、关于博客、关于橙红年代以及版权声明的信息。">
 {% endblock seo %}

{% block main %}
    {% include "./_page/about.swig" %}
{% endblock %}