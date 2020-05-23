<template>
    <div>
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

        <coupon-card
                :coupon="coupon"
                :type="1"
                @onGet="getCoupon(coupon.id)"
                v-for="coupon in couponList"></coupon-card>
    </div>
</template>

<script>
    import CouponCard from "../../../components/CouponCard";
    import {exchangeCoupon, getCoupon, getCouponList} from "../../../api/api";
    import AddressCard from "../../../components/AddressCard";
    import {Toast} from "vant";
    export default {
        name: "CouponCenter",
        components: {AddressCard, CouponCard},
        data(){
            return {
                couponList:[],
                code:'',
                isLogin: false
            }
        },
        methods:{
            loadData() {
                getCouponList().then(resp => {
                    this.couponList = resp;
                    console.log(this.couponList);
                });
            },
            getCoupon(id){
                getCoupon(id).then(resp=>{

                })
            },
            onClickExchange() {
                if (this.code == '') {
                    Toast.fail("请输入兑换码")
                    return
                }
                exchangeCoupon(this.code).then(resp=>{
                    if (resp) {
                        this.code = '';
                    }
                });
            }
        },
        created() {
            this.loadData();
            this.isLogin = this.$store.state.loginStatus;
        }
    }
</script>

<style scoped>

</style>
