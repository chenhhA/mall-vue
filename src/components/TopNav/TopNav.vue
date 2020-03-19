<template>
    <van-nav-bar
            @click-left="onClickLeft"
            @click-right="onClickRight">
        <!--左侧返回主页-->
        <van-icon name="wap-home-o" slot="left"/>
        <!--显示当前路径名称-->
        <span name="title" slot="title" >{{routerName}}</span>
        <!--搜索-->
        <van-icon name="search"  slot="right" />
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
            }
        },
    }
</script>

<style scoped>

</style>
