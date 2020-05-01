<template>
    <div    class="bt-group">
<!--        订单待付款-->
        <div v-if="orderStatus == 1">
            <van-button class="order-button" type="default">付款</van-button>
            <van-button class="order-button" type="danger">取消</van-button>
        </div>
<!--        订单待发货-->
        <div v-if="orderStatus == 2">
            <van-button class="order-button" type="default">提醒发货</van-button>
        </div>

<!--        待收货-->
        <div v-if="orderStatus == 3">
            <van-button class="order-button" type="default">确认收货</van-button>
            <van-button class="order-button" type="default">查看物流</van-button>
        </div>

<!--        待评价-->
        <div v-if="orderStatus == 4">
            <van-button class="order-button" type="default">评价</van-button>
            <van-button class="order-button" type="default">查看物流</van-button >
        </div>

        <!--        已完成-->
        <div v-if="orderStatus == 5">
            <van-button class="order-button" type="default">查看物流</van-button>
            <van-button class="order-button" type="danger">删除</van-button>
        </div>

        <!--        已关闭-->
        <div v-if="orderStatus == 6">
            <van-button class="order-button" type="danger">删除</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ButtonGroup",
        props: {
            orderStatus: [Number],
            orderId:[Number]
        },
        //订单状态 1->待付款，2->待发货->,3->待收货，4->待评价，5->已完成,6->已关闭"
        methods:{
        }
    }
</script>

<style scoped>
.order-button{
    margin-right: 5px;
}
    .bt-group{
        /*float: right;*/
    }

</style>
