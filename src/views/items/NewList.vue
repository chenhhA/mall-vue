<template>
    <div>
        <van-cell-group class="title">
            热销商品
        </van-cell-group>

        <van-sticky class="nav">
            <van-row >
                <van-col :span="8"
                         @click="onSelectMenuChange('')"
                         :class="sortOption === ''? 'active': '' ">
                    默认排序
                </van-col>
                <van-col :span="8"
                         @click="onSelectMenuChange(1)"
                         :class="sortOption === 1? 'active': '' ">
                    价格升序
                </van-col>
                <van-col :span="8"
                         @click="onSelectMenuChange(2)"
                         :class="sortOption === 2? 'active': '' ">
                    价格降序
                </van-col>
            </van-row>
        </van-sticky>


        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
            <ProductList :products="products"></ProductList>

        </van-list>
    </div>
</template>

<script>
    import {addTotal, loadHotProduct} from "../../api/api";
    import ProductList from "../../components/ProductList";

    export default {
        name: "NewList",
        components: {ProductList},
        data() {
            return {
                page: {
                    size: 12,
                    pageNum: 1
                },
                products: [],
                finished: false,
                loading: true,
                sortOption: '',
                sortOptions: [
                    {text: '价格升序', value: 1},
                    {text: '价格降序', value: 2},
                    {text: '综合排序', value: ''},
                ],

            }
        },
        methods: {
            onLoad() {
                this.loading = true;
                loadHotProduct(this.page.pageNum, this.page.size, this.sortOption).then(resp => {
                    if (resp.length > 0) {
                        this.products = this.products.concat(resp);
                        this.loading = false;
                        this.page.pageNum += 1
                    } else {
                        this.loading = false;
                        this.finished = true;
                    }
                })
            },
            onSelectMenuChange(value) {
                this.sortOption = value
                this.resetData();
                this.onLoad();
            },
            resetData() {
                this.page = {
                    size: 12,
                    pageNum: 1,
                };
                this.products = [];
            },
        },
        created() {
            this.onLoad();
            addTotal()
        }
    }
</script>

<style scoped>
    .title{
        font-size: 20px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .nav{
        text-align: center;
        background-color: #fff;
        padding: 20px 0px;
    }

    .active{
        color: #DD1A21;
    }
</style>

