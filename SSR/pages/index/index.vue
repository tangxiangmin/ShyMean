{{{{raw}}}}
<template>
    <div class="container">
    
    </div>
</template>
{{{{/raw}}}}

<script>
    export default {
        mounted(){
            // 由于是自动生成路由 因此没找到重定向的配置 只能暂时这么处理
            this.$router.push("/index/1");
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
