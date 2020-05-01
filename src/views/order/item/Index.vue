<template>
    <div>
        <div class="split-line" >
        </div>

<!--        订单收货地址-->
        <div class="address-info mg-bottom">
            <van-row class="address-name">
                <van-col span="4">{{order.receiverName}}</van-col>
                <van-col span="8" offset="2">{{order.receiverTel}}</van-col>
            </van-row>
            <van-row class="address-detail-text">
                <van-col span:24>{{order.receiverProvince}}{{order.receiverCity}}{{order.receiverRegion}}{{order.receiverDetailAddress}}</van-col>
            </van-row>
        </div>

        <van-cell-group class="mg-bottom" @click="onClickExpressInfo">
            <van-cell class="van-ellipsis"
                      :title="lastExpressTrace.acceptStation"
                      :label="lastExpressTrace.acceptTime" />
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

        <van-cell-group class="mg-bottom">


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
                        {{product.productDesc}}
                    </div>
                </div>
            </van-card>

            <van-divider />

            <van-cell-group>
                <template #default>
                    <button-group :order-id="order.id"
                                  :order-status="order.orderStatus"></button-group>
                </template>

            </van-cell-group>


        </van-cell-group>

        <!--        订单信息展示cell-->
        <van-cell-group class="mg-bottom">
            <van-cell title="商品总价" :value="order.productPrice" />
            <van-cell title="优惠金额" :value="order.couponPrice" />
            <van-cell title="运费" :value="order.freightPrice" />
            <van-cell title="实际金额" :value="order.actualPrice" />
        </van-cell-group>
    </div>
</template>

