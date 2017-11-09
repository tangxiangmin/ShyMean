{% extends './layout.swig' %}

{% block main %}
    {%  for post in articles %}
        <article class="article">
        <h2 class="article_hd">
            <a href="/article/{{ post.title }}" class="article_tt">
                {{ post.title }}
            </a>
        </h2>
        <div class="article_info">
            <span class="hide-sm">发表于</span>
            <span class="show-sm">
                <i class="iconfont icon-archives"></i>
            </span>{{ post.created_at | date('Y-m-d') }} |
            <span class="hide-sm">分类于</span>
            <span class="show-sm">
                <i class="iconfont icon-tag"></i>
            </span>
            {% for cate in post.categories %}
            <a href="/archive/{{ cate }}" class="hover-highlight">{{ cate }}</a>
            {% endfor %}
        </div>
        <div class="article_ct">
            {{ post.abstract | raw }}
        </div>
        <div class="article_ft">

            <a href="<%- 123 %>#more" class="hover-highlight">阅读全文
            </a>
        </div>
    </article>
    {% endfor %}

    {% include "./_partial/pagination.swig" %}
{% endblock %}