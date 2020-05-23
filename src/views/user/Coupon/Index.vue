<template>
    <div>
        <van-tabs v-model="activeName">
            <van-tab title="所有" name="all">
                <van-field
                        v-model="code"
                        center
                        clearable
                        placeholder="请输入兑换码">
                    <template #button>
                        <van-button size="small"
                                    @click="onClickExchange"
                                    type="primary">兑换
                        </van-button>
                    </template>
                </van-field>

                <!--                未使用的优惠券列表-->
                <van-divider>未使用</van-divider>

                <coupon-card
                        :type="2"
                        :coupon="userCoupon.coupon"
                        v-for="userCoupon in coupons"
                        v-if="userCoupon.isUsed == false && userCoupon.coupon.status==0">
                </coupon-card>

                <!--                已使用的优惠券列表-->


                <van-divider>已使用</van-divider>

                <coupon-card
                        v-for="userCoupon in coupons"
                        :coupon="userCoupon.coupon"
                        v-if="userCoupon.isUsed === true">
                </coupon-card>

                <!--                已过期的优惠券列表-->

                <van-divider>已过期</van-divider>

                <coupon-card
                        v-for="userCoupon in coupons"
                        :coupon="userCoupon.coupon"
                        v-if="userCoupon.isUsed  === false && userCoupon.coupon.status=='1'">
                </coupon-card>

                <van-divide/>
            </van-tab>

            <van-tab title="已使用" name="used">

                <van-field
                        v-model="code"
                        center
                        clearable
                        placeholder="请输入兑换码">
                    <template #button>
                        <van-button size="small" type="primary">兑换</van-button>
                    </template>
                </van-field>

                <coupon-card
                        v-for="userCoupon in coupons"
                        :coupon="userCoupon.coupon"
                        v-if="userCoupon.isUsed === true">
                </coupon-card>

            </van-tab>
            <van-tab title="未使用" name="unused">

                <van-field
                        v-model="code"
                        center
                        clearable
                        placeholder="请输入兑换码">
                    <template #button>
                        <van-button size="small" type="primary">兑换</van-button>
                    </template>
                </van-field>

                <coupon-card
                        :type="2"
                        :coupon="userCoupon.coupon"
                        v-for="userCoupon in coupons"
                        v-if="userCoupon.isUsed == false && userCoupon.coupon.status==0">
                </coupon-card>
            </van-tab>
            <van-tab title="已过期" name="expired">

                <van-field
                        v-model="code"
                        center
                        clearable
                        placeholder="请输入兑换码">
                    <template #button>
                        <van-button size="small" type="primary">兑换</van-button>
                    </template>
                </van-field>

                <coupon-card
                        v-for="userCoupon in coupons"
                        :coupon="userCoupon.coupon"
                        v-if="userCoupon.isUsed  === false && userCoupon.coupon.status=='1'">
                </coupon-card>
            </van-tab>

        </van-tabs>
    </div>
</template>

<script>
    import {exchangeCoupon, queryUserOwnCoupon} from "../../../api/api";
    import CouponCard from "../../../components/CouponCard";

    export default {
        name: "Index",
        components: {CouponCard},
        data() {
            return {
                activeName: '',
                code: '',
                coupons: [], // 拥有所有优惠券

            }
        },
        methods: {
            loadData() {
                queryUserOwnCoupon().then(resp => {
                    if (resp) {
                        this.coupons = resp;
                    }
                })
            },
            onClickExchange() {
                exchangeCoupon(this.code).then(resp => {
                    if (resp) {
                        this.loadData();

                    }
                })
            }
        },
        created() {
            this.activeName = this.$route.query.type;
            this.loadData();
        }

    }
</script>

<style scoped>

    start-end-time {
        font-size: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>
