{% extends './layout.swig' %}

{% block main %}
<div class="container">
    {%  for post in articles %}
        <article class="article">
        <h2 class="article_hd">
            <a href="" class="article_tt">
                {{ post.title }}
            </a>
        </h2>
        <div class="article_info">
            <span class="hide-sm">发表于</span>
            <span class="show-sm">
                <i class="iconfont icon-archives"></i>
            </span>2012-01-22 |
            <span class="hide-sm">分类于</span>
            <span class="show-sm">
                <i class="iconfont icon-tag"></i>
            </span>
            <a href="" class="hover-highlight">JavaScript</a>
        </div>
        <div class="article_ct">
            {{ post.abstract }}
        </div>
        <div class="article_ft">

            <a href="<%- 123 %>#more" class="hover-highlight">阅读全文
            </a>
        </div>
    </article>
    {% endfor %}

</div>
{% endblock %}