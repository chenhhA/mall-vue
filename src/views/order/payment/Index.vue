<template>
    <div class="payment">
        <div class="time_down payment_group">
            请在
            <span class="red">半小时内</span>
            完成付款，否则系统自动取消订单
        </div>

        <van-cell-group class="payment_group">
            <van-cell title="订单编号" :value="order.orderSn"/>
            <van-cell title="实付金额">
                <span class="red">{{order.actualPrice}}</span>
            </van-cell>
        </van-cell-group>

        <div class="pay_way_group">
            <div class="pay_way_title">选择支付方式</div>
            <van-radio-group v-model="payType">
                <van-cell-group>
                    <van-cell>
                        <template slot="title">
                            <img src="../../../assets/images/ali_pay.png" alt="支付宝" width="82" height="29">
                        </template>
                        <van-radio name="1"/>
                    </van-cell>
                    <van-cell>
                        <template slot="title">
                            <img src="../../../assets/images/wx_pay.png" alt="微信支付" width="113" height="23">
                        </template>
                        <van-radio name="2"/>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>

        <van-button class="pay_submit" @click="pay" type="primary" bottomAction>去支付</van-button>
    </div>
</template>

<script>
    import {payOrder} from "../../../api/api";

    export default {
        name: "Index",
        data(){
            return{
                order:{},
                payType:'',
            }
        },
        methods:{
            pay(){
                payOrder(this.order.id, this.payType).then(resp=>{
                    if (resp) {
                        console.log(resp);
                        this.$router.push("/");
                    }
                })
            },

        },
        created() {
            this.order = this.$store.state.order;
        }
    }
</script>

<style lang="scss" scoped>
    .payment_group {
        margin-bottom: 10px;
    }

    .time_down {
        background-color: #fffeec;
        padding: 10px 15px;
    }

    .pay_submit {
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    .pay_way_group img {
        vertical-align: middle;
    }

    .pay_way_title {
        padding: 15px;
        background-color: #fff;
    }
</style>
