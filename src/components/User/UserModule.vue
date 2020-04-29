<template>
    <div class="user_module">
        <van-cell-group>
            <van-cell class-prefix="my-icon" name="shoucang" title="我的收藏" to="/user/collect" isLink/>
            <van-cell class-prefix="my-icon" name="shoucang" title="我的足迹" to="/user/footprint" isLink/>
            <van-cell class-prefix="my-icon" name="dingwei" title="收货地址" to="/address/list" isLink/>
            <van-cell icon="records" title="意见反馈" to="/user/feedback" isLink/>
            <van-cell class-prefix="my-icon" name="kefu" title="帮助中心" to="/user/help" isLink/>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "UserModule"
    }
</script>

<style scoped>
    .user_module {
        background-color: #fff;
    }
</style>
