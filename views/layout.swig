<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="robots" content="all">
    <meta name="googlebot" content="all">
    <meta name="baiduspider" content="all">
    <meta name="renderer" content="webkit">

    {% block seo %}
        <title>橙红年代</title>
        <meta name="Description" content="Author: shymean, Category: IT Blog, Name: 橙红年代">
        <meta name="keywords" content="shymean,橙红年代,前端开发,个人博客,HTML,CSS,JavaScript">
        <meta name="describle" content="shymean前端开发个人博客,专注web前端、后端开发技术，总结工作经历及心得。">
    {% endblock seo %}
    <link rel="shortcut icon" href="/favicon.ico">

    <link rel="stylesheet" href="//at.alicdn.com/t/font_213036_i5ygl1uyx3q.css">

    {% block css %}{% endblock css %}

    {# 引入systemjs #}
    <script type="systemjs-packagemap">
        {
          "packages": {
            "swig": "//cdn.bootcss.com/swig/1.4.2/swig.js",
            "jquery": "//cdn.bootcss.com/jquery/3.2.1/jquery.min.js",
            "av": "//cdn1.lncld.net/static/js/3.0.4/av-min.js",
            "Valine": "//unpkg.com/valine/dist/Valine.min.js",
            "L2Dwidget": "//cdn.jsdelivr.net/npm/live2d-widget@3.x/lib/L2Dwidget.min.js"
          }
        }
    </script>
    <script src="//cdn.bootcss.com/systemjs/2.1.1/system.js"></script>

    <link rel="stylesheet" href="{{ staticResource.css }}">
    <script src="{{ staticResource.js }}" defer></script>
    {#<script src="/lib/L2Dwidget.min.js"></script>#}
</head>
<body>

<div id="blog" class="page page-theme-base">

    {% include './_partial/header.swig' %}

    <main class="page_mn">
        <div class="container animated" id="page_wrap">
            {% block main %}
            {% endblock %}

        </div>
        <div class="page_loading">
            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </main>

    {% include './_partial/aside.swig' %}
    {% include './_partial/footer.swig' %}

</div>

</body>
</html>
