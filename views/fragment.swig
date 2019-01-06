{% extends './layout.swig' %}

 {% block seo %}
     <title>demo_shymean</title>
     <meta name="keywords" content="fragment,碎片,shymean,橙红年代">
     <meta name="describle" content="此页面统计了shymean博客的fragment">
 {% endblock seo %}

{% block main %}
    {% include "../public/view/fragment.swig" %}
{% endblock %}
