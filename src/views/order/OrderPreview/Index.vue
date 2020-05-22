<template>

    <div>
        <div class="split-line">

        </div>

        <!--        收货地址弹出层-->
        <van-popup
                v-model="showAddressSelect"
                round
                position="bottom"
                style="height: 90%; padding-top: 4px;background-color: #eee"
        >
            <van-row v-for="ad in address" class="address-item" @click="onAddressSelect(ad)">

                <van-col span="5" offset="1">
                    <h5>{{ad.name}}</h5>
                    <van-tag v-if="ad.isDefault" plain type="primary">默认</van-tag>
                </van-col>
                <van-col span="16">
                    <p>{{ad.tel}}</p>
                    <p>{{ad.province}}{{ad.city}}{{ad.county}}{{ad.addressDetail}}</p>

                </van-col>
            </van-row>
        </van-popup>

        <!--        收货地址展示框-->
        <van-cell-group class="mg-bottom">
            <van-cell title="收货地址"
                      @click="loadAddress"
                      is-link>
                <template #label v-if="defaultAddress != ''">
                    {{defaultAddress.name}} {{defaultAddress.tel}}
                    <br/>
                    {{defaultAddress.province}}{{defaultAddress.city}}{{defaultAddress.county}}{{defaultAddress.addressDetail}}
                </template>
            </van-cell>
        </van-cell-group>

        <!--        优惠券cell-->
        <van-coupon-cell
                :coupons="enableCoupon2"
                :disabled-coupons="disableCoupon"
                :chosen-coupon="chosenCoupon"
                @click="showList = true"
        />

        <!--        优惠券弹出层-->
        <van-popup
                v-model="showList"
                round
                position="bottom"
                style="height: 90%; padding-top: 4px;"
        >
            <van-coupon-list
                    :coupons="enableCoupon2"
                    :chosen-coupon="chosenCoupon"
                    :disabled-coupons="disableCoupon"
                    @change="onChange"
                    @exchange="onExchange"
            />
        </van-popup>

        <!--        订单项渲染-->
        <van-card
                v-for="product in cartItems"
                class="mg-bottom"
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

        <!--        订单信息展示cell-->
        <van-cell-group class="mg-bottom">
            <van-cell title="商品总价" :value="formatPrice(order.productPrice)"/>
            <van-cell title="优惠金额" :value="formatPrice(order.couponPrice)"/>
            <van-cell title="运费" :value="formatPrice(order.freightPrice)"/>
            <van-cell title="实际金额" :value="formatPrice(order.actualPrice)"/>
        </van-cell-group>


        <!--        留言-->
        <van-field
                v-model="orderParams.message"
                rows="3"
                autosize
                label="留言"
                type="textarea"
                maxlength="100"
                placeholder="请输入留言"
                show-word-limit
        />

        <!--       结算导航栏-->
        <van-submit-bar :price="order.actualPrice*100" button-text="提交订单" @submit="onSubmit"/>


    </div>
</template>

