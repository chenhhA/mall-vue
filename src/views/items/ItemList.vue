<template>
    <!-- 二级分类商品列表展示-->
    <div>
        <van-tabs v-model="active"    sticky swipeable lazy-render>
            <van-tab v-for="(category ,index) in categoryList.children "
                     :title="category.name"
                    :name="category.id">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad">
                    <ProductList :products="products"></ProductList>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import ProductList from "../../components/ProductList";
    import {loadProductByCategoryId} from "../../api/api";
    export default {
        name: "ItemList",
        components: {ProductList},
        created(){
            this.parentId = parseInt(this.$route.query.category);
            this.currentCategoryId = parseInt(this.$route.query.subCategoryId);
            this.active = this.currentCategoryId;
            this.categoryList = this.$store.getters.getCategoryById(this.parentId);
            this.onLoad();
        },
        data(){
            return{
                currentCategoryId:'',
                parentId:'',
                active:0,
                categoryList:[],
                page: {
                    size: 12,
                    pageNum: 1
                },
                products:[],
                finished:false,
                loading : true,
            }
        },
        watch: {
            active: function (val) {
            },
        },
        methods:{
            alertActive(val) {
                this.active = val;
            },
            onLoad(){
                this.loading = true;
                loadProductByCategoryId(this.currentCategoryId, this.page.pageNum, this.page.size).then(resp=>{
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
        }
    }
</script>

<style scoped>

</style>
