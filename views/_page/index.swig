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
            {{ post.abstract | raw | marked }}
        </div>
        <div class="article_ft">

            <a href="/article/{{ post.title }}" class="hover-highlight">阅读全文
            </a>
        </div>
    </article>
{% endfor %}

<nav class="pagination"><!---->
    {#<div class="pagination_item">#}
    {#<a href="/1" class="pagination_link"><i class="iconfont icon-back"></i></a>#}
    {#</div>#}
    {#分页后面再处理#}
    {% for i in [1,2,3,4,5,6,7,8,9,10] %}

        <div class="pagination_item {% if page == i %} pagination_current {% endif %}">
            <a href="/{{ i }}" class="pagination_link">{{ i }}</a>
        </div>
        {#<div class="pagination_item"><span class="pagination_space">...</span></div>#}

        {#<div class="pagination_item"><a href="/2" class="pagination_link"><i class="iconfont icon-forward"></i></a>#}
    {% endfor %}
    </div>
</nav>