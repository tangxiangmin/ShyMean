
<article class="article article-detail">
    <header class="text-center">
        <h2 class="article_hd">{{ article.title }}</h2>
        <div class="article_info">
            <span class="hide-sm">发表于</span>
            <span class="show-sm">
                <i class="iconfont icon-archives"></i>
            </span>
            <time>{{ (article.created_at*1000) | date("Y-m-d") }}</time>
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
    <div class="catalogue hide-md">
        <ul class="catalogue_group">
            {% for h2 in catalogue %}

                <li>
                    <a href="#{{ h2.h2 }}" class="catalogue_item lv1">{{h2.h2}}</a>
                    {% if h2.h3 %}

                        <ul class="catalogue_group">
                            {% for h3 in h2.h3 %}
                                <li>
                                    <a href="#{{ h3.h3 }}" class="catalogue_item lv2">{{ h3.h3 }}</a>
                                    {#{% if h3.h4 %}#}
                                        {#<ul class="catalogue_group" v-if="h3.h4">#}
                                            {#{% for h4 in h3.h4 %}#}
                                                {#<li v-for="h4 in h3.h4">#}
                                                    {#<a href="#{{ h4 }}" @click="goAnchor(h4)" class="catalogue_item lv3">{{h4}}</a>#}
                                                {#</li>#}
                                            {#{% endfor %}#}
                                        {#</ul>#}
                                    {#{% endif %}#}
                                </li>
                            {% endfor %}

                        </ul>

                    {% endif %}
                </li>
            {% endfor %}

        </ul>
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