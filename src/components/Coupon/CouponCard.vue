<template>
    <div>
        <van-cell-group style="border-radius: 20px"
                        class="mg-bottom"
                        v-for="userCoupon in coupons"
                        v-if="userCoupon.isUsed == false && userCoupon.coupon.status==0">
            <van-row class="coupon-item" :gutter="20">
                <van-col span="6" >
                        <span class="dicount-price">
                            {{userCoupon.coupon.discount}}元
                        </span>
                </van-col>
                <van-col span="14">
                        <span class="coupon-name">
                            {{userCoupon.coupon.name}}
                            <van-tag v-if="userCoupon.coupon.useType=='0'">全场通用</van-tag>
                            <van-tag v-if="userCoupon.coupon.useType=='1'">限定商品使用</van-tag>
                            <van-tag v-if="userCoupon.coupon.useType=='2'">限定分类使用</van-tag>
                        </span>
                    <br/>
                    <span class="discount-text">
                                  满{{userCoupon.coupon.min}}减{{userCoupon.coupon.discount}}元
                        </span>
                    <br/>
                    <span class="start-end-time">
                                                    {{userCoupon.coupon.startTime| formatDate}} - {{userCoupon.coupon.endTime| formatDate}}
                        </span>
                </van-col>
            </van-row>

            <van-divider style="margin-top: 5px; margin-bottom: 5px"/>
            <van-row  class="coupon-desc">
                <van-col span="20" >
                    {{userCoupon.coupon.desc}}
                </van-col>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: "CouponCard",
        props:'userCoupon'
    }
</script>

<style scoped>

</style>
