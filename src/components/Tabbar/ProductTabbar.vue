<template>
    <van-row class="bottom-nav">
        <van-col>
            <van-button icon="chat-o" type="default" />
        </van-col>
        <van-col>
            <van-button type="default">
                立即购买
            </van-button>
        </van-col>
        <van-col>
            <van-button type="danger">
                加入购物车
            </van-button>
        </van-col>
    </van-row>
</template>

<script>
    export default {
        name: "ProductTabbar"
    }
</script>

<style scoped>
.bottom-nav{
    position:fixed;
    bottom:0px;
}
</style>
