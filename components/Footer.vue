<template>
    <footer class="page_ft">
        <div class="container footer">
            <p v-if="msg.sign">{{msg.sign}}</p>
            <p>
                Copyright © Shymean 2016 - {{new Date().getFullYear()}}
                <a style="display: inline-block" href="http://www.miitbeian.gov.cn" rel="nofollow" target="_blank">粤ICP备17060238号-1</a>
            </p>
        </div>
        <div v-html="cnzz"></div>
    </footer>
</template>
<script>
    export default {
        name: "blog-footer",
        data:function(){
            return {
                msg:{
                    sign:'世人的悲欢并不相通，我只是觉得他们吵闹。'
                },
                // 友盟统计代码
                cnzz: '<script src="https://s19.cnzz.com/z_stat.php?id=1264491168&web_id=1264491168" language="JavaScript"><'+ '\/'+ 'script>'
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
