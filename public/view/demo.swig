<div class="demo">
    <p>这里整理了编程生涯中一些有趣的业余项目。</p>
    {% for group in demoGroup %}
        <h3>{{ group.name }}</h3>
        <ul class="list-text">
            {% for item in group.list %}
            <li class="list-text_item">
                {{ item.name }}：{{ item.desc }} »

                {% if item.previewUrl %}
                    <a href="{{ item.previewUrl }}" class="text-xs hover-highlight"
                       target="_blank">预览</a>
                {% endif %}

                {% if item.githubUrl %}
                <a href="{{ item.githubUrl }}" class="text-xs hover-highlight"
                   target="_blank">github</a>
                {% endif %}

                {% if item.docUrl %}
                <a href="{{ item.docUrl }}" class="text-xs hover-highlight"> doc</a>
                {% endif %}

            </li>
            {% endfor %}
        </ul>
    {% endfor %}
</div>
