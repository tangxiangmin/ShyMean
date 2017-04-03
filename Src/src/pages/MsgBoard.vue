<template>
    <div class="msgboard container">
        <div class="msgboard_hd">
            当前共1108名访客，共11条留言。
        </div>
        <div class="msgboard_bd">
            <div class="msg_item media">
                <div class="media_sd">
                    <img src="../assets/img/head.jpg" alt="" class="media_img">
                </div>
                <div class="media_mn">
                    <div class="media_tt">锚点 <span class="browser">iOS 8.4WebKit 600.1.4</span> </div>
                    <div class="media_ct">真有趣</div>
                    <div class="media_ft">
                        <time>2016-12-22 22:44</time>
                        <span class="fr">回复</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="msgboard_ft">
            <form action="" class="form">
                <div class="form_group">
                    <label class="form_label">昵称</label>
                    <div class="form_item">
                        <input type="text" class="form_input" />
                    </div>
                </div>
                <div class="form_group">
                    <label  class="form_label">您的邮箱</label>
                    <div class="form_item">
                        <input type="text" class="form_input" />
                    </div>
                </div>
                <div class="form_group">
                    <label  class="form_label">个人网址</label>
                    <div class="form_item">
                        <input type="text" class="form_input" />
                    </div>
                </div>
                <div class="form_group">
                    <label  class="form_label">留言内容</label>
                    <div class="form_item">
                        <textarea name="" class="form_textarea">
                        
                        </textarea>
                    </div>
                </div>
                <div class="form_action">
                    <button type="submit" class="btn bg-gray">提交</button>
                </div>
            </form>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../style/_import";
    .msgboard {
        font-size: 16px;
    }
    .msgboard_hd {
        margin-bottom: 2rem;
    }
    .msgboard_ft {
        margin: 2rem 0;
    }
    .msg_item {
    
    }
    .form {
        &_group {
            @include fx;
            margin-bottom: 1rem;
        }
        
        
        &_label {
            display: block;
            width: 6rem;
            margin-right: 1rem;
        }
        &_item {
            @include fx-grow(1);
        }
        &_input, &_textarea {
            width: 100%;
            @include border;
            padding: 5px 10px;
            font-size: 16px;
        }
        &_textarea {
            height: 10rem;
        }
        &_action {
            padding-left: 7rem;
        }
        
    }
</style>
<script>
   
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        
    }
</script>
