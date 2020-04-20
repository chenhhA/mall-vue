<template>
    <div class="user_module">
        <van-cell-group>
            <van-cell icon="shoucang" title="我的收藏" to="/user/collect" isLink/>
            <van-cell icon="shoucang" title="我的足迹" to="/user/footprint" isLink/>
            <van-cell icon="dingwei" title="收货地址" to="/address/list" isLink/>
            <van-cell icon="kefu" title="服务中心" to="/user/server" isLink/>
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
