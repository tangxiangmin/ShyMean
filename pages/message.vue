{{{{raw}}}}
<template>
    <div class="container">
        <div id="SOHUCS" sid="请将此处替换为配置SourceID的语句" v-html="changyanTpl"></div>
    </div>
</template>
{{{{/raw}}}}

<script>
    export default {
        mounted(){
            // 由于是自动生成路由 因此没找到重定向的配置 只能暂时这么处理
            const scriptID = "J_changyanSrcipt"
            if (!document.getElementById(scriptID)){
                let changyanSrcipt = document.createElement("script");
                changyanSrcipt.src = "https://changyan.sohu.com/upload/changyan.js";
                changyanSrcipt.id = scriptID;

                changyanSrcipt.onload = function () {
                    changyan.api.config({
                        appid: 'cyt6VyDws',
                        conf: 'prod_0c399ea5f3cc9a3cae8a9fdf7820aabb'
                    });
                };
                document.body.appendChild(changyanSrcipt);
                
            }else {
                this.changyanTpl = this.$store.state.changyanTpl;
            }
        },
        data(){
            return {
                changyanTpl: ""
            }
        },
        destroyed(){
            let html = document.getElementById("SOHUCS").innerHTML;
            
            this.$store.commit("setChangyanTpl", html);
        },
    
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
