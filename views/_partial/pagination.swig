
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
