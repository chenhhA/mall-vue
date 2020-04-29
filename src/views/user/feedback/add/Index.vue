<template>
<div>
    <van-form @submit="onSubmit">
        <van-cell-group class="mg-bottom mg-top">
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :rules="[{required: true,message: '请选择反馈类型' }]"
                    :value="feedTypeValue"
                    placeholder="反馈类型"
                    @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="columns"
                        @confirm="onConfirm"
                        @cancel="showPicker = false"
                />
            </van-popup>
        </van-cell-group>

        <van-cell-group class="mg-bottom">
            <van-field
                    v-model="feedback.content"
                    rows="10"
                    :rules="[{required: true,message: '请输入反馈内容' }]"
                    autosize
                    type="textarea"
                    maxlength="500"
                    :placeholder="placeholder"
                    show-word-limit
            />
        </van-cell-group>

        <van-cell-group>
            <van-field
                    v-model="feedback.mobile"
                    name="手机号码"
                    label="手机号码"
                    placeholder="请输入手机号码"
                    :rules="[{ required: true, message: '请输入手机号码' }]"
            />
        </van-cell-group>

        <van-button  class="submit-button"  block type="danger" native-type="submit">
            提交
        </van-button>
    </van-form>
</div>
</template>

<script>
    import {submitFeedBack} from "../../../../api/api";

    export default {
        name: "Index",
        data (){
            return{
                feedback:{
                    feedType :'',
                    content:'',
                    mobile:'',
                },
                placeholder:'对我们网站、商品、服务，你还有什么建议吗？你还希望在严选上买到什么？请告诉我们...',
                feedTypeValue:'', //反馈类型对应的文本描述
                showPicker:false,
                columns: ['商品相关', '物流相关','客户服务','优惠活动','功能异常','产品建议','其他'],
                //'反馈类型1->商品相关,2->物流相关,3->客户服务->,4->优惠活动,5->功能异常,6->产品建议,7->其他'
            }
        },
        methods:{
            onConfirm(value, index) {
                this.feedback.feedType = index+1;
                this.feedTypeValue = value;
                this.showPicker = false;
            },
            onSubmit(){
                submitFeedBack(this.feedback).then(resp=>{
                    if (resp) {
                        this.$router.push('/user/feedback');
                    }
                })
            }
        }

    }
</script>

<style scoped>
.mg-bottom {
    margin-bottom: 10px;
}

.mg-top{
    margin-top:10px
}
    .submit-button{
        position: fixed;
        bottom: 0px;
    }
</style>
