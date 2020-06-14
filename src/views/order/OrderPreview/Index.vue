<template>

    <div>
        <div class="split-line">

        </div>

        <!--        新建收货地址弹出层-->
        <van-popup
                position="bottom"
                class="address-popup"
                v-model="showAddAddress">
                    <van-cell-group class="border-radius mg-bottom">

                        <van-field v-model="addAddress.name" placeholder="收货人姓名" />
                        <van-field v-model="addAddress.tel" placeholder="收货人电话" />
                        <!--                        省/市/区选择-->
                        <van-field
                                readonly
                                clickable
                                name="area"
                                :value="value"
                                placeholder="点击选择省市区"
                                @click="showArea = true"
                        />
                        <van-popup v-model="showArea" position="bottom">
                            <van-area
                                    :area-list="areaList"
                                    @confirm="onConfirm"
                                    @cancel="showArea = false"
                            />
                        </van-popup>

                        <van-field v-model="addAddress.addressDetail" placeholder="街道门牌,楼层房间号等信息" />
                    </van-cell-group>

                    <van-cell-group class="border-radius mg-bottom">
                        <van-cell center title="设为默认地址">
                            <template #right-icon>
                                <van-switch v-model="addAddress.isDefault" size="24" />
                            </template>
                        </van-cell>
                    </van-cell-group>

                    <van-button type="danger" class="mg-bottom" block
                                @click="OnSave"
                                round>保存</van-button>
                    <van-button type="default" block round @click="onCancel">取消</van-button>
        </van-popup>

        <!--        收货地址弹出层-->
        <van-popup
                v-model="showAddressSelect"
                round
                class="address-popup"
                position="bottom">


            <AddressCard
                    :class="orderParams.addressId  === ad.id? 'select-card' : ''"
                    @change="onAddressSelect(ad)"
                    :address="ad"
                    v-for="ad in address">

            </AddressCard>


            <van-button type="danger"
                        round
                        @click="addNewAddress"
                        style="position: fixed; bottom: 20px;width: 90% " block>新增地址</van-button>
        </van-popup>

        <!--        收货地址展示框-->
        <van-cell-group class="mg-bottom">
            <van-cell title="收货地址"
                      @click="loadAddress"
                      is-link>
                <template #label>
                    <div v-if="defaultAddress != null">
                        {{defaultAddress.name}} {{defaultAddress.tel}}
                        <br/>
                        {{defaultAddress.province}}{{defaultAddress.city}}{{defaultAddress.county}}{{defaultAddress.addressDetail}}
                    </div>
                    <div v-else>
                        请选择收货地址
                    </div>
                </template>
            </van-cell>
        </van-cell-group>

        <!--        优惠券cell-->
        <van-coupon-cell
                :coupons="enableCoupon2"
                :disabled-coupons="disableCoupon2"
                :chosen-coupon="chosenCoupon"
                @click="showList = true"/>

        <!--        优惠券弹出层-->
        <van-popup
                v-model="showList"
                round
                position="bottom"
                style="height: 90%; padding-top: 4px;">
            <van-coupon-list
                    :coupons="enableCoupon2"
                    :chosen-coupon="chosenCoupon"
                    :disabled-coupons="disableCoupon2"
                    @change="onChange"
            />
        </van-popup>

        <!--        订单项渲染-->
        <van-card
                v-for="product in cartItems"
                class="mg-bottom"
                :num="product.number"
                :price="formatPrice(product.price)"
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
    import areaList from '../../../utils/area'
    import {
        addNewAddress,
        getAllAddress,
        getOrderPreviewFromCart,
        getOrderPreviewFromProduct,
    submitOrderFromCart, submitOrderFromProduct
    } from "../../../api/api";
    import AddressCard from "../../../components/AddressCard";
    import { Toast } from 'vant';



    export default {
        name: "Index",
        components: {AddressCard},
        data() {
            return {
                orderParams: {
                    addressId: '', // 使用的收货地址id
                    cartIds: [], //
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
                from: '', // 1->来自购物车，2->来自商品详情页,
                addAddress:{
                    name:'',
                    tel:'',
                    isDefault: false

                },
                areaList:[],
                value: '',
                showAddAddress: false,
                showArea: false
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
                console.log("fc")
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
            onCancel() {
                this.showAddAddress = false;
                this.addAddress = {};
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

            OnSave(){
                addNewAddress(this.addAddress).then(resp=>{
                    if (resp) {
                        this.showAddAddress = false;
                        console.log(resp.object)
                        this.address.push(resp.object);
                    }
                });
            },

            onSubmit() {
                // 参数检验
                if (this.orderParams.addressId === '') {
                    Toast.fail('请选择收货地址');
                } else {
                    if (this.from === 1) {
                        submitOrderFromCart(this.orderParams).then(resp => {
                            if (resp) {
                                this.$store.commit("setOrder", resp.object);
                                this.$router.push('/order/pay')
                            }
                        });
                    } else if (this.from === 2) {
                        submitOrderFromProduct(this.orderParams).then(resp => {
                            if (resp) {
                                this.$store.commit("setOrder", resp.object);
                                this.$router.push('/order/pay')
                            }
                        });
                    }

                }

            },
            onConfirm(values) {
                this.addAddress.province = values[0].name;
                this.addAddress.city = values[1].name;
                this.addAddress.county = values[2].name;
                this.value = values.map((item) => item.name).join('/');
                this.showArea = false;
            },
            addNewAddress() {
                this.showAddressSelect = false;
                this.showAddAddress = true;
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
                            if (this.defaultAddress != null) {
                                this.orderParams.addressId = this.defaultAddress.id;
                            }
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
                            if (this.defaultAddress != null) {
                                this.orderParams.addressId = this.defaultAddress.id;
                            }
                        }
                    });
                }



            }
        },
        created() {
            this.from = parseInt(this.$route.query.from)
            if (this.from === 1) {
                // 从购物车发起订单
                this.cartIds = this.$store.state.selectCartItem;
                this.orderParams.cartIds = this.cartIds;
            } else if (this.from === 2) {
                // 从商品详情页发起订单
                this.orderParams.productId = this.$route.query.productId;
                this.orderParams.skuId = this.$route.query.skuId;
                this.orderParams.buyNum = this.$route.query.buyNum;
            }
            this.loadData();
            this.areaList = areaList;
        },
    }
</script>

<style scoped>

    .mg-bottom {
        margin-bottom: 10px;
    }


    .address-popup{
        height: 90%;
        padding:20px 10px;
        background-color: #eee
    }



    .select-card{
        border: #DD1A21 1px solid;
    }

    .wrapper {
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
</style>
