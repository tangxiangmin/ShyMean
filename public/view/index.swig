{%  for post in articles %}
    <article class="article">
        <h2 class="article_hd">
            <a href="/article/{{ post.title }}" title="{{ post.title }}" class="article_tt">
                {{ post.title }}
            </a>
        </h2>
        <div class="article_info">
            <span class="hide-sm">发表于</span>
            <span class="show-sm">
                <i class="iconfont icon-archives"></i>
            </span><time>{{ post.created_at | date('Y-m-d') }}</time> |
            <span class="hide-sm">分类于</span>
            <span class="show-sm">
                <i class="iconfont icon-tag"></i>
            </span>
            {% for cate in post.categories %}
                <a href="/archive/{{ cate }}" title="{{ cate }}" class="hover-highlight">{{ cate }}</a>
            {% endfor %}
        </div>
        <div class="article_ct">
            {{ post.abstract | raw }}
        </div>
        <div class="article_ft">

            <a href="/article/{{ post.title }}" title="阅读全文" class="hover-highlight">阅读全文
            </a>
        </div>
    </article>
{% endfor %}

<nav class="pagination">

    {{ pagination | raw }}
</nav>