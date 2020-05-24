<template>
<!--    根据订单的状态,渲染不同的按钮组-->
    <div    class="bt-group">
<!--        订单待付款-->
        <div v-if="order.orderStatus == 1">
            <van-button class="order-button" type="default" @click="onClickPay" size="small">付款</van-button>
            <van-button class="order-button" type="danger" @click="onClickCancel" size="small">取消</van-button>
        </div>
<!--        订单待发货-->
        <div v-if="order.orderStatus == 2">
            <van-button class="order-button" type="default" @click="onClickNotify" size="small">提醒发货</van-button>
        </div>

<!--        待收货-->
        <div v-if="order.orderStatus == 3">
            <van-button class="order-button" type="primary" @click="onClickConfirm" size="small">确认收货</van-button>
            <van-button class="order-button" type="default" @click="onClickExpress" size="small">查看物流</van-button>
        </div>

<!--        待评价-->
        <div v-if="order.orderStatus == 4" type="primary">
            <van-button class="order-button" type="default" @click="onClickComment" size="small">评价</van-button>
            <van-button class="order-button" type="default" @click="onClickExpress" size="small">查看物流</van-button >
        </div>

        <!--        已完成-->
        <div v-if="order.orderStatus == 5">
            <van-button class="order-button" type="default" @click="onClickExpress" size="small">查看物流</van-button>
            <van-button class="order-button" type="primary" @click="onShowComment" size="small">查看评价</van-button>
        </div>

        <!--        已关闭-->
        <div v-if="order.orderStatus == 6">
            <van-button class="order-button" type="danger" @click="onClickDelete" size="small">删除</van-button>
        </div>
    </div>
</template>

<script>
    import {Toast} from "vant";
    import {cancelOrder, confirmOrder, deleteOrder} from "../../api/api";

    export default {
        name: "ButtonGroup",
        props: {
            order:[Object],
        },
        //订单状态 1->待付款，2->待发货->,3->待收货，4->待评价，5->已完成,6->已关闭"
        methods:{
            // 点击提醒发货
            onClickNotify(){
                Toast('已提醒商家发货');
            },
            // 点击支付
            onClickPay(){
                this.$store.commit("setOrder", this.order)
                this.$router.push("/order/pay");
            },
            // 点击确认收货
            onClickConfirm(){
                // this.$emit("onConfirm"); // 触发父组件事件

                confirmOrder(this.order.id).then(resp=>{
                    console.log(resp);
                    if (resp) {
                        this.$emit("onConfirm"); // 触发父组件事件
                    }
                })
            },
            // 点击取消订单(完成)
            onClickCancel(){
                cancelOrder(this.order.id).then(resp=>{
                    if (resp){
                        this.$emit("onCancel") // 触发父组件事件
                    }
                })
            },
            // 点击查询物流信息(完成)
            onClickExpress(){
                this.$router.push(`/order/traces?orderId=${this.order.id}`)
            },
            // 点击删除订单
            onClickDelete(){
                deleteOrder(this.order.id).then(resp=>{
                    console.log(resp);
                    if (resp) {
                        this.$emit("onDelete") // 触发父组件事件
                    }
                })
            },
            onClickComment(){
                this.$emit("onComment");
            },
            onShowComment() {
                this.$router.push("/order/comment/show?orderId=" + this.order.id);
            }
        },
        created() {
        }
    }
</script>

<style scoped>
.order-button{
    margin-right: 5px;
}
    .bt-group{
        float: right;
    }

</style>
