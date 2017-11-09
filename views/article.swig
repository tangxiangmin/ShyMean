{% extends './layout.swig' %}

{% block main %}

<article class="article article-detail">
    <header class="text-center">
        <h2 class="article_hd">{{ article.title }}</h2>
        <div class="article_info">
            <span class="hide-sm">发表于</span>
            <span class="show-sm">
                <i class="iconfont icon-archives"></i>
            </span>
            <time>{{ article.created_at | date("Y-m-d") }}</time>
            |
            <span class="hide-sm">分类于</span>
            <span class="show-sm"><i class="iconfont icon-tag"></i></span>
            {% for cate in article.categories %}
                <a href="/archive/{{ cate }}" class="hover-highlight">{{ cate }}</a>
            {% endfor %}

        </div>
    </header>
    <div class="article_ct">
        {{ article.content | raw }}
    </div>
    <footer class="article_ft">
        {% for tag in article.tags %}
        <a href="/archive/{{ tag }}" class="article_tag">#{{ tag }}</a>
        {% endfor %}
    </footer>

    <div class="article_nav">
        <a href="/article/{{ prev.title }}" class="hover-highlight article_prev">{{ prev.title }}</a>
        <a href="/article/{{ next.title }}" class="hover-highlight article_next">{{ next.title }}</a>
    </div>
</article>
{% endblock %}