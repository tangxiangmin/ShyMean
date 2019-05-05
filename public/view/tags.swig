<div class="classify">
    <div class="classify_hd">
        当前共 {{ categories.length }} 个分类
    </div>
    <div class="category">
        {% for cate in categories %}
            <a href="/archive/{{ cate.name }}" title="{{ cate.name }}" class="category_item">
                {{ cate.name }}
                ({{ cate.num }})
            </a>
        {% endfor %}
    </div>
</div>


<div class="classify">
    <div class="classify_hd">
        当前共 {{ tags.length }} 个标签
    </div>
    <div class="tag">
        {% for tag in tags %}
            <a href="/archive/{{ tag.name }}" title="{{ tag.name }}" class="hover-highlight tag_item {{ tag.num | tagSize }}">
                {{ tag.name}}
            </a>
        {% endfor %}
    </div>
</div>
