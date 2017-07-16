<template>
    <div id="blog" :class="['page', 'page-theme-base', showAside?'active':'']" v-cloak>
        <blog-header></blog-header>
        <main class="page_mn" >
            <nuxt />
        </main>
        <blog-aside @aside="toggleAside"></blog-aside>
        <blog-footer></blog-footer>
    </div>
</template>

<script>
    import blogHeader from '~components/Header';
    import blogFooter from '~components/Footer';
    import blogAside from '~components/Aside';

    export default {
        name: 'blog',
        components: { blogHeader, blogFooter, blogAside },
        data: function () {
            return {
                showAside: false,
            };
        },
        methods: {
            toggleAside: function () {
                this.showAside = !this.showAside;
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">


</style>
