<template>
    <div class="login">

        <van-form @submit="onSubmit">
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
                username:'',
                password:'',
            }
        },
        methods:{
            onSubmit(){
                loginUser(this.username, this.password).then(resp=>{
                    if (resp) {
                            this.$store.commit("login")
                            this.$store.commit("setUserInfo", resp);
                            this.$router.replace("/")
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
