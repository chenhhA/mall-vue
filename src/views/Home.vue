<template>
    <div>
        <van-search v-model="value" placeholder="请输入搜索关键词"/>
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
                <van-grid-item v-for="category in categories" :key="category.id">
                    <van-image
                            :src="category.icon" />
                    <span class="van-grid-item__text">{{category.name}}</span>
                </van-grid-item>
            </van-grid>
        </van-cell-group>

        <!--新品首发-->
        <van-cell-group style="margin-top:10px" :center="false">
            <van-cell title="新品首发" is-link value="更多" />
            <van-grid :column-num="3" :border="false" :gutter="5" >
                <van-grid-item v-for="product in newProducts"
                               :key="product.id"
                                @click="handleProductClick(product.id)">
                    <van-image
                            :src="product.picUrl" />
                    <span class="van-grid-item__text">{{product.name}}</span>
                    <span class="van-grid-item__text">
                        <span id="count-price">
                                                ¥{{product.retailPrice}}
                        </span>
                        <span id="actual-price">
                            <s>{{product.counterPrice}}</s>
                        </span>
                    </span>
                </van-grid-item>
            </van-grid>
        </van-cell-group>

        <!--热销商品-->
        <van-cell-group style="margin-top:10px"
                        :center="false"
                        @click="handleProductClick(product.id)">
            <van-cell title="热销商品" is-link value="更多" />
            <van-grid :column-num="3" :border="false" :gutter="5" >
                <van-grid-item v-for="product in hotProducts" :key="product.id">
                    <van-image
                            :src="product.picUrl" />
                    <span class="van-grid-item__text">{{product.name}}</span>
                    <span class="van-grid-item__text">
                        <span id="count-price">
                                                ¥{{product.retailPrice}}
                        </span>
                        <span id="actual-price">
                            <s>{{product.counterPrice}}</s>
                        </span>
                    </span>
                </van-grid-item>
            </van-grid>
        </van-cell-group>


    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import Tabbar from "../components/Tabbar/Tabbar";
    import {loadAd, loadHotProduct, loadNewProduct} from "../api/api";

    export default {
        name: 'Home',
        components: {
            Tabbar,
            HelloWorld
        },
        mounted(){
            this.init();

        },
        data(){
            return{
                ads:[], // 轮播图片,
                newProducts:[], //新品列表,
                hotProducts:[], //热销商品
            }
        },
        methods:{
            handleProductClick(id){
                console.log("click" + id);
                this.$router.push("/product/" + id);
            },
            init(){
                this.loadAd();
                this.loadNewProducts();
                this.loadHotProduct();
                console.log(this.categories)
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
            }
        },
        computed:{
            categories: function () {
                return this.$store.getters.getCategory;
            }
        },

    }
</script>
