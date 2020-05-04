<template>
    <div class="tabbar-user">


        <user-header/>
        <user-order/>
        <UserCoupon/>
        <user-module/>

        <van-cell-group>
            <van-button type="default" block @click="logout">退出登陆</van-button>
        </van-cell-group>
    </div>

</template>

<script>
    import UserHeader from "../../components/User/UserHeader";
    import UserOrder from "../../components/User/UserOrder";
    import UserCoupon from "../../components/User/UserCoupon";
    import UserModule from "../../components/User/UserModule";
    import {logout} from "../../api/api";
    export default {
        name: "Profile",
        components: {UserModule,  UserOrder, UserHeader, UserCoupon},
        methods:{
            logout(){
                logout().then(resp=>{
                    if (resp) {
                        this.$store.commit("logout");
                        this.$store.commit("setUserInfo",'');
                        this.$router.push("/")
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss" >
    .tabbar-user {
    > div {
        margin-bottom: 10px;
    }
    &__quit {
         border: 0;
         border-radius: 0;
     }
    }
</style>
