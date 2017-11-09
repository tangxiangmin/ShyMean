{% extends './layout.swig' %}

{% block main %}
<div class="classify">
    <div class="classify_hd">
        当前共 {{ categories.length }} 个分类
    </div>
    <div class="category">
        {% for cate in categories %}
            <a href="/archive/{{ cate.name }}" class="category_item">
               {{ cate.name }}
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
            {#{% set#}
                {#var fontSize = "",#}
                    {#num = tag.length;#}
                {#if (num <= 2) {#}
                    {#fontSize =  "text-xs";#}
                {#} else if (num > 2 && num <= 5) {#}
                    {#fontSize = "text-sm";#}
                {#} else if (num > 5 && num <= 8) {#}
                    {#fontSize = "text-md"#}
                {#} else {#}
                    {#fontSize = "text-lg";#}
                {#}#}
            {#%>#}
            <a href="/archive/{{ tag.name }}" class="hover-highlight tag_item {{ 'text-xs' }}">
                {{ tag.name }}
            </a>
        {% endfor %}
    </div>
</div>
{% endblock %}