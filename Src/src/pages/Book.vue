<template>
    <div class="container">
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
                <tr>
                    <td>1</td>
                    <td>HTTP权威指南</td>
                    <td>2017-01-03</td>
                    <td>2017-03-05</td>
                    <td>50%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    @import "../style/_import";
    .table {
        width: 100%;
        font-size: 16px;
        text-align: center;
        border-collapse: collapse;
        th,td {
            @include border;
            padding: 10px;
        }
    }
   
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
    }
</script>
