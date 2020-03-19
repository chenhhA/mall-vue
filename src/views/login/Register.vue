<template>
    <div class="login">

        <van-form @submit="onSubmit">
            <van-field
                    v-model="user.username"
                    required
                    label="账号"
                    placeholder="请输入账号"
                    :rules="[{ required: true, message: '请填写账号' }]"
            />
            <van-field
                    v-model="user.password"
                    type="password"
                    required
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                    v-model="user.email"
                    required
                    label="邮箱"
                    placeholder="请输入邮箱"
                    :rules="[{ required: true, message: '请填写邮箱' }]"

            />

            <van-field
                    v-model="authCode"
                    center
                    clearable
                    required
                    :rules="[{ required: true, message: '请填写验证码' }]"
                    label="邮箱验证码"
                    placeholder="请输入邮箱验证码"
            >

                <van-button slot="button" size="small" type="primary" @click="countDown" :text="content"></van-button>
            </van-field>

            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>



    </div>
</template>

<script>
    import {getAuthCode, registerUser} from "../../api/api";

    export default {
        name: "Register",
        data(){
            return{
                content: '发送验证码',
                authCode:'',
                totalTime: 60,
                canClick: true,  //添加canClick
                user:{
                    username:'',
                    password:'',
                    email:''
                }
            }
        },
        methods: {
            onSubmit(){
                registerUser(this.user, this.authCode).then(resp=>{
                    if (resp) {
                        // 重定向到首页
                        console.log('ok!');
                        this.$router.replace('/')
                    }
                })
            },
            countDown () {
                if (!this.canClick) return   //改动的是这两行代码
                this.canClick = false
                this.content = this.totalTime + 's后重新发送'
                getAuthCode(this.user.email);
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
        }
    }
</script>

<style scoped>

</style>
