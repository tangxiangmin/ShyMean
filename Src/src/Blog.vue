<template>
    <div id="blog" v-cloak>
        <main :class="['main',{'active':showAside}]">
            <blog-header></blog-header>
            <router-view></router-view>
            <blog-footer></blog-footer>
        </main>
      <blog-aside @aside="toggleAside" :catalogue="catalogue"></blog-aside>
        <!--<popup type="loading" :show="isLoading"></popup>-->
    </div>
</template>

<script>
    import blogHeader from './components/Header';
    import blogFooter from './components/Footer';
    import blogAside from './components/Aside';

    let components = {blogHeader, blogFooter, blogAside};

    export default {
        name: 'blog',
        components: components,
        data:function(){
            return {
                catalogue: [] ,
                showAside: false,
                isLoading: false
            };
        },
        methods:{
            toggleAside:function () {
                this.showAside = !this.showAside;
            },
            article: function (catalogue) {
                this.$set(this,'catalogue',catalogue);
            }
        },
        watch:{
            $route: function (to,from) {
                document.body.scrollTop = 0;

                if (to.name != 'articleDetail'){
                    this.catalogue = [];
                }
            }
        }
    }
</script>

<style>
    @import "./assets/fonts/iconfont.css";
    @import "./assets/css/home.css";

</style>
