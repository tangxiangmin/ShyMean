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
<style></style>
