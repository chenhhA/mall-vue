<template>
    <van-cell-group class="comment-card">


<!--        |1|头像3|相关参数12|2|日期4-->
        <van-row style="margin-bottom: 5px">
            <van-col span="3" offset="1"><van-image
                    round
                    width="32px"
                    height="32px"
                    :src="comment.userIcon"/></van-col>

            <van-col span="12">
                <span>{{comment.userName}} <van-rate size="14px " v-model="comment.star" readonly /></span>
                <br/>
                <span class="info-text">购买款式:{{comment.productAttr|formatArrayToText}}</span>
            </van-col>
            <van-col span="4" offset="2" class="info-text">
                {{comment.addTime|formatDate}}
            </van-col>
        </van-row>

        <van-row >
            <van-col offset="4" span="18" class="comment-text">
                {{comment.commentText}}
            </van-col>
        </van-row>

        <van-row>
            <van-col offset="4" span="3"
                     @click="onClickPic(index, comment.picUrls)"
                     v-for="(pic,index) in comment.picUrls">
                <van-image
                        style="border-radius: 5px"
                        width="85px"
                        height="85px"
                        :src="pic"
                />
            </van-col>
        </van-row>

    </van-cell-group>
</template>

<script>
    import {ImagePreview} from "vant";

    export default {
        props:{
            comment:[Object]
        },
        name: "CommentCard",
        data(){
            return{
            }
        },
        methods:{
            onClickPic(index, pics){
                ImagePreview({
                    images: pics,
                    startPosition: index,
                    closeable: true,
                });
            }
        }
    }
</script>

<style scoped lang="scss">
.comment-card{
    border-radius: 15px;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
    padding: 10px 10px
}
    .info-text{
        color: #969799;
        font-size: 12px;
    }

    .comment-text{
        font-size: 12px;
    }

</style>
