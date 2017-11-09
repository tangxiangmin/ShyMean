{% extends "./layout.swig" %}

{% block main %}

<div class="archives">
    <div class="archives_count">OK!目前共计 {{ total }} 篇日志。继续努力。</div>
    {% for group in articleGroup %}
    <section>
        <div class="archives_title"><strong>{{ group.year }}</strong></div>
        {% for item in group.articles %}
        <div class="archives_item">
            <a href="/article/{{ item.title }}" class="archives_link">
                <span class="archives_date">{{ item.created_at | date("Y-m-d") }}</span>
                {{ item.title }}
            </a>
        </div>
        {% endfor %}
    </section>
    {% endfor %}
</div>

{% endblock %}