<script>
    import {getAllAddress, getOrderPreviewFromCart, getOrderPreviewFromProduct, submitOrder} from "../../../api/api";

    export default {
        name: "Index",
        data() {
            return {
                orderParams: {
                    addressId: '', // 使用的收货地址id
                    ids: [], //
                    couponId: '', // 使用的优惠券id
                    message: '', // 订单备注
                    productId: '', //
                    skuId: '',
                    buyNum: '',
                },
                enableCoupon: [], // 启用的优惠券
                cartItems: [],
                defaultAddress: {},
                address: [],
                showAddressSelect: false, //是否展示地址popup
                addressList: [],
                order: {},
                enableCoupon2: [],  // 可用的优惠券列表
                disableCoupon: [], // 不可用的优惠券
                disableCoupon2: [],
                showList: false,  // 是否展示优惠券弹出层
                chosenCoupon: -1, // 选中的优惠券的索引
                cartIds: [], // 购物车中选中项的id,
                from: '' // 1->来自购物车，2->来自商品详情页,

            }
        },
        methods: {
            reArrCoupon() {
                this.enableCoupon2 = [];
                this.disableCoupon2 = [];
                this.enableCoupon.forEach(item => {
                    let coupon = {};
                    coupon['id'] = item.id;
                    coupon['name'] = item.coupon.name;
                    coupon['condition'] = "满" + item.coupon.min + '元减' + item.coupon.discount + '元';
                    coupon['startAt'] = new Date(item.coupon.startTime).getTime()
                    coupon['endAt'] = new Date(item.coupon.endTime).getTime()
                    coupon['description'] = item.coupon.desc;
                    coupon['reason'] = '不可用';
                    coupon['value'] = item.coupon.discount * 100;
                    coupon['valueDesc'] = item.coupon.discount.toString();
                    coupon['unitDesc'] = "元";
                    coupon['discount'] = item.coupon.discount;
                    this.enableCoupon2.push(coupon)
                });
                this.disableCoupon.forEach(item => {
                    let coupon = {};
                    coupon['id'] = item.coupon.id;
                    coupon['name'] = item.coupon.name;
                    coupon['condition'] = "满" + item.coupon.min + '元减' + item.coupon.discount + '元';
                    coupon['startAt'] = new Date(item.coupon.startTime).getTime()
                    coupon['endAt'] = new Date(item.coupon.endTime).getTime()
                    coupon['description'] = item.coupon.desc;
                    coupon['reason'] = '不可用';
                    coupon['value'] = item.coupon.discount * 100;
                    coupon['valueDesc'] = item.coupon.discount.toString();
                    coupon['unitDesc'] = "元"
                    this.disableCoupon2.push(coupon)
                })

            },
            onAddressSelect(item) {
                this.defaultAddress = item;
                this.orderParams.addressId = item.id;
                this.showAddressSelect = false;
            },
            loadAddress() {
                getAllAddress().then(resp => {
                    if (resp) {
                        this.address = resp;
                        this.showAddressSelect = true;
                    }
                })
            },
            onChange(index) {
                this.showList = false;

                this.orderParams.couponId = this.enableCoupon2[index].id;

                // 重新计算优惠信息
                this.order.couponPrice = this.enableCoupon2[index].discount;
                this.order.actualPrice = this.order.productPrice - this.order.couponPrice;
                this.chosenCoupon = index;
            },
            onExchange() {

            },
            onSubmit() {
                submitOrder(this.orderParams).then(resp => {
                    if (resp) {
                        this.$store.commit("setOrder", resp.object);
                        this.$router.push('/order/pay')
                    }
                })
            },
            loadData() {
                //  // 1->来自购物车，2->来自商品详情页,
                if (this.from === 1) {
                    getOrderPreviewFromCart(this.cartIds).then(resp => {
                        if (resp) {
                            this.defaultAddress = resp.defaultAddress;
                            this.order = resp.order;
                            this.enableCoupon = resp.enableCoupon;
                            this.disableCoupon = resp.disableCoupon;
                            this.cartItems = resp.cartItems;
                            this.reArrCoupon();
                        }
                    });
                } else if (this.from === 2) {
                    getOrderPreviewFromProduct(this.orderParams.productId,
                        this.orderParams.skuId, this.orderParams.buyNum).then(resp => {
                        if (resp) {
                            this.defaultAddress = resp.defaultAddress;
                            this.order = resp.order;
                            this.enableCoupon = resp.enableCoupon;
                            this.disableCoupon = resp.disableCoupon;
                            this.cartItems = resp.cartItems;
                            this.reArrCoupon();
                        }
                    });
                }

            }
        },
        created() {
            this.from = parseInt(this.$route.query.from)
            console.log(this.from === 1)
            if (this.from === 1) {
                // 从购物车发起订单
                this.cartIds = this.$store.state.selectCartItem;
                this.orderParams.ids = this.cartIds;
            } else if (this.from === 2) {
                // 从商品详情页发起订单
                this.orderParams.productId = this.$route.query.productId;
                this.orderParams.skuId = this.$route.query.skuId;
                this.orderParams.buyNum = this.$route.query.buyNum;
            }
            this.loadData();
        },
    }
</script>

<style scoped>
    .split-line {
        background: url(//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-67880192dc.png?imageView&type=webp) repeat-x;
        height: 5px;
    }

    .mg-bottom {
        margin-bottom: 10px;
    }

    .address-item-name {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        font-size: 16px;
        line-height: 22px;
    }

    .address-item-address {
        color: #323233;
        font-size: 13px;
        line-height: 18px;
    }

    .address-item {
        padding: 12px;
        background-color: #fff;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .address-popup {
        height: 90%;
        padding: 20px 20px;
        background-color: #eee;
    }
</style>
