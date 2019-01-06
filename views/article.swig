{% extends './layout.swig' %}


{% block seo %}
    <title>{{ article.title }}_shymean</title>
    <meta name="keywords" content="{{ article.tags.join(",") }},{{ article.categories.join(",") }},shymean,橙红年代,前端开发,博客">
    <meta name="description" content="{{ article.abstract }}">
{% endblock %}

{% block main %}
    {% include "../public/view/article.swig" %}
{% endblock %}
