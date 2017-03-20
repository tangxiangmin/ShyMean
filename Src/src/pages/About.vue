<template>
    <div class="container">
        <div class="about">
            <section>
                <header class="about_hd">
                    <h3 class="about_tt">关于我</h3>
                    <div>
                        <span class="btn btn-border btn-sm">钳工</span>
                        <span class="btn btn-border btn-sm">码农</span>
                        <span class="btn btn-border btn-sm">假前端</span>
                        <span class="btn btn-border btn-sm">90后</span>
                        <span class="btn btn-border btn-sm">95前</span>
                        <span class="btn btn-border btn-sm">游戏宅</span>
                        <span class="btn btn-border btn-sm">胖子</span>
                    </div>
                </header>
                <div class="about_ct">
                    初识如管中窥豹，可见一斑； <br>
                    继而抽丝拨茧，却是剪不断理还乱； <br>
                    长路漫漫，一往无前，终将拨开云雾见青天。<br>
                </div>
            </section>
            <section>
                <h3 class="about_hd">关于博客</h3>
                <div class="about_ct">
                    <p>版权声明：自由转载-非商用-保持署名。</p>
                    <p>本站文章均为本人原创，参考文章我都会在文中进行声明，也请您转载时附上署名。</p>
                    <p>本站前端基于<a href="http://cn.vuejs.org/">Vue</a>搭建，后台使用PHP，主题参考<a href="http://theme-next.iissnan.com/">Next</a>，项目托管在<a href="https://github.com/tangxiangmin/ShyMean">github</a>，请多多指教。</p>
                </div>
            </section>
        </div>
        
    </div>
</template>
<style scoped lang="scss" rel="stylesheet/scss">
    @import "../style/_import";
    .btn {
        cursor: default;
    }
    .about_hd {
        margin-bottom: 1rem;
    }
    .about_tt {
        margin-bottom: 5px;
    }
    .about_ct {
        font-size: 16px;
    }

    a {
        color: $blue;
        text-decoration: underline;
        &:hover {
            color: darken($blue, 10%);
        }
    }
</style>
<script>
    export default{
        data(){
            return{
               
            }
        },
        
    }
</script>
