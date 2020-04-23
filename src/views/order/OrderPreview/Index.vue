<template>

    <div>
        <div class="split-line" >

        </div>

        <van-popup
                v-model="showAddressSelect"
                round
                position="bottom"
                style="height: 90%; padding-top: 4px;color: #f7f8fa;"
        >
            <van-address-list
                    v-model="chosenAddressId"
                    :list="addressList"
                    :select="onAddressSelect"
                    :add-button-text="'确认'"
                    default-tag-text="默认"
            />
        </van-popup>

        <van-cell-group class="mg-bottom">
            <van-cell title="收货地址"
                      @click="loadAddress"
                      is-link>
                <template #label v-if="defaultAddress != ''">
                    {{defaultAddress.name}}  {{defaultAddress.tel}}
                    <br/>
                    {{defaultAddress.address}}
                </template>
            </van-cell>
        </van-cell-group>

        <van-coupon-cell
                :coupons="enableCoupon2"
                :disabled-coupons="disableCoupon"
                @click="showList = true"
        />

        <van-card
                v-for="product in cartItems"
                class="mg-bottom"
                :num="product.number"
                :price="product.price"
                :title="product.productName"
                :thumb="product.picUrl">
            <div slot="desc">
                <div class="van-card__desc">
                    <van-tag plain style="margin-right:6px;" v-for="sp in product.specifications" :key="index">
                        {{sp}}
                    </van-tag>
                    <br/>
                    {{product.productDesc}}
                </div>
            </div>
        </van-card>

        <van-cell-group class="mg-bottom">
            <van-cell title="商品总价" :value="order.productPrice" />
            <van-cell title="优惠金额" :value="order.couponPrice" />
            <van-cell title="运费" :value="order.freightPrice" />
            <van-cell title="实际金额" :value="order.actualPrice" />
        </van-cell-group>

        <div class="van-address-item"></div>

        <van-submit-bar :price="order.actualPrice*100" button-text="提交订单" @submit="onSubmit" />
        <van-popup
                v-model="showList"
                round
                position="bottom"
                style="height: 90%; padding-top: 4px;"
        >
            <van-coupon-list
                    :coupons="enableCoupon2"
                    :disabled-coupons="disableCoupon"
                    @change="onChange"
                    @exchange="onExchange"
            />
        </van-popup>


    </div>
</template>

