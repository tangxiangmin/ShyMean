<template>
    <div class="popup" v-show="show">
        <div class="loading" v-if="type == 'loading'">
            <div class="loading_dot"></div>
            <div class="loading_dot"></div>
            <div class="loading_dot"></div>
        </div>
    </div>
</template>
<script>
    export default{
        name: "popup",
        props: ['type', 'show'],
    }
</script>
<style>

</style>
