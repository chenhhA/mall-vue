<template>
    <!-- 二级分类商品列表 -->
    <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
    >


        <van-cell-group style="margin-top:10px" :center="false">
            <van-grid :column-num="2" :border="false" :gutter="10">
                <van-grid-item v-for="product in products"
                               :key="product.id"
                               @click="handleProductClick(product.id)">
                    <van-image
                            :src="product.picUrl"/>
                    <span class="van-grid-item__text">{{product.name}}</span>
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
    </van-list>
</template>

<script>
    import {loadProductByCategoryId} from "../api/api";

    export default {
        name: "ProductList",
        props: {
            categoryId: [Number],

        },
        data(){
            return{
                page: {
                    size: 6,
                    pageNum: 1
                },
                products:[],
                finished:false,
                loading : true,

            }
        },
        methods:{
            onLoad(){
                this.loading = true;
                loadProductByCategoryId(this.categoryId, this.page.pageNum, this.page.size).then(resp=>{
                    if (resp.length > 0) {
                        this.products = this.products.concat(resp);
                        this.loading = false;
                        this.page.pageNum +=1
                    } else {
                        this.loading = false;
                        this.finished = true;
                    }
                })
            },
            handleProductClick(id){
                this.$router.push("/product/" + id);
            },
        },
        created(){
            this.onLoad();
        }
    }
</script>

<style scoped>
    .count-price{
        color: #DD1A21;
    }
</style>
