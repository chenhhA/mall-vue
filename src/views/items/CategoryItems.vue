<template>
    <!-- 一级分类详情界面-->
    <div>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in ads" :key="index" @click="handleAdClick(image)">
                <img v-lazy="image.picUrl"
                     width="100%"
                     height="200px"/>
            </van-swipe-item>
        </van-swipe>

        <!--渲染各个子分类的6个商品-->
        <ProductGrid v-for="category in categories.children"
                     :parent-id="currentCategoryId"
                     :current-category="category.id"></ProductGrid>
    </div>
</template>

<script>
    import {loadAd} from "../../api/api";
    import ProductGrid from "../../components/ProductGrid";

    export default {
        name: "CategoryItems",
        components: {ProductGrid},
        created(){
            this.currentCategoryId = this.$route.params.id;
            this.loadAds();
        },
        data(){
            return{
                currentCategoryId:'',
                ads:[],
            }
        },
        computed: {
            categories: function () {
                return this.$store.getters.getCategoryById(this.currentCategoryId);
            },

        },
        methods:{
            loadAds(){
                loadAd(1, this.currentCategoryId).then(resp => {
                    if (resp) {
                        this.ads = resp;
                    }
                });
            },
            handleAdClick(image) {
                this.$router.push("/product/" + image.productId);
            },
        }
    }
</script>

<style scoped>

</style>
