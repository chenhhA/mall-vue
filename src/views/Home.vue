<template>
    <div>
        <van-search  placeholder="请输入搜索关键词" @click="onClickSearch"/>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in ads" :key="index" @click="handleAdClick(image)">
                <img v-lazy="image.picUrl"
                width="100%"
                height="200px"/>
            </van-swipe-item>
        </van-swipe>

        <!--分类导航框-->
        <van-cell-group>
            <van-grid :column-num="4" :border="false" :gutter="5" >
                <van-grid-item v-for="category in categories" :key="category.id" @click="handleCategoryClick(category.id)">
                    <van-image
                            :src="category.icon" />
                    <span class="van-grid-item__text">{{category.name}}</span>
                </van-grid-item>
                <van-grid-item :key="9" @click="$router.push('/coupon')">
                    <van-image src="https://yanxuan.nosdn.127.net/15addf04475e65e0c0eb854f8a7c27aa.gif?imageView&thumbnail=200x200"/>
                    <span class="van-grid-item__text">领券中心</span>
                </van-grid-item>
            </van-grid>
        </van-cell-group>

        <!--新品首发-->
        <van-cell-group style="margin-top:10px" :center="false">
            <van-cell title="新品首发" is-link value="更多" to="/new"/>
            <van-grid :column-num="3" :border="false" :gutter="5" >
                <van-grid-item v-for="product in newProducts"
                               :key="product.id"
                                @click="handleProductClick(product.id)">
                    <van-image
                            width="100"
                            height="100"
                            fit="contain"
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

        <!--热销商品-->
        <van-cell-group style="margin-top:10px"
                        :center="false"
                       >
            <van-cell title="热销商品" is-link value="更多" to="/hot"/>
            <van-grid :column-num="3" :border="false" :gutter="5" >
                <van-grid-item v-for="product in hotProducts"
                               @click="handleProductClick(product.id)"
                               :key="product.id">
                    <van-image
                            width="100"
                            height="100"
                            fit="contain"
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

        <ProductGrid :current-category="1"></ProductGrid>


    </div>
</template>
<script>
    // @ is an alias to /src
    import Tabbar from "../components/Tabbar/Tabbar";
    import {addIndex, loadAd, loadHotProduct, loadNewProduct} from "../api/api";
    import ProductGrid from "../components/ProductGrid";

    export default {
        name: 'Home',
        components: {
            ProductGrid,
            Tabbar,
        },
        mounted(){
            this.init();
            addIndex();

        },
        data(){
            return{
                ads:[], // 轮播图片,
                newProducts:[], //新品列表,
                hotProducts:[], //热销商品
            }
        },
        methods:{
            handleCategoryClick(id) {
                this.$router.push("/category/" + id);
            },
            handleProductClick(id){
                this.$router.push("/product/" + id);
            },
            init(){
                this.loadAd();
                this.loadNewProducts();
                this.loadHotProduct();
            },
            handleAdClick(id) {
                this.$router.push("/product/" + id.id);
            },
            loadAd(){
                loadAd(1, 0).then(resp=>{
                    if (resp) {
                        this.ads = resp;
                    }
                })
            },
            loadNewProducts(){
                loadNewProduct().then(resp=>{
                    if (resp){
                        this.newProducts = resp;
                    }
                })
            },
            loadHotProduct(){
                loadHotProduct().then(resp=>{
                    if (resp) {
                        this.hotProducts = resp;
                    }
                })
            },
            onClickSearch(){
                this.$router.push({path: '/search',query: {redirect: '/'}})
            }
        },
        computed:{
            categories: function () {
                return this.$store.getters.getCategory;
            }
        },

    }
</script>


<style scoped>
.count-price{
    color: #DD1A21;
}
</style>
