
<div class="container">
    <p>共计阅读{{ books.length }}本书。</p>
    <table class="table">
        <thead>
        <tr>
            <th>编号</th>
            <th>书名</th>
            <th>开始日期</th>
            <th>结束日期</th>
            <th>状态</th>
        </tr>
        </thead>
        <tbody>
        {% for book in books %}
            <tr>
                <td>{{ loop.index }}</td>
                <td>{{book.name}}</td>
                <td>{{(book.created_at*1000) |　date("Y-m-d") }}</td>
                <td>{{(book.ended_at*1000) |　date("Y-m-d") }}</td>
                <td>
                    {% if book.status %}
                        <a href="{{ book.status }} ">读书笔记</a>
                    {% endif %}
                </td>
            </tr>
        {% endfor %}
        </tbody>
    </table>
</div>