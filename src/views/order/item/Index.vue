<template>
    <div>
        <div class="split-line">
        </div>

        <!--        订单收货地址-->
        <div class="address-info mg-bottom">
            <van-row class="address-name">
                <van-col span="4">{{order.receiverName}}</van-col>
                <van-col span="8" offset="2">{{order.receiverTel}}</van-col>
            </van-row>
            <van-row class="address-detail-text">
                <van-col span:24>
                    {{order.receiverProvince}}{{order.receiverCity}}{{order.receiverRegion}}{{order.receiverDetailAddress}}
                </van-col>
            </van-row>
        </div>

<!--        物流信息预览-->
        <van-cell-group class="mg-bottom" @click="onClickExpressInfo" v-if="expressInfo != null">
            <van-cell class="van-ellipsis"
                      :title="lastExpressTrace.AcceptStation"
                      :label="lastExpressTrace.AcceptTime"/>
        </van-cell-group>
        <!--        订单状态 1->待付款，2->待发货->,3->待收货，4->待评价，5->已完成,6->已关闭-->

        <van-steps :active="order.orderStatus-1" class="mg-bottom">
            <van-step>买家下单</van-step>
            <van-step>买家付款</van-step>
            <van-step>商家发货</van-step>
            <van-step>买家收货</van-step>
            <van-step>交易完成</van-step>
        </van-steps>

        <!--        订单中商品项-->

        <van-cell-group class="mg-bottom order-item-list">


            <van-cell>
                <span class="item-title-name">商品清单</span>
                <span class="item-title-status">{{orderStatusText[order.orderStatus-1]}}</span>
            </van-cell>
            <van-card
                    v-for="product in order.orderItems"
                    :num="product.number"
                    :price="product.price"
                    :title="product.productName"
                    :thumb="product.picUrl">
                <div slot="desc">
                    <div class="van-card__desc">
                        <van-tag plain style="margin-right:6px;" v-for="sp in product.specifications">
                            {{sp}}
                        </van-tag>
                        <br/>
                        {{product.productDesc.substr(0,13) + '...'}}
                    </div>
                </div>
            </van-card>

            <van-divider/>

            <div>
                <button-group
                        @onConfirm="onConfirm"
                        @onCancel="onCancel"
                        @onDelete="onDelete"
                        :express-info="expressInfo"
                        :order="order">

                </button-group>
            </div>
            <div class="clear-fix">

            </div>


        </van-cell-group>

        <van-cell-group class="mg-bottom">
            <van-cell center title="备注" :label="order.message"/>
        </van-cell-group>
        <!--        订单信息展示cell-->
        <van-cell-group class="mg-bottom">
            <van-cell title="商品总价" :value="formatPrice(order.productPrice)"/>
            <van-cell title="优惠金额" :value="formatPrice(order.couponPrice)"/>
            <van-cell title="运费" :value="formatPrice(order.freightPrice)"/>
            <van-cell title="实际金额" :value="formatPrice(order.actualPrice)"/>
        </van-cell-group>
    </div>
</template>

<script>
    import ButtonGroup from "../../../components/order/ButtonGroup";
    import {queryOrderById} from "../../../api/api";

    export default {
        name: "Index",
        components: {ButtonGroup},
        data() {
            return {
                orderStatusText: ['待付款', '待发货', '待收货', '待评价', '已完成', '已关闭'],
                expressInfo: {},
                order: {},
                orderId: '',
            }
        }
        ,
        methods: {
            loadData() {
                console.log("load!");
                queryOrderById(this.orderId).then(resp=>{
                    if (resp) {
                        this.order = resp.order;
                        this.expressInfo = resp.expressInfo;
                    }
                })
            },
            onClickExpressInfo() {
                this.$router.push("/order/traces?orderId=" + this.orderId);
            },
            onConfirm() {
                this.order.orderStatus = 4;
            },
            onCancel() {
                this.order.orderStatus = 6;
            },
            onDelete() {
                this.$router.push("/order/list")
            }


        },
        created() {
            this.orderId = this.$route.params.id;
            this.loadData();
        },
        computed: {
            lastExpressTrace: function () {
                return this.expressInfo.Traces[this.expressInfo.Traces.length - 1];
            }
        }


    }
</script>

<style scoped>
    .split-line {
        background: url(//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-67880192dc.png?imageView&type=webp) repeat-x;
        height: 5px;
    }

    .address-info {
        padding: 15px 10px 20px 20px;
        background-color: #fffced;
    }

    .address-detail-text {
        color: #7F7F7F;
        margin-top: 10px;
        font-size: 12px;
    }

    .address-name {
        font-size: 15px
    }

    .mg-bottom {
        margin-bottom: 10px;
    }

    .item-title-status {
        color: #DD1A21;
        float: right;
    }

    .item-title-name {
        float: left;
    }

    .order-item-list {
        padding-bottom: 10px;
    }

    .clear-fix {
        clear: both;
    }
</style>
