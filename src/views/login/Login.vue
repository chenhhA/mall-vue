<template>
    <div class="login">

        <van-image
                width="100"
                height="100"
                src="../../../assets/images/u2808.png"
        />

        <van-form @submit="onSubmit" class="login-form">
            <van-field
                    v-model="username"
                    required
                    label="账号"
                    placeholder="请输入账号或邮箱"
                    :rules="[{ required: true, message: '请输入账号或邮箱' }]"
            />
            <van-field
                    v-model="password"
                    type="password"
                    required
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

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
                redirectUrl: '',
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
                            console.log("dd");
                        } else {
                            this.$router.replace("/");
                        }
                    }
                })
            }
        },
        created() {
            this.redirectUrl = this.$route.query.redirectUrl;
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
        /*position:fixed;*/
        /*top:30%;*/
    }
</style>
