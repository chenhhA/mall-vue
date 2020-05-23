<template>
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
    export default {
        name: "HotList",
        data(){
            return{
                page: {
                    size: 12,
                    pageNum: 1
                },
                products:[],
                finished:false,
                loading : true,

            }
        },
        methods:{
            loadData(){

            }
        },
        created() {
            this.load();
        }
    }
</script>

<style scoped>

</style>
