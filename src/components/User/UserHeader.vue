<template>
    <div class="user_header" :style="{backgroundImage: `url(${background_image})`}">
        <van-icon name="setting-o" class="user_set"
                  @click="toSetting"/>
        <div class="user_avatar">
            <img :src="userInfo.avatar" alt="头像" width="55" height="55">
        </div>
        <div>{{userInfo.nickname}}</div>
    </div>
</template>

<script>
    import bg_default from '@/assets/images/user_head_bg.png';

    export default {
        name: "UserHeader",
        data(){
            return{
                userInfo:{},
                background_image: bg_default

            }
        },
        created() {
            this.userInfo = this.$store.state.userInfo;
        },
        methods:{
            toSetting(){
                this.$router.push("/user/info");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user_header {
        background-repeat: no-repeat;
        background-size: cover;
        height: 130px;
        text-align: center;
        color: #fff;
        padding-top: 30px;
    }

    .user_set {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 24px;
    }
    .user_avatar {
        margin-bottom: 10px;
    img {
        border: 0;
        border-radius: 50%;
    }
    }
</style>
