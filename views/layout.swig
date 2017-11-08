<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>橙红年代</title>
    <link rel="stylesheet" href="/public/css/blog.css">
    <link rel="stylesheet" href="/public/fonts/iconfont.css">

    <script src="/public/js/require.js" data-main="/public/js/main"></script>
</head>
<body>
<div id="blog" class="page page-theme-base">
    {% include './_partial/header.swig' %}

    <main class="page_mn" >
        {% block main %}
        {% endblock %}
    </main>

    {% include './_partial/aside.swig' %}
    {% include './_partial/footer.swig' %}

</div>

</body>
</html>