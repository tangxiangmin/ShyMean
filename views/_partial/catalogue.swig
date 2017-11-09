<div class="catalogue">
    <ul class="catalogue_group">
        {% for h2 in catalogue %}

        <li>
            <a href="javascript:;" class="catalogue_item" :title="h2.h2" @click="goAnchor(h2.h2)">{{h2.h2}}</a>
            {% if h2.h3 %}

                <ul class="catalogue_group">
                {% for h3 in h2.h3 %}
                    <li>
                    <a href="javascript:void(0)" :title="h3.h3" @click="goAnchor(h3.h3)" class="catalogue_item">{{ h3.h3 }}</a>
                    {% if h3.h4 %}
                    <ul class="catalogue_group" v-if="h3.h4">
                        {% for h4 in h3.h4 %}
                        <li v-for="h4 in h3.h4">
                            <a href="javascript:void(0)" @click="goAnchor(h4)" :title="h4" class="catalogue_item">{{h4}}</a>
                        </li>
                        {% endfor %}
                    </ul>
                    {% endif %}
                </li>
                {% endfor %}

                </ul>

            {% endif %}
        </li>
        {% endfor %}

    </ul>
</div>