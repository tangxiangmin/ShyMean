<template>
    <footer class="bg-gray">
        <div class="container footer">
            <p>
                ©Shymean 2016 - {{new Date().getFullYear()}}
            </p>
            <p v-if="msg.sign">{{msg.sign}}</p>
        </div>
    </footer>
</template>
<script>
    export default {
        name: "blog-footer",
        data:function(){
            return {
                msg:{
                    sign:'世人的悲欢并不相通，我只是觉得他们吵闹。'
                }
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../style/_import";
    footer {
        margin-top: 2rem;
    }
    .footer {
        overflow: hidden;
        line-height: 2em;
        font-size: 14px;
    }
</style>
