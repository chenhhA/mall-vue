<template>
    <van-nav-bar
            style="background-color: #fafafa"
            @click-left="onClickLeft">
        <!--左侧返回主页-->
        <van-icon name="arrow-left" slot="left"/>
        <!--显示当前路径名称-->
        <span name="title" slot="title" >{{routerName}}</span>

    </van-nav-bar>
</template>

<script>
    export default {
        name: "ReturnTopNav",
        computed:{
            routerName: function () {
                return this.$router.currentRoute.name;
            }
        },
        methods:{
            onClickLeft() {
                this.$router.go(-1) // 回退到上一个页面
            },
            onClickRight(){
                let redirectUrl = this.$router.currentRoute.path
                this.$router.push({path: '/search',query: {redirect: redirectUrl}})
            },
            onClickCart(){
                this.$router.push("/cart");
            }
        },
    }
</script>

<style scoped>

</style>
