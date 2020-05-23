<template>
    <!-- 商品列表 -->

        <van-cell-group style="margin-top:10px" :center="false">
            <van-grid :column-num="2" :border="false" :gutter="10">
                <van-grid-item v-for="product in products"
                               :key="product.id"
                               @click="handleProductClick(product.id)">
                    <van-image
                            :src="product.picUrl"/>
                    <span style="float: right">{{product.name}}</span>
                    <span class="van-grid-item__text">{{product.brief | countDownStr}}</span>
                    <span class="van-grid-item__text">
                        <span class="count-price">
                                                ¥{{product.retailPrice}}
                        </span>
                        <span class="actual-price">
                            <s>{{product.counterPrice}}</s>
                        </span>
                    </span>
                </van-grid-item>
            </van-grid>
        </van-cell-group>
</template>

<script>
    import {loadProductByCategoryId} from "../api/api";

    export default {
        name: "ProductList",
        props: {
            products: [Array],
        },
        data(){
            return{

            }
        },
        methods:{
            handleProductClick(id){
                this.$router.push("/product/" + id);
            },
        },
    }
</script>

<style scoped>
    .count-price{
        color: #DD1A21;
    }
</style>
