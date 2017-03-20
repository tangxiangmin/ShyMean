<template>
    <div class="container">
        <nav class="nav-square row">
            <div class="col-xs-6 col-sm-3 nav_item " v-for="item in items">
                <div class="square ">
                    <a href="javascript:;" class="square_inner nav_link">
                        <i class="iconfont icon-lab nav_icon"></i>
                        <span>实验</span>
                    </a>
                </div>
            </div>
           
        </nav>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss">
   @import "../style/import";
   $labcolor: $purple;
   $blogcolor: $yellow;
   $bookcolor: $green;
   $infocolor: $blue;

   $indexcolor: ($labcolor $blogcolor $bookcolor $infocolor);

   %hover-scale {
       @include box-shadow;
       @include transition(all .2s ease);
       &:hover {
           @include transform(scale(1.05));
           @include box-shadow(0 0 4px 4px rgba(0,0,0,0.1));
       }
   }

   %hover-underline {
       position: relative;
       &:after {
           content: '';
           position: absolute;
           left: 0;
           bottom: -3px;
           height: 2px;
           width: 100%;
           background: currentcolor;
           transform: scaleX(0);
           @include transition(all ease .2s);
       }
       &:hover:after {
           transform: scaleX(1);
       }
   }

   // 正方形的导航项
   .nav-square {
       padding: rem(10);
    
    
       .nav_item {
           padding: 15px;
           &:hover {
               @each $color in $indexcolor{
                   &:nth-of-type(#{index($indexcolor,$color)}){
                       color: $color;
                   }
               }
           }
       }
    
       .nav_link {
           padding: 20px;
        
           @extend %hover-scale;
           @extend %hover-underline;
        
           @include fx;
           @include fx-cross(center);
           @include fx-main(space-around);
           @include fx-dir(column);
       }
    
       .nav_icon {
           line-height: 1.25;
           font-size: 2.5rem;
       }
   }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue',
                items:[1,2,3,4]
            }
        },
        
      
    }
</script>
