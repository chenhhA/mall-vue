<template>
    <div>

        <van-cell-group>
            <!--            商品划动图片展示-->
            <van-swipe>
                <van-swipe-item v-for="(image, index) in product.gallery" :key="index">
                    <img v-lazy="image"
                         fit="contain"
                         width="100%"/>
                </van-swipe-item>
            </van-swipe>

            <!--            商品价格-->
            <van-cell :border="false">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <span class="actual-price">¥{{product.retailPrice}}</span>
                    <span class="custom-title" style="color: #999;">¥<s>{{product.counterPrice}}</s></span>
                </template>
            </van-cell>

            <!--            商品间接-->
            <van-cell :border="false" class="brief-title">
                {{product.brief}}
            </van-cell>
        </van-cell-group>


        <!--        商品规格-->
        <van-cell-group style="margin-top: 10px;">

            <van-cell @click="handleSpecificationSelect">
                {{selectSkuValue.length=== 0 ? '请选择规格': selectSkuValue|formatArrayToText}}
            </van-cell>
            <van-cell>
                服务:
                <ul>
                    <li>* 满99元包邮</li>
                    <li>* 7天无理由退货</li>
                </ul>
            </van-cell>


        </van-cell-group>

        <!--商品参数-->
        <van-cell-group style="margin-top: 10px;margin-bottom: 10px">
            <van-cell>
                商品参数
            </van-cell>
            <van-cell v-for="a in attribute" :title="a.attribute" :value="a.value">
            </van-cell>
        </van-cell-group>

        <van-tabs v-model="active">
            <!--            商品详情tab-->
            <van-tab title="商品详情" name="info">
                <div v-html="product.detail " class="item_desc">
                    <div class="item_desc_wrap" v-if="product.detail" v-html="product.detail"></div>
                    <div class="item_desc_wrap" v-else style="text-align: center;">
                        <p>无详情</p>
                    </div>
                </div>
            </van-tab>
            <!--            商品评价tab-->
            <van-tab title="评论" name="comment">
                <van-list
                        style="margin-top: 10px"
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="loadComment">

                    <CommentCard
                            v-for="comment in comments"
                            :comment="comment"></CommentCard>

                </van-list>
            </van-tab>
            <van-tab title="常见问题" name="question">
                <Question></Question>
            </van-tab>
        </van-tabs>


        <div style="height: 200px"></div>
        <div class="bottom-nav">
            <van-button v-if="isFavorite" icon="like"
                        @click="removeFromCollect"
                        type="default" style="width: 24%"></van-button>
            <van-button v-else icon="like-o"
                        @click="addToCollect"
                        type="default" style="width: 24%"></van-button>
            <van-button type="default" @click="onClickPurchase" style="width:38%">
                立即购买
            </van-button>
            <van-button type="danger" style="width: 38%"  @click="addToCart">
                加入购物车
            </van-button>
        </div>

        <!-- sku选择 -->
        <van-popup
                v-model="specificationsSelectShow"
                round
                position="bottom"
                :style="{ height: '80%'}">
            <div style="padding:20px 10px">
                <van-row>
                    <van-col>
                        <van-image
                                width="150"
                                height="150"
                                :src="spImage"/>
                    </van-col>

                    <van-col style="margin-left: 20px ;padding-top:90px">
                        <span style="color: #DD1A21">
                        价格: ¥{{getProductPrice}}
                            </span>
                        <!--                        {{selectProduct.productStock === null?product.retailPrice:selectProduct.productStock.price}}-->
                        <br>
                        {{selectSkuValue.length!==specifications.length? '请选择规格数量' :selectSkuValue|formatArrayToText}}
                        <br/>
                        <span v-if="selectSkuValue.length===specifications.length">
                                                    库存: {{this.selectProduct.productStock.stock}}{{this.product.unit}}
                        </span>
                    </van-col>

                </van-row>

                <!--规格值渲染-->
                <div v-for="specification in specifications" class="mg-bottom">
                    <van-row class="mg-bottom">
                        {{specification.specification }}
                    </van-row>
                    <van-row>


                        <van-button type="default" v-for="spValue in specification.values"
                                    class="mg-right"
                                    plain
                                    :color="selectSku[specification.id] ==  spValue.id? '#DD1A21' : ''"
                                    :text="spValue.value"
                                    :icon="spValue.picUrl"
                                    @click="handleSpClick(specification.id, spValue)"
                        ></van-button>
                    </van-row>
                </div>
                <!--数量选择-->
                <van-row class="mg-bottom">
                    <van-stepper v-model="selectProduct.count" step="1" style="margin-top: 5px"/>
                </van-row>

                <div class="sku-nav" style="display: flex; justify-content: center">
                    <van-button type="warning" style="width:38%;margin-right: 10px" round @click="onClickPurchase">
                        立即购买
                    </van-button>
                    <van-button type="danger" style="width: 38%" @click="addToCart" round>
                        加入购物车
                    </van-button>
                </div>
            </div>

        </van-popup>
        {{$route.params.id}}
    </div>
