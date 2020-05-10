<template>
    <div>
        <van-steps :active="active">
            <van-step>验证原邮箱</van-step>
            <van-step>验证新邮箱</van-step>
        </van-steps>

    </div>
</template>

<script>
    export default {
        name: "ResetEmail",
        data(){
            return{
                active:0
            }
        }
    }
</script>

<style scoped>

</style>
