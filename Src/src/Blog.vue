<template>
    <div id="blog" v-cloak>
        <main :class="['main',{'active':showAside}]">
            <blog-header></blog-header>
            <router-view></router-view>
            <blog-footer></blog-footer>
        </main>
      <blog-aside @aside="toggleAside"></blog-aside>
      <popup type="loading" :show="isLoading"></popup>
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
                isLoading: false
            };
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

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "./style/_import";

    .main {
        position: relative;
        @include transition;
        
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