</template>

<script>
    import {
        addItemToCart,
        addProductToCollect, addTotal,
        deleteFromCollect, getCommentByProductId,
        loadProduct,
        queryFavoriteStatus
    } from "../../api/api";
    import SkuRadio from "../../components/SkuRadio";
    import Toast from "vant/lib/toast";
    import Question from "../../components/Question";
    import CommentCard from "../../components/CommentCard";

    export default {
        name: "Product",
        components: {CommentCard, Question, SkuRadio},
        created() {
            this.getProduct();
            this.productId = this.$route.params.id;
            this.isLogin = this.$store.state.loginStatus;
            this.loadFavoriteStatus();
            this.loadComment();
            addTotal()
        },
        data() {
            return {
                productId: '',
                active: 'info',
                product: '', //商品
                specifications: '', //规格
                attribute: '',// 属性
                stock: [], //库存
                selectSku: {}, // 可选择的规格id-valueId
                selectSkuValue: [], // 选中的规格的值
                selectProduct: {
                    productId: '',
                    productStock: {},
                    productStockId: '',
                    count: ''
                },
                finished: false,
                favoriteInfo: {}, // 收藏对象
                isLogin: false,
                specificationsSelectShow: false, //是否显示规格选择框,
                isFavorite: false,
                comments: [],
                page: {
                    size: 20,
                    pageNum: 1
                },
                loading: true,
            }
        },
        methods: {
            // 加载用户是否收藏该商品
            loadFavoriteStatus() {
                if (this.isLogin) {
                    queryFavoriteStatus(this.productId).then(resp => {
                        if (resp) {
                            this.favoriteInfo = resp;
                            this.isFavorite = true;
                        }
                    });
                }
            },
            // 加载商品评论
            loadComment() {
                getCommentByProductId(this.productId, this.page.pageNum, this.page.size).then(resp => {
                    if (resp.length > 0) {
                        this.comments = this.comments.concat(resp);
                        this.loading = false;
                        this.page.pageNum += 1;
                    } else {
                        this.loading = false;
                        this.finished = true;
                    }
                })
            },
            // 添加商品到收藏夹
            addToCollect() {
                if (this.isLogin) {
                    addProductToCollect(this.productId).then(resp => {
                        if (resp) {
                            this.loadFavoriteStatus();
                        }
                    });
                } else {
                    this.$router.push(`/login?redirectUrl=/product/${this.productId}`)
                }
            },

            // 从收藏夹移除商品
            removeFromCollect() {
                if (this.isLogin) {
                    deleteFromCollect(this.favoriteInfo.id).then(resp => {
                        if (resp) {
                            this.isFavorite = false;
                        }
                    });
                } else {
                    this.$router.push(`/login?redirectUrl=/product/${this.productId}`)
                }

            },

            // 添加到购物车
            addToCart() {
                // 判断用户是否已经选择商品
                if (this.selectProduct.productStockId === '') {
                    Toast.fail('请选择商品规格后重试');
                    return
                }

                // 判断库存是否充足
                if (this.selectProduct.productStock.stock >= 0) {
                    if (this.selectProduct.productStock.stock - this.selectProduct.count <= 0) {
                        Toast.fail('选择数量超过当前库存,请修改购买数量');
                    } else {
                        addItemToCart(this.selectProduct.productId, this.selectProduct.productStockId,
                            this.selectProduct.count).then(resp => {
                        })
                    }
                } else {
                    Toast.fail('商品库存不足,请选择其他规格');
                }

            },
            // 加载商品
            getProduct() {
                loadProduct(this.$route.params.id).then(resp => {
                    if (resp) {
                        this.product = resp.product;
                        this.specifications = resp.productSpecifications;
                        this.stock = resp.productStock;
                        this.attribute = resp.productAttribute;
                        this.initSelectSku();
                        this.selectProduct.productId = this.product.id;
                    }
                })
            },
            // 展示sku选择框
            handleSpecificationSelect() {
                this.specificationsSelectShow = true;
            },
            // 初始化
            initSelectSku() {
                this.specifications.forEach(sp => {
                    this.selectSku[sp.id] = 0;
                })
            },
            //
            handleSpClick(spId, spValue) {
                this.selectSku[spId] = spValue.id;
                this.selectStock();
            },
            /**
             * 根据selectSku中规格值的id确定库存商品
             */
            selectStock() {
                // 构造规格值字符数组例如 ['月幕白','8GB+128GB]
                this.selectSkuValue = [];
                for (let o in this.selectSku) {
                    this.specifications.forEach(sp => {
                        if (sp.id == o) {
                            sp.values.forEach(spV => {
                                if (spV.id == this.selectSku[o]) {
                                    this.selectSkuValue.push(spV.value);
                                }
                            })
                        }
                    })
                }
                // 和库存值字符串作对比,查找是否有可选择的库存
                if (this.selectSkuValue.length == this.specifications.length) {
                    let selectSkuId;
                    this.stock.forEach(b => {
                        if (this.compareArray(b.specifications, this.selectSkuValue)) {
                            this.selectProduct.productStockId = b.id;
                            this.selectProduct.productStock = b;
                        }
                    })
                }
            },

            // 点击购买商品
            onClickPurchase() {
                if (this.selectProduct.productStockId === '') {
                    this.specificationsSelectShow = true;
                    Toast("请选择商品规格")
                } else {
                    this.$router.push(`/order/preview?from=2&productId=${this.selectProduct.productId}&skuId=${this.selectProduct.productStockId}&buyNum=${this.selectProduct.count}`)
                }
            }
        },

        computed: {
            getProductPrice: function () {
                if (this.selectProduct.productStockId === '') {
                    return this.product.retailPrice;
                } else {
                    return this.selectProduct.productStock.price;
                }
            },
            spImage: function () {
                if (this.selectProduct.productStock.iconUrl != null) {
                    return this.selectProduct.productStock.iconUrl;
                }
                return this.product.picUrl;
            }
        }
    }
</script>

<style lang="scss" scoped>


    .item_desc {
        background-color: #fff;
        /*/deep/ p {*/
        /*    padding: 0 10px;*/
        /*    margin-block-start: 0 !important;*/
        /*    margin-block-end: 0 !important;*/
        /*}*/
        /deep/ img {
            width: 100%;
            object-fit: scale-down;
            height: 100%;
        }
    }

    .actual-price {
        color: #DD1A21;
        font-size: 30px;
        font-weight: 700;
        margin-right: 5px;
    }

    .brief-title {
        font-size: 16px;
        color: #333;
        font-weight: 700;
        padding-top: 0px;
        padding-bottom: 0px;
    }

    .van-cell__value--alone {
        color: #333;
    }

    .active {
        color: #DD1A21;
    }

    .bottom-nav {
        position: fixed;
        width: 100%;
        bottom: 0px;
    }

    .mg-bottom {
        margin-bottom: 8px;
    }

    .mg-right {
        margin-right: 5px;
    }

    .sku-nav {
        position: fixed;
        width: 100%;
        bottom: 20px;
    }

    .select-sp {
        border: 2px solid #DD1A21;
        color: #DD1A21
    }
</style>
