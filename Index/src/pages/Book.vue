<template>
    <div class="container book">
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
<style lang="scss" rel="stylesheet/scss">
    @import "../style/_import";
    .book {
        font-size: 16px;
    }
    .table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;
        th,td {
            @include border;
            padding: 10px;
        }
        a {
            color: $basecolor;
        }
    }
   
</style>
<script>
    import { getBooks } from "@/api/book"
    
    import xm from '@/base/function'
    
    export default{
        data(){
            return{
                books: [],
            }
        },
        mounted(){
            getBooks().then(books=>{
                this.books = books;
            })
        },
        methods: {
            status(val){
                return val && val[0] === "#" ? `<a href="${val}">读书笔记</a>` : val
            },
        },
        filters:{
            dateFormat: function (val) {
                return val === '0' ? "至今" : xm.dateFormat(val);
            },
           
        },
    }
</script>
