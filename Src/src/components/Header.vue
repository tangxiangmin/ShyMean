<template>
  <header class="bg-gray">
    <div class="container header">
      <h1 class="logo">
        <router-link to="/index/1">{{msg.title}}</router-link>
      </h1>
      <div class="show-md">
        <div :class="['btn-list',{close:isActive}]" @click="showNav">
          <div class="btn-icon">
            <span class="btn-line"></span>
            <span class="btn-line"></span>
            <span class="btn-line"></span>
          </div>
        </div>
      </div>
      <nav :class="['nav-responsive',{active:isActive}]">

      </nav>
    </div>
  </header>
</template>

<script>
  export default {
      name:"blog-header",
      data:function(){
          return {
              msg:{
                  title:'橙红年代',
              },
              isActive:false
          }

      },
      watch:{
          $route: function (to) {
              this.isActive = false;
          }
      },
      methods:{
          showNav: function () {
              this.isActive = !this.isActive;
          }
      }
  }
</script>
<style></style>
