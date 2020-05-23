<template>

    <div class="coupon-container">
        <van-row>
            <van-col :span="18" class="coupon-left">
                <span class="coupon-name">
                            {{coupon.name}}
                            <van-tag v-if="coupon.useType=='0'">全场通用</van-tag>
                            <van-tag v-if="coupon.useType=='1'">限定商品使用</van-tag>
                            <van-tag v-if="coupon.useType=='2'">限定分类使用</van-tag>
                        </span>
                <br/>
                <span class="coupon-desc">
                                    {{coupon.desc}}
                </span>
                <br/>
                {{coupon.startTime| formatDate}} - {{coupon.endTime| formatDate}}
            </van-col>
            <van-col :span="4"  class="coupon-right" offset="2">
                <span class="flag">
                    ¥
                </span>
                <span class="coupon-discount">
                                    {{coupon.discount}}
                </span>
                <br/>
                <span class="coupon-discount-text">
                                    满{{coupon.min}}元可用
                    <br/>
                    <van-button type="danger"
                                @click="getCoupon"
                                size="mini" v-if="type == 1">
                        领取
                    </van-button>
                    <van-button type="primary"
                                @click="useCoupon"
                                size="mini" v-if="type == 2">
                        使用
                    </van-button>
                </span>

            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "CouponCard",
        props:{
            coupon: [Object],
            type:[Number]  // 1->领取,2->展示
        },
        data() {
            return {
            };
        },
        methods:{
            // 领取优惠券
            getCoupon() {
                this.$emit("onGet");
            },
            // 使用优惠券
            useCoupon() {
                this.$emit("onUse");
            }
        }

    }
</script>

<style scoped>
    .coupon-container{
        background-image: url(../assets/images/9bc039e58cbcbc71.png);
        width: 355px;
        height: 133px;
        margin-left: 5px;
        margin-right: 5px;
        background-repeat:no-repeat;
        background-size: contain;
        padding: 20px 20px 20px 20px;

    }
    .coupon-name{
        font-weight: bold;
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .coupon-desc{
        color: #969799;
        font-size: 12px;
    }

    .coupon-discount{
        color: #ee0a24;
        font-size: 20px
    }
    .flag{
        color: #ee0a24;

    }

    .coupon-discount-text{
        color: #f2270c;

    }
</style>

