<template style="height: 100%">
    <div class="login-form">

        <van-image
                width="100"
                height="100"
                :src="login_pic"
        />

        <van-form @submit="onSubmit" class="login-form">
            <van-field
                    v-model="username"
                    left-icon="user-o"
                    label="账号"
                    placeholder="请输入账号或邮箱"
                    :rules="[{ required: true, message: '请输入账号或邮箱' }]"
            />
            <van-field
                    v-model="password"
                    type="password"
                    left-icon="warn-o"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-cell>
                <span class="register-link" @click="$router.push('/register')">注册账号</span>
                <span class="forget-link" @click="$router.push('/forget')">忘记密码</span>
            </van-cell>

            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>


        </van-form>


    </div>
</template>

<script>
    import {loginUser} from "../../api/api";
    import login_pic from '@/assets/images/u2808.png';


    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
                redirectUrl: '',
                login_pic: login_pic,
                params:'' //从其他页面跳转来的是参数
            }
        },
        methods: {
            onSubmit() {
                loginUser(this.username, this.password).then(resp => {
                    if (resp) {
                        this.$store.commit("login")
                        this.$store.commit("setUserInfo", resp.object);
                        if (this.redirectUrl != null && this.redirectUrl != '') {
                            this.$router.replace(this.redirectUrl);
                        } else {
                            this.$router.replace("/");
                        }
                    }
                })
            }
        },
        created() {
            this.redirectUrl = this.$route.query.redirectUrl;
            this.redirectUrl = this.redirectUrl.replace(/@/g,'&');
            console.log(this.$route.fullPath);
        }
    }
</script>

<style scoped>
    .register-link {
    }

    .forget-link {
        float: right;
    }

    .login-form {
        position: fixed;
        padding-top: 15%;
        height: 100%;
        width: 100%;
        background-color: #fff;
        text-align: center;
    }
    #app{
        height: 100%;
    }
</style>
