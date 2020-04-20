<template>

    <div style="width: 100%">


<!--        过滤菜单-->
        <van-cell-group class="top-nav">
            <span>
                <span style="margin-right: 10px"
                      v-bind:class="{ highlightText: active === 'all' }"
                      @click="onClickAll">全部宝贝</span>
                <span
                        @click="onClickDiscount"
                        v-bind:class="{ highlightText: active === 'discount' }"

                >有优惠</span>
            </span>

            <span  class="top-nav-right" @click="showFilter = true">
                <span>筛选</span>
            </span>

        </van-cell-group>

<!--        渲染列表-->
        <van-cell-group v-for="item in filterCollect" class="mg-bottom">
            <van-swipe-cell>

                <van-row :gutter="20" >
                    <!--            图片-->
                    <van-col span="8">
                        <van-image :src="item.productImg">
                        </van-image>
                    </van-col>
                    <!--            其他描述信息(价钱,商品名等)-->
                    <van-col span="16">
                        <span>{{item.productName}}</span>
                        <br/>
                        <span class="grey-text">
                    {{item.productDesc}}
                </span>
                        <br/>
                        <span class="price-text">
                    ￥{{item.currentPrice}}
                    <van-tag
                            v-if="item.isDiscount"
                            type="warning">比收藏时降价{{item.initPrice-item.currentPrice}}元</van-tag>
                </span>
                    </van-col>
                </van-row>

<!--                删除按钮-->
                <template #right>
                    <van-button square @click="onDelete(item.id)" text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>

        </van-cell-group>

<!--        过滤弹出层-->
        <van-popup class="filter-popup" v-model="showFilter" position="right" :style="{ width: '60%' ,height:'100%'}" >
            <div style="height: 15%">

            </div>

            <div>
                <span>所有状态</span>
                <br/>
                <van-button class="mg-right mg-bottom"
                            @click="this.filterCondition.isDiscount = false"
                            :type="filterCondition.isDiscount?'default':'danger'" >所有</van-button>
                <van-button class="mg-right mg-bottom"
                            @click="onClickDiscount"
                            :type="filterCondition.isDiscount?'danger':'default'" >有优惠</van-button>
                <van-divider />

                <span>所有类目</span>
                <br/>
                <van-button class="mg-right mg-bottom"
                            @click="onClickAllCategory"
                            :type="filterCondition.categoryId == ''?'danger':'default'">所有</van-button>
                <van-button class="mg-right mg-bottom"  type="default"
                            :type="filterCondition.categoryId == category.id?'danger':'default'"
                            @click="onCategorySelect(category.id)"
                         v-for="category in categories">
                    {{category.name}}{{category.count}}</van-button>

                <van-button type="warning" @click="onClickReset">重置</van-button>
                <van-button type="danger" @click="onClickConfirm">确定</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {deleteFromCollect, getCollect} from "../../../api/api";

    export default {
        name: "Index",
        data(){
            return {
                showFilter:false,
                active:'all', // all->全部商品, discount==有优惠的商品
                collect: [],
                filterCollect:[],
                filterCondition:{
                    categoryId:'',
                    isDiscount: false, // true->仅展示优惠商品,false->所有商品
                },
                categories:{},
            }
        },
        methods:{
            onDelete(id){
                deleteFromCollect(id).then(resp=>{
                    if (resp) {
                        // 删除本地数据
                        for (let i = 0; i < this.collect.length; i++) {
                            let temp = this.collect[i];
                            if (temp.id = id) {
                                this.collect.splice(i,1);
                                break
                            }
                        }
                        // 重新过滤数据
                        this.filterCollectItem();
                    }
                })
            },
            onClickAll() {
                this.active = 'all';
                this.filterCondition.isDiscount = false;
                this.filterCollectItem();
            },
            onClickConfirm(){
                this.filterCollectItem();
                this.showFilter = false;
            },
            onClickReset(){
              this.filterCondition.categoryId = '';
                this.filterCondition.isDiscount = false;
            },
            onClickAllCategory(){
                this.filterCondition.categoryId =  '';
            },
            onClickDiscount(){
                this.active = 'discount';
                this.filterCondition.isDiscount = true;
                this.filterCollectItem();
            },
            filterCollectItem() {
                this.filterCollect = [];
                this.collect.forEach(item=>{

                    let categoryResult = true;
                    let discountResult = true;

                    // 过滤条件-分类不为空, 为空则跳过该判断
                    if (this.filterCondition.categoryId != '') {
                        if (!(item.categoryId == this.filterCondition.categoryId)) {
                            console.log("just")
                            categoryResult = false;
                        }
                    }
                    // 如果设置了过滤条件-折扣, 判断是否为折扣商品
                    if (this.filterCondition.isDiscount)
                        if (!item.isDiscount)
                            discountResult = false;

                    if (categoryResult&&discountResult)
                        this.filterCollect.push(item);
                })
            },
            initCategory(){
                this.collect.forEach(item=>{
                    let categoryId = item.categoryId;
                    let category = this.$store.getters.getCategoryById(categoryId);
                    if (this.categories[categoryId] == null) {
                        this.categories[categoryId] = {id: categoryId, name: category.name, count: 1};
                    } else {
                        this.categories[categoryId].count += 1
                    }
                })
            },
            onCategorySelect(id) {
                this.filterCondition.categoryId = id;
            },
            loadData(){
                getCollect().then(resp=>{
                    this.collect = resp;
                    this.filterCollectItem();
                    this.initCategory();
                })
            }



        },
        mounted () {
            this.loadData();
        }
    }
</script>

<style scoped>
.grey-text{
    color: rgb(153, 153, 153);
    font-size: 13px;
}

    .price-text{
        color: rgb(255, 80, 0);
        font-size: 15px;
    }

    .mg-bottom{
        margin-bottom: 10px;
    }
    .mg-right{
        margin-right: 5px;
    }
    .top-nav{
        height: 40px;
        padding: 0px 12px;
        line-height: 40px;
    }
    .top-nav-right{
        float: right;
    }

    .highlightText{
        color: rgb(255, 80, 0);
        font-size:16px;
    }

    .filter-popup{
        padding: 20px 20px;
    }
.delete-button {
    height: 100%;
}
</style>
