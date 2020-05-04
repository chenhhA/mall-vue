<template>
<div>
    <van-search v-model="value"
                searchHint
                show-action
                @search="onSearch"
                @cancel="onCancel"
                :placeholder="searchHint" />

    <van-cell-group style="padding: 10px 0px 10px 12px" class="mg-bottom">
        <span class="hint-text">历史记录</span>
        <br/>
<!--        -->
        <van-tag plain
                 class="search-tag mg-bottom mg-top"
                 size="medium"
                 v-for="history in searchHistories">{{history}}</van-tag>
    </van-cell-group>

    <van-cell-group style="padding: 10px 0px 10px 12px">
        <span class="hint-text">历史记录</span>
        <br/>
        <van-tag plain
                 :type="history.score>=10? 'danger':'default'"
                 class="search-tag mg-bottom mg-top"
                 size="medium"
                 v-for="history in searchHistories">{{history.value}}</van-tag>
    </van-cell-group>
</div>
</template>

<script>
    import {getHotSearch} from "../../../api/api";

    export default {
        name: "Index",
        data(){
            return{
                value:'',
                searchHint:'请输入搜索关键词',
                localSearchHistory:[], // 本地搜索记录
                searchHistories:[], // 服务端近期搜索记录
                redirectUrl:'',
                searchObject: {
                    displayType:1, // 1->综合 ,2->价格
                    enableSort: 0, // 0->默认排序, 1->升序, 2->降序
                    enableCustomizePrice: false, // 是否启用自定义价格区间
                    startPrice:0,
                    endPrice:0,
                    searchText:'', //搜索关键词
                    page: 1,
                    size:10,
                }
            }
        },
        methods:{
            onCancel(){
                this.$router.push(this.redirectUrl)
            },
            onSearch(){

            }
        },
        created() {
            this.redirectUrl = this.$route.query.redirect;
            getHotSearch().then(resp=>{
                if (resp) {
                    this.searchHistories = resp;
                }
            })
        }
    }
</script>

<style scoped>
.hint-text{
    color:rgb(153, 153, 153);
    padding-bottom: 10px;
    font-size: 16px;
}
    .search-tag{
        margin-right: 10px;
    }
    .mg-bottom{
        margin-bottom: 10px;
    }

    .mg-top{
        margin-top:10px;
    }
</style>
