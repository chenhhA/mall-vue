<template>
    <van-nav-bar
            style="background-color: #fafafa"
            @click-left="onClickLeft">
        <!--左侧返回主页-->
        <van-icon name="wap-home-o" slot="left"/>
        <!--显示当前路径名称-->
        <span name="title" slot="title" >{{routerName}}</span>
        <!--搜索-->
        <template #right>
            <van-icon name="search" size="18"
                      style="margin-right: 10px"
                      @click="onClickRight"/>
            <van-icon name="cart-o"  size="18" @click="onClickCart"/>
        </template>

    </van-nav-bar>
</template>

<script>
    export default {
        name: "TopNav",
        computed:{
            routerName: function () {
                return this.$router.currentRoute.name;
            }
        },
        methods:{
            onClickLeft() {
                this.$router.push("/");
            },
            onClickRight(){
                this.$router.push("/search");
            },
            onClickCart(){
                this.$router.push("/cart");
            }
        },
    }
</script>

<style scoped>

</style>