<script>
    import ButtonGroup from "../../../components/order/ButtonGroup";
    export default {
        name: "Index",
        components: {ButtonGroup},
        data (){
            return {
                orderStatusText: ['待付款', '待发货', '待收货', '待评价', '已完成', '已关闭'],
                expressInfo: {
                    "state": "3",
                    "shipperCode": "ZTO",
                    "trace": [
                        {
                            "remark": null,
                            "acceptTime": "2020-04-16 17:47:20",
                            "acceptStation": "【合肥瑶海工业区】（0551-64274120） 的 计太美（13205577512） 已揽收",
                            "AcceptTime": "2020-04-16 17:47:20",
                            "AcceptStation": "【合肥瑶海工业区】（0551-64274120） 的 计太美（13205577512） 已揽收",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-16 18:18:10",
                            "acceptStation": "快件离开 【合肥瑶海工业区】 已发往 【安徽管理中心】",
                            "AcceptTime": "2020-04-16 18:18:10",
                            "AcceptStation": "快件离开 【合肥瑶海工业区】 已发往 【安徽管理中心】",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-16 21:29:05",
                            "acceptStation": "快件已经到达 【合肥中转部】",
                            "AcceptTime": "2020-04-16 21:29:05",
                            "AcceptStation": "快件已经到达 【合肥中转部】",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-16 21:30:46",
                            "acceptStation": "快件离开 【合肥中转部】 已发往 【福州中转】",
                            "AcceptTime": "2020-04-16 21:30:46",
                            "AcceptStation": "快件离开 【合肥中转部】 已发往 【福州中转】",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-17 14:23:42",
                            "acceptStation": "快件已经到达 【福州中转】",
                            "AcceptTime": "2020-04-17 14:23:42",
                            "AcceptStation": "快件已经到达 【福州中转】",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-17 14:32:40",
                            "acceptStation": "快件离开 【福州中转】 已发往 【福州长乐】",
                            "AcceptTime": "2020-04-17 14:32:40",
                            "AcceptStation": "快件离开 【福州中转】 已发往 【福州长乐】",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-17 19:26:25",
                            "acceptStation": "快件已经到达 【福州长乐】",
                            "AcceptTime": "2020-04-17 19:26:25",
                            "AcceptStation": "快件已经到达 【福州长乐】",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-18 15:11:02",
                            "acceptStation": "【福州长乐】 的高锦基-市区（13075840360） 正在第3次派件, 请保持电话畅通,并耐心等待（95720为中通快递员外呼专属号码，请放心接听）",
                            "AcceptTime": "2020-04-18 15:11:02",
                            "AcceptStation": "【福州长乐】 的高锦基-市区（13075840360） 正在第3次派件, 请保持电话畅通,并耐心等待（95720为中通快递员外呼专属号码，请放心接听）",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-18 18:45:33",
                            "acceptStation": "快件已在 【福州长乐】 签收, 签收人: 有问题打13075840360, 如有疑问请电联:（13075840360）, 投诉电话:（0591-38073824）, 您的快递已经妥投。风里来雨里去, 只为客官您满意。上有老下有小, 赏个好评好不好？【请在评价快递员处帮忙点亮五颗星星哦~】",
                            "AcceptTime": "2020-04-18 18:45:33",
                            "AcceptStation": "快件已在 【福州长乐】 签收, 签收人: 有问题打13075840360, 如有疑问请电联:（13075840360）, 投诉电话:（0591-38073824）, 您的快递已经妥投。风里来雨里去, 只为客官您满意。上有老下有小, 赏个好评好不好？【请在评价快递员处帮忙点亮五颗星星哦~】",
                            "Remark": null
                        }
                    ],
                    "reason": null,
                    "success": true,
                    "ebusinessID": "1638131",
                    "logisticCode": "75343502055438",
                    "LogisticCode": "75343502055438",
                    "ShipperCode": "ZTO",
                    "Traces": [
                        {
                            "remark": null,
                            "acceptTime": "2020-04-16 17:47:20",
                            "acceptStation": "【合肥瑶海工业区】（0551-64274120） 的 计太美（13205577512） 已揽收",
                            "AcceptTime": "2020-04-16 17:47:20",
                            "AcceptStation": "【合肥瑶海工业区】（0551-64274120） 的 计太美（13205577512） 已揽收",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-16 18:18:10",
                            "acceptStation": "快件离开 【合肥瑶海工业区】 已发往 【安徽管理中心】",
                            "AcceptTime": "2020-04-16 18:18:10",
                            "AcceptStation": "快件离开 【合肥瑶海工业区】 已发往 【安徽管理中心】",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-16 21:29:05",
                            "acceptStation": "快件已经到达 【合肥中转部】",
                            "AcceptTime": "2020-04-16 21:29:05",
                            "AcceptStation": "快件已经到达 【合肥中转部】",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-16 21:30:46",
                            "acceptStation": "快件离开 【合肥中转部】 已发往 【福州中转】",
                            "AcceptTime": "2020-04-16 21:30:46",
                            "AcceptStation": "快件离开 【合肥中转部】 已发往 【福州中转】",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-17 14:23:42",
                            "acceptStation": "快件已经到达 【福州中转】",
                            "AcceptTime": "2020-04-17 14:23:42",
                            "AcceptStation": "快件已经到达 【福州中转】",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-17 14:32:40",
                            "acceptStation": "快件离开 【福州中转】 已发往 【福州长乐】",
                            "AcceptTime": "2020-04-17 14:32:40",
                            "AcceptStation": "快件离开 【福州中转】 已发往 【福州长乐】",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-17 19:26:25",
                            "acceptStation": "快件已经到达 【福州长乐】",
                            "AcceptTime": "2020-04-17 19:26:25",
                            "AcceptStation": "快件已经到达 【福州长乐】",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-18 15:11:02",
                            "acceptStation": "【福州长乐】 的高锦基-市区（13075840360） 正在第3次派件, 请保持电话畅通,并耐心等待（95720为中通快递员外呼专属号码，请放心接听）",
                            "AcceptTime": "2020-04-18 15:11:02",
                            "AcceptStation": "【福州长乐】 的高锦基-市区（13075840360） 正在第3次派件, 请保持电话畅通,并耐心等待（95720为中通快递员外呼专属号码，请放心接听）",
                            "Remark": null
                        },
                        {
                            "remark": null,
                            "acceptTime": "2020-04-18 18:45:33",
                            "acceptStation": "快件已在 【福州长乐】 签收, 签收人: 有问题打13075840360, 如有疑问请电联:（13075840360）, 投诉电话:（0591-38073824）, 您的快递已经妥投。风里来雨里去, 只为客官您满意。上有老下有小, 赏个好评好不好？【请在评价快递员处帮忙点亮五颗星星哦~】",
                            "AcceptTime": "2020-04-18 18:45:33",
                            "AcceptStation": "快件已在 【福州长乐】 签收, 签收人: 有问题打13075840360, 如有疑问请电联:（13075840360）, 投诉电话:（0591-38073824）, 您的快递已经妥投。风里来雨里去, 只为客官您满意。上有老下有小, 赏个好评好不好？【请在评价快递员处帮忙点亮五颗星星哦~】",
                            "Remark": null
                        }
                    ],
                    "State": "3",
                    "EBusinessID": "1638131",
                    "Success": true,
                    "Reason": null
                },
                order: {
                    "id": 3,
                    "userId": 1,
                    "addressId": 6,
                    "couponId": null,
                    "orderSn": "20200427752871",
                    "message": "",
                    "productPrice": 438.80,
                    "freightPrice": 0.00,
                    "couponPrice": 0.00,
                    "orderPrice": 438.80,
                    "actualPrice": 438.80,
                    "payId": null,
                    "payTime": null,
                    "payType": null,
                    "shipSn": "75343502055438",
                    "shipChannel": "ZTO",
                    "receiverProvince": "福建",
                    "receiverCity": "福州",
                    "receiverName": "陈汉",
                    "receiverTel": "13055809983",
                    "addTime": "2020-04-27T14:58:36.000+0000",
                    "shipTime": null,
                    "confirmTime": null,
                    "commentTime": null,
                    "endTime": null,
                    "updateTime": "2020-04-27T14:58:36.000+0000",
                    "refundAmount": null,
                    "refundType": null,
                    "refundContent": null,
                    "confirmStatus": null,
                    "deleteStatus": false,
                    "orderStatus": 3,
                    "aftersaleStatus": 1,
                    "receiverRegion": "长乐区",
                    "receiverDetailAddress": "民主小区1",
                    "orderItems": [
                        {
                            "id": 4,
                            "orderId": 3,
                            "productId": 1006038,
                            "commentId": null,
                            "categoryId": 17,
                            "productDesc": "测试商品",
                            "productName": "测试商品",
                            "picUrl": "https://mall-1251176395.cos.ap-guangzhou.myqcloud.com/2020/03/24/83a19acaf43503aacde39d33260e825b.jpg",
                            "productStockId": 32,
                            "specifications": [
                                "标准"
                            ],
                            "number": 2,
                            "price": 34.90
                        },
                        {
                            "id": 5,
                            "orderId": 3,
                            "productId": 1006062,
                            "commentId": null,
                            "categoryId": 44,
                            "productDesc": "测试商品",
                            "productName": "测试商品",
                            "picUrl": "https://mall-1251176395.cos.ap-guangzhou.myqcloud.com/2020/03/24/44d050bb02c155f74a9387cec37c0580.jpg",
                            "productStockId": 57,
                            "specifications": [
                                "灰色",
                                "汤锅"
                            ],
                            "number": 1,
                            "price": 369.00
                        }
                    ]
                }
            }
        },
        methods:{
            loadData(){

            },
            onClickExpressInfo(){
                this.$store.commit("setTraces", this.expressInfo.Traces);
                this.$router.push("/order/traces")
            }
        },
        created() {
            // this.loadData()
        },
        computed:{
            lastExpressTrace: function () {
                return this.expressInfo.Traces[this.expressInfo.Traces.length-1]
            }
        }


    }
</script>

<style scoped>
    .split-line{
        background: url(//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-67880192dc.png?imageView&type=webp) repeat-x;
        height: 5px;
    }

    .address-info{
        padding: 15px 10px 20px 20px;
        background-color: #fffced;
    }
    .address-detail-text{
        color: #7F7F7F;
        margin-top: 10px;
        font-size: 12px;
    }
    .address-name{
        font-size:15px
    }

    .mg-bottom{
        margin-bottom: 10px;
    }

    .item-title-status{
        color: #DD1A21;
        float: right;
    }

    .item-title-name{
        float: left;
    }
</style>
