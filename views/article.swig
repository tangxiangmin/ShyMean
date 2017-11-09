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
                <a href="" class="hover-highlight">{{ cate.name }}</a>
            {% endfor %}

        </div>
    </header>
    <div class="article_ct">
        {{ article.content | raw }}
    </div>
    <footer class="article_ft">
        {% for tag in article.tags %}
        <a href="" class="article_tag">#{{ tag.name }}</a>
        {% endfor %}
    </footer>

    <div class="article_nav">
        <a href="/article/mockjs使用心得" class="hover-highlight article_prev">mockjs使用心得</a>
        <a href="/article/博客SSR实践总结" class="hover-highlight article_next">博客SSR实践总结</a>
    </div>
</article>
{% endblock %}