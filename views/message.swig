{% extends "layout.swig" %}

 {% block seo %}
     <title>留言板_shymean</title>
     <meta name="keywords" content="留言板,留言,橙红年代,shymean">
     <meta name="describle" content="此页面为shymean博客的留言板，用于记录访客的留言。">
 {% endblock seo %}

{% block main %}

    {% include "../public/view/message.swig" %}

{% endblock %}
