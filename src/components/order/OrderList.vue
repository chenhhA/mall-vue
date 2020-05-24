<template>
    <div class="main-container">

        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多订单了"
                @load="loadData">

<!--            根据查询到的orders循环渲染各个订单 -->
            <van-cell-group class="order-card"
                            v-for="order in orders">
                <!--            订单栏顶部,展示订单编号,订单状态-->
                <div>
                    <span class="order-title-left">
                        订单编号: {{order.orderSn}}
                    </span>
                        <span class="order-title-right">
                        {{orderStatusText[order.orderStatus-1]}}
                    </span>
                </div>
                <br/>

                <van-divider/>

<!--                订单预览 点击转入订单详情-->
                <div @click="onClickOrderCard(order.id)">
                    <van-card
                            v-for="orderItem in order.orderItems"
                            :num="orderItem.number"
                            :price="orderItem.price"
                            :title="orderItem.productName"
                            :thumb="orderItem.picUrl">
<!--                        <template #tags>-->
<!--                            <van-tag-->
<!--                                    style="margin-right: 5px"-->
<!--                                    v-for="tag in orderItem.specifications"-->
<!--                                    plain type="danger">{{tag}}-->
<!--                            </van-tag>-->
<!--                        </template>-->
                        <div slot="desc">
                            <div class="van-card__desc">
                                <van-tag plain style="margin-right:6px;" v-for="sp in orderItem.specifications">
                                    {{sp}}
                                </van-tag>
                                <br/>
                                {{orderItem.productDesc.substr(0,13) + '...'}}
                            </div>
                        </div>
                    </van-card>
                </div>

                <!--            <br/>-->
                <div>
                <span class="order-price-right">
                    总价¥{{order.productPrice}},¥优惠{{order.couponPrice}},¥实付款{{order.actualPrice}}
                </span>
                </div>

                <div class="clear-fix"></div>


                <ButtonGroup
                        @onComment="addComment(order.id)"
                        @onConfirm="onConfirm(order.id)"
                        @onCancel="onCancel(order.id)"
                        @onDelete="onDelete(order.id)"
                        :order="order">

                </ButtonGroup>

                <div class="clear-fix"></div>
            </van-cell-group>

        </van-list>
    </div>
</template>

<script>
    import ButtonGroup from "./ButtonGroup";
    import {queryOrder} from "../../api/api";
    import {Toast} from "vant";
    import order from "../../router/order";

    export default {
        name: "OrderList",
        components: {ButtonGroup},
        props: {
            orderStatus: [Number],
        },
        data() {
            return {
                //订单状态 1->待付款，2->待发货->,3->待收货，4->待评价，5->已完成,6->已关闭"
                orderStatusText: ['待付款', '待发货', '待收货', '待评价', '已完成', '已关闭'],
                orders: [],
                finished: false,
                loading: true,
                page: {
                    size: 6,
                    pageNum: 1,
                },
            }
        },
        methods: {
            loadData() {
                queryOrder(this.page.pageNum, this.page.size, this.orderStatus).then(resp => {
                    if (resp.length > 0) {
                        this.orders = this.orders.concat(resp);
                        this.loading = false;
                        this.page.pageNum += 1;
                    } else {
                        this.loading = false;
                        this.finished = true;
                    }
                })
            },
            addComment(id) {
                this.$router.push(`/order/info/${id}`);
            },
            onClickOrderCard(id) {
                this.$router.push(`/order/info/${id}`)
            },
            onConfirm(id){
                console.log("confirm" + id);
                this.orders.forEach(item=>{
                    if (item.id == id) {
                        item.orderStatus = 4;
                        Toast("确认收货成功");
                    }
                })
            },

            onCancel(id){
                console.log("cancel" + id)
                this.orders.forEach(item=>{
                    if (item.id == id) {
                        item.orderStatus = 6;
                        Toast("已取消");
                    }
                })
            },
            onDelete(id){
                this.loadData();
            }
        },
        created() {
            this.loadData();
        }
    }
</script>

<style scoped>
    .order-card {
        border-radius: 12px;
        padding: 20px 10px;
        margin-bottom: 10px;
    }

    .main-container {
        padding-right: 10px;
        padding-left: 10px;
        padding-top: 10px;
    }

    .order-title-left {
        float: left;
    }

    .order-title-right {
        float: right;
    }

    .order-price-right {
        float: right;
        font-size: 12px;
    }

    .clear-fix{
        clear:both;
    }
</style>
