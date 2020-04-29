<template>
    <div>

        <!--渲染二级分类商品: 默认展示6个-->
        <van-cell-group style="margin-top:10px" :center="false">
            <van-cell :title="categories.name" is-link value="更多" @click="handleToCategory"/>
            <van-grid :column-num="3" :border="false" :gutter="5" >
                <van-grid-item v-for="product in products"
                               :key="product.id"
                               @click="onClickProduct(product.id)">
                    <van-image
                            :src="product.picUrl" />
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

    </div>
</template>

<script>
    import {loadProductByCategoryId} from "../api/api";

    export default {
        name: "ProductGrid",
        props: {
            currentCategory: [Number],
            parentId:[Number],
        },
        data(){
            return{
                products:[],
                page:1,
                size:6
            }
        },
        computed: {
            categories: function () {
                return this.$store.getters.getCategoryById(this.currentCategory);
            }
        },
        mounted(){
            this.loadData();
        },
        methods:{
            loadData(){
                loadProductByCategoryId(this.currentCategory, this.page, this.size).then(resp => {
                    this.products = resp;
                });
            },
            handleToCategory() {
                this.$router.push(
                    '/item/list?category=' + this.parentId +
                    "&subCategoryId=" + this.currentCategory)

            },
            onClickProduct(id){
                this.$router.push("/product/" + id);
            }
        }
    }
</script>

<style scoped>
    .count-price{
        color: #DD1A21;
    }
</style>
