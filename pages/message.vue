{{{{raw}}}}
<template>
    <div class="container" id="J_msgBoard">
        <div id="SOHUCS" sid="请将此处替换为配置SourceID的语句"></div>
    </div>
</template>
{{{{/raw}}}}

<script>
    export default {
        mounted(){
            // 由于是自动生成路由 因此没找到重定向的配置 只能暂时这么处理
            this.changyanSrcipt = document.createElement("script");
            this.changyanSrcipt.src = "https://changyan.sohu.com/upload/changyan.js";

            this.changyanSrcipt.onload = function () {
                changyan.api.config({
                    appid: 'cyt6VyDws',
                    conf: 'prod_0c399ea5f3cc9a3cae8a9fdf7820aabb'
                });
            };
            
            document.body.appendChild(this.changyanSrcipt);
        },
        data(){
            return {
                changyanSrcipt: null,
            }
        },
        destoryed(){
            // todo 移除畅言节点，避免下次进入页面无效
            this.changyanSrcipt.parentNode.removeChild(this.changyanSrcipt);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
