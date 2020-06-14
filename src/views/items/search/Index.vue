<template>
    <div>
        <van-search v-model="keyword"
                    searchHint
                    show-action
                    @search="onSearch"
                    @cancel="onCancel"
                    placeholder="请输入搜索关键词"/>

            <van-cell-group style="padding: 10px 0px 10px 12px" class="mg-bottom">
                <span class="hint-text">搜索记录</span>
                <br/>
                <!--        -->
                <van-tag plain
                         @click="onClickHint(history)"
                         class="search-tag mg-bottom mg-top"
                         size="medium"
                         v-for="history in localSearchHistory">{{history}}
                </van-tag>
            </van-cell-group>

            <van-cell-group style="padding: 10px 0px 10px 12px">
                <span class="hint-text">热门搜索</span>
                <br/>
                <van-tag plain
                         :type="history.score>=10? 'danger':'default'"
                         class="search-tag mg-bottom mg-top"
                         size="medium"
                         @click="onClickHint(history.value)"
                         v-for="history in searchHistories">{{history.value}}
                </van-tag>
            </van-cell-group>


    </div>
</template>

<script>
    import {getHotSearch} from "../../../api/api";

    export default {
        name: "Index",
        data() {
            return {
                localSearchHistory: [], // 本地搜索记录
                searchHistories: [], // 服务端近期搜索记录
                redirectUrl: '',
                keyword:'',
            }
        },
        methods: {
            onCancel() {
                this.$router.go(-1)
            },
            onSearch() {
                this.$store.commit("addSearchHistory", this.keyword);
                this.$router.push(`/search/result?keyword=${this.keyword}`);
            },
            onClickHint(key){
                this.$router.push(`/search/result?keyword=${key}`)
            }
        },
        created() {
            this.redirectUrl = this.$route.query.redirect;
            this.localSearchHistory = this.$store.state.searchHistory;
            getHotSearch().then(resp => {
                if (resp) {
                    this.searchHistories = resp;
                }
            })
        }
    }
</script>

<style scoped>
    .hint-text {
        color: rgb(153, 153, 153);
        padding-bottom: 10px;
        font-size: 16px;
    }

    .search-tag {
        margin-right: 10px;
    }

    .mg-bottom {
        margin-bottom: 10px;
    }

    .mg-top {
        margin-top: 10px;
    }



</style>
