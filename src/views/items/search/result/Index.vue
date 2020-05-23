<template>
    <div>
        <van-sticky>
        <van-row class="nav-menu" :gutter="5">
            <van-col :span="3"  style="text-align: center; padding: 5px 0;" @click="onClickHome">
                <van-icon name="wap-home-o" size="30px"></van-icon>
            </van-col>
            <van-col :span="21" @click="onclickSearch">
                <van-search v-model="searchParams.keyword" placeholder="请输入搜索关键词" width="80%" />
            </van-col>
        </van-row>

            <van-dropdown-menu style="background-color: #fafafa">
                <van-dropdown-item
                        @change="onSelectMenuChange"
                        v-model="searchParams.searchType" :options="typeOption" />
                <van-dropdown-item
                        @change="onSelectMenuChange"
                        v-model="searchParams.sortOption" :options="sortOption" />
                <van-dropdown-item
                        @change="onSelectMenuChange"
                        v-model="searchParams.categoryId" :options="categoryOption" />
            </van-dropdown-menu>
        </van-sticky>

        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="loadData">

        <van-card
                @click="onClickProduct(product.id)"
                v-for="product in products"
                :price="formatPrice(product.retailPrice)"
                :desc="product.brief"
                :title="product.name"
                :thumb="product.picUrl"
                :origin-price="formatPrice(product.counterPrice)">
            <template #tag>
                <van-tag plain
                         v-if="product.isHot"
                         type="danger">热销</van-tag>
                <van-tag v-else-if="product.isNew"
                         plain type="danger">新品</van-tag>
            </template>
        </van-card>
        </van-list>


    </div>
</template>

<script>
    import {searchProduct} from "../../../../api/api";

    export default {
        name: "Index",
        data(){
            return{
                loading:true,
                finished: false,
                products:[],
                searchParams:{
                    searchType:1,
                    keyword:'',
                    sortOption: 1,
                    categoryId: 0
                },
                typeOption: [
                    { text: '全部商品', value: 1 },
                    { text: '新款商品', value: 2 },
                    { text: '热销商品', value: 3 },
                ],
                sortOption: [
                    { text: '默认排序', value: 1 },
                    { text: '价格升序', value: 2 },
                    { text: '价格降序', value: 3 },
                ],
                categoryOption: [
                    { text: '所有分类', value: 0 },
                ],
                page:{
                    size: 10,
                    pageNum: 1,
                },
                categories:[],

            }
        },
        methods:{
            onclickSearch(){
                this.$router.push("/search");
            },
            onClickHome(){
                this.$router.push("/");
            },
            onSelectMenuChange(value){
                console.log("change")
                this.resetData();
                this.loadData();
            },
            onClickProduct(id){
                this.$router.push(`/product/${id}`)
            },
            resetData(){
                this.page = {
                    size: 10,
                    pageNum: 1,
                };
                this.products = [];
            },
            loadData(){
                this.loading = true;
                searchProduct(this.searchParams, this.page).then(resp=>{
                    if (resp.object.length > 0) {
                        this.products = this.products.concat(resp.object);
                        this.loading = false;
                        this.page.pageNum += 1;
                    } else {
                        this.loading = false;
                        this.finished = true;
                    }
                })
            },
            setCategoryOption(){
                for (let i = 0; i < this.categories.length; i++) {
                    for (let j = 0; j < this.categories[i].children.length; j++) {
                        let temp = {}
                        temp['text'] = this.categories[i].children[j].name;
                        temp['value'] = this.categories[i].children[j].id;
                        this.categoryOption.push(temp);
                    }
                }
            }
        },
        created() {
            this.searchParams.keyword= this.$route.query.keyword;
            this.categories = this.$store.state.categories;
            this.setCategoryOption()
            this.loadData();
        }
    }
</script>

<style scoped>
.nav-menu{
    background-color: #ffffff;
}

.search-nav{
    text-align: center;
    background-color: #fafafa;
    font-size: 14px;
    padding: 12px 0px
}

.highlightText{
    color: #DD1A21;
}
.count-price{
    color: #DD1A21;
}
</style>
