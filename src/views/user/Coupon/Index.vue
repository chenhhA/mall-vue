<template>
<div>
    <van-tabs v-model="activeName">
        <van-tab title="所有" name="all">
            <van-field
                    v-model="code"
                    center
                    clearable
                    placeholder="请输入兑换码"
            >
                <template #button>
                    <van-button size="small"
                                @click="onClickExchange"
                                type="primary">兑换</van-button>
                </template>
            </van-field>

            <van-divider>未使用</van-divider>
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


            <van-divider>已使用</van-divider>

            <van-cell-group style="border-radius: 20px"
                            v-for="userCoupon in coupons"
                            class="mg-bottom"
                            v-if="userCoupon.isUsed === true">
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

            <van-divider>已过期</van-divider>

            <van-cell-group style="border-radius: 20px"
                            v-for="userCoupon in coupons"
                            class="mg-bottom"
                            v-if="userCoupon.isUsed  === false && userCoupon.coupon.status=='1'">
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

            <van-divide/>
        </van-tab>
        <van-tab title="已使用" name="used">

            <van-field
                    v-model="code"
                    center
                    clearable
                    placeholder="请输入兑换码"
            >
                <template #button>
                    <van-button size="small" type="primary">发送验证码</van-button>
                </template>
            </van-field>

            <van-cell-group style="border-radius: 20px"
                            v-for="userCoupon in coupons"
                            class="mg-bottom"
                            v-if="userCoupon.isUsed === true">
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

        </van-tab>
        <van-tab title="未使用" name="unused">

            <van-field
                    v-model="code"
                    center
                    clearable
                    placeholder="请输入兑换码"
            >
                <template #button>
                    <van-button size="small" type="primary">发送验证码</van-button>
                </template>
            </van-field>

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
        </van-tab>
        <van-tab title="已过期" name="expired">

            <van-field
                    v-model="code"
                    center
                    clearable
                    placeholder="请输入兑换码"
            >
                <template #button>
                    <van-button size="small" type="primary">发送验证码</van-button>
                </template>
            </van-field>

            <van-cell-group style="border-radius: 20px"
                            v-for="userCoupon in coupons"
                            class="mg-bottom"
                            v-if="userCoupon.isUsed  === false && userCoupon.coupon.status=='1'">
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
        </van-tab>

    </van-tabs>
    <van-cell-group>
        {{this.$route.query.type}}
    </van-cell-group>
</div>
</template>

<script>
    import {exchangeCoupon, queryUserOwnCoupon} from "../../../api/api";

    export default {
        name: "Index",
        data(){
            return{
                activeName:'',
                code:'',
                coupons:[], // 拥有所有优惠券

            }
        },
        methods:{
            loadData(){
                queryUserOwnCoupon().then(resp=>{
                    if (resp) {
                        this.coupons = resp;
                    }
                })
            },
            onClickExchange(){
                exchangeCoupon(this.code).then(resp=>{
                    if (resp) {
                        this.loadData();

                    }
                })
            }
        },
        created() {
            this.activeName=this.$route.query.type;
            this.loadData();
        }

    }
</script>

<style scoped>
.coupon-item{
    border-radius: 20px;
    padding: 20px 25px ;
}
.dicount-price{
    color: #ee0a24;
    font-size: 28px
}

    .coupon-name{
        font-weight: bold;
        font-size: 14px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .mg-bottom{
        margin-bottom: 10px;
    }

.discount-text{
    padding-top: 10px;
    padding-bottom: 10px;
}

.coupon-desc{
    padding: 5px 25px
}
start-end-time{
    font-size: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>
