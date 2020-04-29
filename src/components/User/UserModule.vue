<template>
    <div class="user_module">
        <van-cell-group>
            <van-cell icon="bookmark-o" title="我的收藏" to="/user/collect" isLink/>
            <van-cell icon="browsing-history-o" title="我的足迹" to="/user/footprint" isLink/>
            <van-cell icon="contact" title="收货地址" to="/address/list" isLink/>
            <van-cell icon="records" title="意见反馈" to="/user/feedback" isLink/>
            <van-cell icon="question-o" title="帮助中心" to="/user/help" isLink/>
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
