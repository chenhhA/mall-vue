<template>
    <div>
        <van-button  class="add-button"  block type="info" @click="$router.push('/user/feedback/add')">
            添加反馈信息
        </van-button>

        <van-collapse v-model="activeNames" accordion>
            <van-collapse-item :name="feedback.id" v-for="feedback in feedbacks">
<!--                标题栏插槽-->
                <template #title>
                    <div>
                        <span>
                            {{feedback.content.length < 10 ? feedback.content.substring(0,10): feedback.content.substring(0,10) + '...'}}
                        </span>
                        <span class="feedback-right">
                            <van-tag
                                    :type="feedback.status == 1? 'success':'primary'">
                                {{feedback.status == 1 ? '已回复': '未回复'}}</van-tag>
                            <span>
                                {{feedback.addTime|formatDate}}
                            </span>
                        </span>
                    </div>
                </template>

<!--                内容文本-->
                <div>
                    <van-cell-group>
                        <van-cell title="反馈信息" :label="feedback.content"/>
                        <van-cell
                                v-if="feedback.status == 1"
                                title="回复信息" :label="feedback.replyContent"/>
                    </van-cell-group>
                </div>

            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
    import {getFeedBack} from "../../../api/api";

    export default {
        name: "Index",
        data() {
            return {
                activeNames: '',
                feedbacks:[]}

        },
        methods:{
            loadData(){
                getFeedBack().then(resp=>{
                    this.feedbacks = resp;
                })
            }
        },
        created() {
            this.loadData();
        }
    }
</script>

<style scoped>
    .feed-back-title {
        width: 50%;
    }

    .feedback-right {
        float: right;
    }

    .add-button{
        margin-bottom: 10px;
        margin-top: 10px;
    }

</style>
