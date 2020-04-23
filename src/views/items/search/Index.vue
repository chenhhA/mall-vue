<template>
<div>
    <van-search v-model="value"
                searchHint
                show-action
                @search="onSearch"
                @cancel="onCancel"
                :placeholder="searchHint" />

    {{redirectUrl}}
    <van-cell-group style="padding: 10px 0px 10px 12px" class="mg-bottom">
        <span class="hint-text">历史记录</span>
        <br class="mg-bottom"/>
<!--        -->
        <van-tag plain
                 class="search-tag mg-bottom"
                 size="medium"
                 v-for="history in searchHistories">{{history}}</van-tag>
    </van-cell-group>

    <van-cell-group style="padding: 10px 0px 10px 12px">
        <span class="hint-text">历史记录</span>
        <br class="mg-bottom"/>
        <!--        -->
        <van-tag plain
                 class="search-tag mg-bottom"
                 size="medium"
                 v-for="history in searchHistories">{{history}}</van-tag>
    </van-cell-group>
</div>
</template>

<script>
    export default {
        name: "Index",
        data(){
            return{
                value:'',
                searchHint:'请输入搜索关键词',
                searchHistories:['关键词','关键词','关键词','关键词','关键词','关键词','关键词','关键词'],
                redirectUrl:'',
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
            this.redirectUrl = this.$route.query.redirect
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
</style>
