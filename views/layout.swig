<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>橙红年代</title>
    <meta name="keywords" content="shymean,橙红年代,前端开发,个人博客,HTML,CSS,JavaScript">
    <meta name="describle" content="shymean前端开发个人博客,专注web前端、后端开发技术，总结工作经历及心得。">

    <link rel="stylesheet" href="/public/dist/css/blog.css">
    <link rel="stylesheet" href="/public/dist/css/animate.css">
    <link rel="stylesheet" href="/public/dist/fonts/iconfont.css">

    {#<script src="/public/dist/js/require.js" data-main="/public/dist/js/main"></script>#}
    <script src="/public/dist/js/swig.min.js"></script>
    <script src="//cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="/public/dist/js/index.js"></script>
</head>
<body>
<div id="blog" class="page page-theme-base">
    {% include './_partial/header.swig' %}

    <main class="page_mn" >
        <div class="container animated" id="page_wrap">

        {% block main %}
        {% endblock %}
        </div>
    </main>

    {% include './_partial/aside.swig' %}
    {% include './_partial/footer.swig' %}

</div>

</body>
</html>