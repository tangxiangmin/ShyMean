<aside>
    <div class="page_sd hide-md">
        <div class="tab">
            {% if catalogue %}
            <ul class="tab_nav">
                <li class="tab_item active" data-target="#J_toc">
                    文章目录
                </li>
                <li class="tab_item" data-target="#J_profile">
                    站点资料
                </li>
            </ul>
            <div class="tab_panel active" id="J_toc">
                {% include "catalogue.swig" %}
            </div>
            {% endif %}

            <div class="tab_panel {% if !catalogue %} active {% endif %} " id="J_profile">
                <div>
                    <div class="me">
                        <img src="/public/dist/img/avatar.jpg" alt="shymean" width="100" height="100">
                        <h3>shymean</h3>
                        <p>一个不学无术且无趣的人。</p>
                    </div>
                    <div class="nav-border">
                        <a href="/book" class="nav_item">
                            <i class="iconfont icon-bookshelf"></i>
                            <br>书架
                        </a>
                        <a href="/message" class="nav_item">
                            <i class="iconfont icon-comment"></i>
                            <br>留言
                        </a>
                        <a href="/about" class="nav_item">
                            <i class="iconfont icon-info"></i>
                            <br>关于
                        </a>
                        <a href="/friend" class="nav_item">
                            <i class="iconfont icon-blog"></i>
                            <br>友链
                        </a>
                    </div>
                    <div class="contact">
                        <a href="https://github.com/tangxiangmin" target="_blank" class="contact_link">
                            <i class="iconfont icon-github"></i> GitHub</a>
                        <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=645234650&amp;site=qq&amp;menu=yes"
                            target="_blank" class="contact_link">
                            <i class="iconfont icon-qq"></i> QQ</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="tool">
        <div class="btn-list hide-md" id="J_toggleSide">
            <div class="btn-icon">
                <span class="btn-line"></span>
                <span class="btn-line"></span>
                <span class="btn-line"></span>
            </div>
        </div>
        <div class="btn-top">
            <i class="iconfont icon-top"></i>
        </div>
    </div>
</aside>