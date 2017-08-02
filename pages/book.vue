{{{{raw}}}}
<template>
    <div class="container">
        <p>共计阅读{{books.length}}本书。</p>
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
            <tr v-for="(book,index) in books">
                <td>{{index+1}}</td>
                <td>{{book.name}}</td>
                <td>{{book.created_at |　dateFormat}}</td>
                <td>{{book.ended_at | dateFormat}}</td>
                <td v-html="status(book.status)"></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
{{{{/raw}}}}

<script>
    import axios from "~plugins/axios"
    
    export default{
        async asyncData(){
            try {
                let res = await axios.get("/api/books");
                return {
                    books: res.data
                }
            }catch (e){
                console.log(e)
            }
        },
        methods: {
            status(val){
                return val && val[0] === "/" ? `<a href="${val}">读书笔记</a>` : val
            },
        },
        filters:{
            dateFormat: function (val) {
                let date = new Date(val*1000);
                return val === 0 ? "至今" : `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
            },

        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
