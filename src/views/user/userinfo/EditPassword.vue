<template>
    <div>
        <van-form @submit="onSubmit" style="margin-top: 15px">
            <van-field
                    v-model="firstPassword"
                    type="password"
                    placeholder="请输入密码"
                    :rules="[{ required: true, message: '请输入密码' }]"
            />
            <van-field
                    v-model="secondPassword"
                    type="password"
                    placeholder="请重复输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />

            <van-field
                    v-model="authCode"
                    center
                    clearable
                    :rules="[{ required: true, message: '请填写验证码' }]"
                    label="邮箱验证码"
                    placeholder="请输入邮箱验证码"
            >

                <van-button slot="button" size="small" type="primary" @click="countDown" :text="content"></van-button>
            </van-field>


            <div style="margin-top: 15px">
                <van-row>
                    <van-col span="12">
                        <van-button type="danger" block native-type="submit">保存</van-button>
                    </van-col>
                    <van-col span="12">
                        <van-button type="default" block @click="onCancel">取消</van-button>
                    </van-col>
                </van-row>
            </div>
        </van-form>
    </div>
</template>

<script>
    import {getAuthCode, resetAuthCode, resetPassword} from "../../../api/api";
    import {Toast} from "vant";

    export default {
        name: "EditPassword",
        data(){
            return{
                firstPassword:'',
                secondPassword:'',
                authCode:'',
                canClick:true,
                user:{},
                content:'获取验证码',
                totalTime: 60,
            }
        },
        methods: {
            onCancel(){
                this.$router.go(-1);
            },
            onSubmit(){
                if (this.firstPassword === this.secondPassword) {
                    resetPassword(this.firstPassword, this.authCode).then(resp=>{
                        if (resp) {
                            this.$router.push("/user/info");
                        }
                    })
                } else {
                    Toast('两次输入的密码不一致');
                }
            },
            countDown () {
                if (!this.canClick) return   //改动的是这两行代码
                this.canClick = false
                this.content = this.totalTime + 's后重新发送'
                resetAuthCode();
                let clock = window.setInterval(() => {
                    this.totalTime--;
                    this.content = this.totalTime + 's后重新发送'
                    if (this.totalTime < 0) {
                        window.clearInterval(clock)
                        this.content = '重新发送验证码'
                        this.totalTime = 60
                        this.canClick = true   //这里重新开启
                    }
                }, 1000)
            }
        },
    }
</script>

<style scoped>

</style>
