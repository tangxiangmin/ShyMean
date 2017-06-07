<template>
    <div id="blog" v-cloak>
        <main :class="['main',{'active':showAside}]">
            <blog-header></blog-header>
            <router-view></router-view>
            <blog-footer></blog-footer>
        </main>
        <blog-aside @aside="toggleAside"></blog-aside>
        <popup type="loading" :show="loading"></popup>
    </div>
</template>

<script>
    import blogHeader from './pages/Header';
    import blogFooter from './pages/Footer';
    import blogAside from './pages/Aside';
    import popup from './components/Popup'
    
    let components = {blogHeader, blogFooter, blogAside, popup};
    export default {
        name: 'blog',
        components: components,
        data:function(){
            return {
                showAside: false,
            };
        },
      
        computed:{
            loading(){
                return this.$store.state.isLoading;
            }
        },
        methods:{
            toggleAside:function () {
                this.showAside = !this.showAside;
            }
        },
        watch:{
            $route: function (to,from) {
                document.body.scrollTop = 0;
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "./style/_import";

    .main {
        position: relative;
        /* 这里主要是为了让所有页面都保持滚动条，防止页面抖动*/
        min-height: 101vh;
        
        @include transition;
        @include fx;
        @include fx-dir(column);
        & > .container {
            @include fx-grow(2);
        }
        &.active {
            padding-right: 300px;
        }
    }
    
    .page {
        min-height: calc(100vh - 78px - 98px);
        padding-top: rem(200);
        padding-bottom: rem(200);
    }
</style>
