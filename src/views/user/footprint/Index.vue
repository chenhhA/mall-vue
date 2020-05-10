<template>

    <div>
        <van-index-bar :index-list="indexList">

        <div v-for="(value, key) in reArrData">
<!--            索引瞄点/日期-->
            <van-index-anchor :index="key">{{key}}</van-index-anchor>

<!--            当日浏览的商品-->
            <van-grid  :column-num="3">
                <van-grid-item v-for="product in value" >
                        <van-image :src="product.productImg" @click="onClickProduct(product.productId)"/>
                        <span class="grid-item-text">
                            <span style="float: left">
                                   ¥{{product.productPrice}}

                            </span>
<!--                            选择菜单-->
                            <van-icon
                                    style="float: right"
                                    class="left-button" name="ellipsis" @click="onSelectProduct(product)"/>
                        </span>

                </van-grid-item>

            </van-grid>
        </div>

        <van-action-sheet
                v-model="show"
                :actions="actions"
                cancel-text="取消"
                @select="onActionSheetSelect"
                @cancel="onCancel"
        />
        </van-index-bar>
    </div>
</template>

<script>
    import Toast from "vant/lib/toast";
    import {addProductToCollect, deleteFootprintById, getFootprint} from "../../../api/api";

    export default {
        created() {
            this.loadData();
        },
        name: "Index",
        data() {
            return {
                indexList:[], // 索引栏
                show:false, // 操作栏显隐
                actions: [
                    { name: '收藏' },
                    { name: '删除'}
                ], // 操作菜单项
                reArrData:{}, // 重新组织后的数据
               traces: [],
                selectProduct:{},
            }
        },
        methods:{
            onClickProduct(id){
                this.$router.push(`/product/${id}`);
            },
            // 将数据根据日期分组
            groupDataByDate(){
                this.traces.forEach(item=>{
                    item.addTime = this.formatDateReadable(item.addTime);

                    if (this.reArrData[item.addTime] != null) {
                        this.reArrData[item.addTime].push(item);
                    } else {
                        this.reArrData[item.addTime] = [];
                        this.reArrData[item.addTime].push(item);
                    }
                })
                this.indexList = Object.keys(this.reArrData);
            },
            onSelectProduct(product) {
                this.selectProduct = product;
                this.show = true;
            },
            onCancel(){
                this.show =false;
                this.selectProduct = {},
                Toast("已取消")
            },
            onActionSheetSelect(item){
                if (item.name === '收藏') {
                    console.log("收藏")
                    addProductToCollect(this.selectProduct.productId).then(resp=>{
                    })
                } else if (item.name === '删除') {
                    // todo:
                    //      1. 删除后不刷新整个页面
                    console.log('删除')
                    deleteFootprintById(this.selectProduct.id).then(resp=>{
                        this.selectProduct = {};
                        this.traces = [];
                        this.reArrData = {};
                        this.loadData();
                    })
                }
            },
            loadData(){
                getFootprint().then(resp=>{
                    if (resp) {
                        this.traces = resp.reverse();
                        this.groupDataByDate();
                    }
                })
            }
        },
    }
</script>

<style scoped>

    .grid-item-text{
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
    }
</style>
