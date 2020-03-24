<template>
    <div>

        <van-cell-group>
            <van-swipe>
                <van-swipe-item v-for="(image, index) in product.gallery" :key="index">
                    <img v-lazy="image"
                         fit="contain"
                         width="100%"/>
                </van-swipe-item>
            </van-swipe>
            <van-cell :border="false">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <span class="actual-price">¥{{product.retailPrice}}</span>
                    <span class="custom-title" style="color: #999;">¥<s>{{product.counterPrice}}</s></span>
                </template>
            </van-cell>
            <van-cell :border="false" class="brief-title">
                {{product.brief}}
            </van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 10px;">
            <van-cell v-if="selectSku === ''" @click="handleSpecificationSelect">
                请选择规格
            </van-cell>
            <van-cell v-else>
                {{selectSku}}dddd
            </van-cell>
        </van-cell-group>

        <van-popup
                v-model="specificationsSelectShow"
                round
                position="bottom"
                :style="{ height: '80%' }"
        />
        {{$route.params.id}}
    </div>
</template>

<script>
    import {loadProduct} from "../../api/api";

    export default {
        name: "Product",
        mounted(){
            this.getProduct();
        },
        methods: {
            getProduct(){
                loadProduct(this.$route.params.id).then(resp=>{
                    if (resp) {
                        this.product = resp.product;
                        this.specifications = resp.productSpecifications;
                        this.stock = resp.productStock;
                        this.attribute = resp.productAttribute;
                    }
                })
            },
            handleSpecificationSelect(){
                this.specificationsSelectShow = true;
            }
        },
        data(){
            return{
                product:'', //商品
                specifications:'', //规格
                attribute:'',// 属性
                stock:[],
                selectSku:'',
                specificationsSelectShow:false //是否显示规格选择框
            }
        }
    }
</script>

<style scoped>
    .actual-price{
        color: #DD1A21;
        font-size: 30px;
        font-weight: 700;
        margin-right: 5px;
    }
    .brief-title{
        font-size: 16px;
        color: #333;
        font-weight: 700;
        padding-top: 0px;
        padding-bottom: 0px;
    }
    .van-cell__value--alone{
        color: #333;
    }
</style>
