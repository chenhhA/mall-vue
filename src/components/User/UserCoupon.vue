<template>
    <div>
        <van-cell-group>
            <van-cell title="我的优惠券" isLink>
                <span @click="$router.push({path: '/user/coupon',query: {type: 'all'}})" class="text-desc">全部优惠券</span>
            </van-cell>
        </van-cell-group>

        <van-row class="coupon_status">
            <van-col span="8">
                <div class="coupon_status_icon" @click="$router.push({path: '/user/coupon',query: {type: 'unused'}})">
                    <van-icon name="coupon" />
                </div>
                <div>待使用</div>
            </van-col>
            <van-col span="8">
                <div class="coupon_status_icon" @click="$router.push({path: '/user/coupon', query: {type: 'used'}})">
                    <van-icon name="coupon-used" class-prefix="my-icon"/>
                </div>
                <div>已使用</div>
            </van-col>
            <van-col span="8">
                <div class="coupon_status_icon" @click="$router.push({path: '/user/coupon', query: {type:'expired'}})">
                    <van-icon name="coupon-due" class-prefix="my-icon"/>
                </div>
                <div>过期关闭</div>
            </van-col>
        </van-row>

    </div>
</template>

<script scoped lang="scss">
    export default {
        name: "UserCoupon"
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixin';
    .coupon_status {
        background-color: #fff;
        text-align: center;
        padding: 10px 0;
        font-size: 12px;

    > div {
    @include one-border;
    &::after {
         top: 50%;
         left: 50%;
         border-bottom: 0;
         border-right: 1px solid $border-color;
         height: 150%;
         transform: scale(0.5) translate3d(-50%, -50%, 0);
         transform-origin: 0 0;
     }
    &:last-child::after {
         border: 0;
     }
    }

    .coupon_status_icon {
        position: relative;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: inline-block;
    i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        font-size: 24px;
        color: #000;
    }
    }
    }
</style>
