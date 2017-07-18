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

    import axios from  '~plugins/axios';
    
    export default {
        name: 'blog',
        components: { blogHeader, blogFooter, blogAside },
        data: function () {
            return {
                showAside: false,
            };
        },
        mounted(){
            this.saveIP();
        },
        methods: {
            toggleAside: function () {
                this.showAside = !this.showAside;
            },
            saveIP(){
                const RECOGNIZE = "recognize";

                if (!sessionStorage.getItem(RECOGNIZE)){
                    let referrer = document.referrer || "";
                    axios.get(`/api/visitor`, {
                        params: {
                            referrer
                        }
                    }).then(res=>{
                        let { data } = res;
                        if (data.status === 200){
                            sessionStorage.setItem(RECOGNIZE, 1);
                        }
                    })
                }
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">


</style>