<script>
    import {getAllAddress} from "../../../api/api";

    export default {
        name: "Index",
        data(){
            return {
                enableCoupon:[
                    {
                        "id": 5,
                        "userId": 1,
                        "couponId": 21,
                        "orderId": null,
                        "username": "test123",
                        "useTime": null,
                        "addTime": "2020-04-17T14:20:09.000+0000",
                        "isUsed": false,
                        "coupon": {
                            "id": 21,
                            "name": "2020年新用户注册增券",
                            "desc": "新用户增送",
                            "tag": "",
                            "total": 999999,
                            "currentnum": 999999,
                            "discount": 20.00,
                            "min": 80.00,
                            "limit": 1,
                            "type": 1,
                            "useType": 0,
                            "status": 0,
                            "code": "",
                            "startTime": "2020-01-01T00:00:00.000+0000",
                            "endTime": "2020-12-31T00:00:00.000+0000",
                            "addTime": "2020-03-23T11:44:53.000+0000",
                            "products": null,
                            "categoryList": null
                        },
                        "used": false
                    },
                    {
                        "id": 8,
                        "userId": 1,
                        "couponId": 19,
                        "orderId": null,
                        "username": "test123",
                        "useTime": null,
                        "addTime": "2020-04-21T13:39:42.000+0000",
                        "isUsed": false,
                        "coupon": {
                            "id": 19,
                            "name": "春季限时兑换码",
                            "desc": "",
                            "tag": "",
                            "total": 600,
                            "currentnum": 600,
                            "discount": 5.00,
                            "min": 99.00,
                            "limit": 1,
                            "type": 2,
                            "useType": 0,
                            "status": 0,
                            "code": "AWEEM1",
                            "startTime": "2020-03-01T00:00:00.000+0000",
                            "endTime": "2020-04-30T00:00:00.000+0000",
                            "addTime": "2020-03-23T11:41:59.000+0000",
                            "products": null,
                            "categoryList": null
                        },
                        "used": false
                    }
                ],
                unenableCoupon: [
                    {
                        "id": 1,
                        "userId": 1,
                        "couponId": 22,
                        "orderId": null,
                        "username": "test123",
                        "useTime": null,
                        "addTime": "2020-04-17T04:33:07.000+0000",
                        "isUsed": false,
                        "coupon": {
                            "id": 22,
                            "name": "小米10促销",
                            "desc": "小米10特惠",
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
                        "used": false
                    },
                    {
                        "id": 2,
                        "userId": 1,
                        "couponId": 20,
                        "orderId": null,
                        "username": "test123",
                        "useTime": null,
                        "addTime": "2020-04-17T04:33:07.000+0000",
                        "isUsed": false,
                        "coupon": {
                            "id": 20,
                            "name": "2020年手机促销",
                            "desc": "智能手机促销",
                            "tag": "",
                            "total": 99999,
                            "currentnum": 99999,
                            "discount": 100.00,
                            "min": 1999.00,
                            "limit": 1,
                            "type": 0,
                            "useType": 2,
                            "status": 0,
                            "code": "",
                            "startTime": "2020-03-01T00:00:00.000+0000",
                            "endTime": "2020-09-30T00:00:00.000+0000",
                            "addTime": "2020-03-23T11:43:43.000+0000",
                            "products": null,
                            "categoryList": null
                        },
                        "used": false
                    },
                    {
                        "id": 3,
                        "userId": 1,
                        "couponId": 18,
                        "orderId": null,
                        "username": "test123",
                        "useTime": null,
                        "addTime": "2020-04-17T04:33:07.000+0000",
                        "isUsed": false,
                        "coupon": {
                            "id": 18,
                            "name": "3月全场特惠",
                            "desc": "3月优惠",
                            "tag": "",
                            "total": 999999,
                            "currentnum": 999999,
                            "discount": 5.00,
                            "min": 99.00,
                            "limit": 1,
                            "type": 0,
                            "useType": 0,
                            "status": 1,
                            "code": "",
                            "startTime": "2020-03-01T00:00:00.000+0000",
                            "endTime": "2020-03-31T00:00:00.000+0000",
                            "addTime": "2020-03-23T11:41:00.000+0000",
                            "products": null,
                            "categoryList": null
                        },
                        "used": false
                    }
                ],
                cartItems: [
                    {
                        "id": 2,
                        "userId": 1,
                        "categoryId": 17,
                        "productId": 1006038,
                        "productSn": "332132131",
                        "productName": "米旗蛋黄酥麻糬味",
                        "productDesc": null,
                        "productStockId": 32,
                        "specifications": [
                            "标准"
                        ],
                        "price": 34.90,
                        "number": 2,
                        "checked": false,
                        "picUrl": "https://mall-1251176395.cos.ap-guangzhou.myqcloud.com/2020/03/24/83a19acaf43503aacde39d33260e825b.jpg",
                        "addTime": "2020-04-17T12:33:47.000+0000",
                        "deleteStatus": false
                    },
                    {
                        "id": 3,
                        "userId": 1,
                        "categoryId": 44,
                        "productId": 1006062,
                        "productSn": "12131246",
                        "productName": "BergHOFF Leo不粘锅套装",
                        "productDesc": 'ggugugugu',
                        "productStockId": 57,
                        "specifications": [
                            "灰色",
                            "汤锅"
                        ],
                        "price": 369.00,
                        "number": 1,
                        "checked": false,
                        "picUrl": "https://mall-1251176395.cos.ap-guangzhou.myqcloud.com/2020/03/24/44d050bb02c155f74a9387cec37c0580.jpg",
                        "addTime": "2020-04-17T13:03:39.000+0000",
                        "deleteStatus": false
                    }
                ],
                orderItems: [
                    {
                        "id": null,
                        "orderId": null,
                        "productId": 1006038,
                        "commentId": null,
                        "categoryId": 17,
                        "productDesc": null,
                        "productName": null,
                        "picUrl": "https://mall-1251176395.cos.ap-guangzhou.myqcloud.com/2020/03/24/83a19acaf43503aacde39d33260e825b.jpg",
                        "productStockId": 32,
                        "specifications": [
                            "标准"
                        ],
                        "number": 2,
                        "price": 34.90
                    },
                    {
                        "id": null,
                        "orderId": null,
                        "productId": 1006062,
                        "commentId": null,
                        "categoryId": 44,
                        "productDesc": null,
                        "productName": null,
                        "picUrl": "https://mall-1251176395.cos.ap-guangzhou.myqcloud.com/2020/03/24/44d050bb02c155f74a9387cec37c0580.jpg",
                        "productStockId": 57,
                        "specifications": [
                            "灰色",
                            "汤锅"
                        ],
                        "number": 1,
                        "price": 369.00
                    }
                ],
                defaultAddress: {
                    "id": 7,
                    "name": "陈汉ggggggggg",
                    "userId": 1,
                    "province": "福建",
                    "city": "福州",
                    "county": "长乐区",
                    "addressDetail": "民主小区1",
                    "address":"福建福州长乐区民主小区1",
                    "postalCode": null,
                    "tel": "13055809983",
                    "isDefault": true,
                    "addTime": null
                },
                orderParams:{
                    addressId:'',
                    couponId:'',
                    payType:'',
                    message:'',
                },
                address:[
                    {
                        "id": 2,
                        "name": "陈汉1",
                        "userId": 1,
                        "province": "福建",
                        "city": "福州",
                        "county": "长乐区",
                        "addressDetail": "民主小区1",
                        "postalCode": null,
                        "tel": "13055809983",
                        "isDefault": false,
                        "addTime": null
                    },
                    {
                        "id": 4,
                        "name": "陈汉ggggggggg",
                        "userId": 1,
                        "province": "福建",
                        "city": "福州",
                        "county": "长乐区",
                        "addressDetail": "民主小区1",
                        "postalCode": null,
                        "tel": "13055809983",
                        "isDefault": false,
                        "addTime": null
                    },
                    {
                        "id": 6,
                        "name": "陈汉默认地址",
                        "userId": 1,
                        "province": "福建",
                        "city": "福州",
                        "county": "长乐区",
                        "addressDetail": "民主小区1",
                        "postalCode": null,
                        "tel": "13055809983",
                        "isDefault": false,
                        "addTime": null
                    },
                    {
                        "id": 7,
                        "name": "陈汉ggggggggg",
                        "userId": 1,
                        "province": "福建",
                        "city": "福州",
                        "county": "长乐区",
                        "addressDetail": "民主小区1",
                        "postalCode": null,
                        "tel": "13055809983",
                        "isDefault": true,
                        "addTime": null
                    },
                    {
                        "id": 8,
                        "name": "陈汉默认1",
                        "userId": 1,
                        "province": "北京市",
                        "city": "北京市",
                        "county": "东城区",
                        "addressDetail": "ddawda",
                        "postalCode": null,
                        "tel": "13055809983",
                        "isDefault": false,
                        "addTime": null
                    }
                ],
                showAddressSelect:false,
                chosenAddressId:'',
                addressList:[],
                order: {
                    "id": null,
                    "userId": null,
                    "addressId": null,
                    "couponId": null,
                    "orderSn": null,
                    "message": null,
                    "productPrice": 438.80,
                    "freightPrice": 0,
                    "couponPrice": null,
                    "orderPrice": null,
                    "actualPrice": 438.80,
                    "payId": null,
                    "payTime": null,
                    "payType": null,
                    "shipSn": null,
                    "shipChannel": null,
                    "receiverProvince": null,
                    "receiverCity": null,
                    "receiverRegion": null,
                    "receiverDetailAddress": null,
                    "addTime": null,
                    "shipTime": null,
                    "confirmTime": null,
                    "commentTime": null,
                    "endTime": null,
                    "updateTime": null,
                    "refundAmount": null,
                    "refundType": null,
                    "refundContent": null,
                    "confirmStatus": null,
                    "deleteStatus": null,
                    "orderStatus": null,
                    "aftersaleStatus": null
                },
                enableCoupon2:[],
                disableCoupon:[],
                showList: false,

            }
        },
        methods:{
            reArrCoupon(){
                this.enableCoupon.forEach(item=>{
                    console.log(item);
                    let coupon= {};
                    coupon['id'] = item.coupon.id;
                    coupon['name'] = item.coupon.name;
                    let condition1 =  "满"+item.coupon.min+'元减'+item.coupon.discount+'元';
                    coupon['condition'] = condition1;
                    coupon['startAt'] = new Date(item.coupon.startTime).getTime()
                    coupon['endAt'] = new Date(item.coupon.endTime).getTime()
                    coupon['description'] = item.coupon.desc;
                    coupon['reason'] = '不可用';
                    coupon['value'] = item.coupon.discount*100;
                    coupon['valueDesc'] = item.coupon.discount.toString();
                    coupon['unitDesc'] = "元"
                    this.enableCoupon2.push(coupon)
                });
                this.unenableCoupon.forEach(item=>{
                    let coupon={};
                    coupon['id'] = item.coupon.id;
                    coupon['name'] = item.coupon.name;
                    let condition1 =  "满"+item.coupon.min+'元减'+item.coupon.discount+'元';
                    coupon['condition'] = condition1;
                    coupon['startAt'] = new Date(item.coupon.startTime).getTime()
                    coupon['endAt'] = new Date(item.coupon.endTime).getTime()
                    coupon['description'] = item.coupon.desc;
                    coupon['reason'] = '不可用';
                    coupon['value'] = item.coupon.discount*100;
                    coupon['valueDesc'] = item.coupon.discount.toString();
                    coupon['unitDesc'] = "元"
                    this.disableCoupon.push(coupon)
                })

            },

            onAddressSelect(item, index){
                this.defaultAddress = item;
                this.showAddressSelect =false;
            },
            loadAddress(){
                getAllAddress().then( resp=>{
                    if (resp) {
                        resp.forEach(item=>{
                            let address = [];
                            address['id'] = item.id;
                            address['name'] = item.name;
                            address['tel'] = item.tel;
                            address['address'] = item.province+ item.city+item.county+item.addressDetail;
                            address['isDefault'] = item.isDefault;
                            this.addressList.push(address);
                        })
                        this.chosenAddressId = this.defaultAddress.id;
                        this.showAddressSelect = true;
                    }
                })
            },
        },
        created() {
            this.reArrCoupon();
        }
    }
</script>

<style scoped>
    .split-line{
        background: url(//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-67880192dc.png?imageView&type=webp) repeat-x;
        height: 5px;
    }
    .mg-bottom{
        margin-bottom: 10px;
    }
</style>
