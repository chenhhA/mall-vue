<template>
    <div>
        <van-tabs v-model="active" lazy-render>
            <van-tab title="全部" :name="7">
                <OrderList :order-status="active"></OrderList>
            </van-tab>
            <van-tab title="待付款" :name="1">
                <OrderList :order-status="active"></OrderList>
            </van-tab>
            <van-tab title="待发货" :name="2">
                <OrderList :order-status="active"></OrderList>
            </van-tab>
            <van-tab title="待收货" :name="3">
                <OrderList :order-status="active"></OrderList>
            </van-tab>
            <van-tab title="待评价" :name="4">
                <OrderList :order-status="active"></OrderList>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import OrderList from "../../../components/order/OrderList";

    export default {
        //"订单状态 1->待付款，2->待发货->,3->待收货，4->待评价，5->已完成,6->已关闭"
        name: "Index",
        components: {OrderList},
        data(){
            return{
                active:'',
                orders:[],
            }
        },
        methods:{
        },
        created() {
            this.active=parseInt(this.$route.query.type);
        }
    }
</script>

<style scoped>

</style>
