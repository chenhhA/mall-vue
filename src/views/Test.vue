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
                    <van-button type="danger" size="mini">
                        领取
                    </van-button>
                </span>

            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "Test",
        data(){
            return{
                coupon: {
                    "id": 22,
                    "name": "小米10促销",
                    "desc": "小米10特惠,限时优惠!,小米10特惠,",
                    "tag": "",
                    "total": 9999999,
                    "currentnum": 999999,
                    "discount": 100.00,
                    "min": 2000.00,
                    "limit": 1,
                    "type": 0,
                    "useType": 1,
                    "status": 0,
                    "code": null,
                    "startTime": "2020-03-17T02:30:14.000+0000",
                    "endTime": "2020-09-17T02:30:22.000+0000",
                    "addTime": "2020-04-17T02:30:26.000+0000",
                    "products": null,
                    "categoryList": null
                },
            }
        }
    }
</script>

<style scoped>
.coupon-container{
    background-image: url(../assets/images/9bc039e58cbcbc71.png);
    width: 355px;
    height: 132px;
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
