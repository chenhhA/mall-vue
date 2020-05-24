<template>
    <div class="main-container">
        <van-cell-group class="border-radius mg-bottom" v-for="(item,index) in orderItems">
            <van-row :gutter="10" class="mg-bottom-s">
                <van-col span="4">
                    <van-image width="40" height="40" :src="item.picUrl" />
                </van-col>
                <van-col span="19">
                    {{item.productName}}
                    <br/>
                    <span class="grey-text">
                        购买规格：
                        {{item.specifications || formatArrayToText}}
                    </span>

                </van-col>
            </van-row>

            <van-row style="display: flex;align-content: center;">
                评分：
                <van-rate
                        class="mg-bottom-s"
                        v-model="item.star"
                        :size="20"
                        color="#ee0a24"
                        void-icon="star"
                        void-color="#eee"/>
            </van-row>
            <van-field
                    class="mg-bottom"
                    style="border-radius: 5px;background-color: #fafafa"
                    v-model="item.message"
                    rows="3"
                    autosize
                    type="textarea"
                    placeholder="请输入留言"/>

            <van-uploader
                    :name="index"
                    :after-read="avatarAfterRead"
                    v-model="item.tempPic" multiple :max-count="3" />

        </van-cell-group>

        <van-button type="primary" @click="onClickComment   " block>评价</van-button>

    </div>
</template>

<script>
    import {addComment, uploadImg} from "../../../api/api";
    import { Toast } from 'vant';

    export default {
        name: "Comment",
        data(){
            return{
                orderItems: [],
                orderId:'',
            }
        },
        methods:{
            onClickComment() {
                let comments = [];
                let result = true;
                this.orderItems.forEach(item=>{
                    if (item.star == null || item.message == null) {
                        result = false;
                        Toast.fail('请填写评价后重试');
                    } else {
                        let comment = {}
                        // comment['productName'] = item.productName
                        comment['picUrls'] = item.picUrls
                        // comment['productAttr'] = item.specifications
                        comment['orderItemId'] = item.id;
                        comment['star'] = item.star;
                        comment['commentText'] = item.message
                        // comment['productId'] = item.productId;
                        comments.push(comment);
                    }

                });
                if (result) {
                    addComment(this.orderId, comments).then(resp=>{
                        if (resp) {
                            this.$router.push(`/order/info/${this.orderId}`);
                        }
                    })
                }
            },
            avatarAfterRead(file,item){
                console.log(item);
                file.status = 'uploading';
                file.message = '上传中...';
                let content = file.file;
                let data = new FormData();
                data.append('img',content);

                uploadImg(data).then(resp=>{
                    if (resp) {
                        file.status = 'done';
                        if (this.orderItems[item.name].picUrls == null) {
                            this.orderItems[item.name].picUrls = []
                            console.log("null")
                        }
                        this.orderItems[item.name].picUrls.push(resp.object);
                    }
                })
            }
        },
        created() {
            // 从vuex中取出并清除数据
            this.orderItems = this.$store.state.orderItems;
            this.$store.commit("setOrderItems",[])
            this.orderId = this.$route.query.orderId;
        }
    }
</script>

<style scoped>

</style>
