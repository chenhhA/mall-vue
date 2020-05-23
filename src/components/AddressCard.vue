<template>
    <div class="address-item" @click="onClick">
        <van-row class="address-title">
            {{address.name}}  {{address.tel}}
            <van-tag v-if="address.isDefault" plain type="primary">默认</van-tag>

        </van-row>

        <van-row class="address-detail">
            {{address.province}}{{address.city}}{{address.county}}{{address.addressDetail}}
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "AddressCard",
        props:{
          address: [Object]
        },
        data(){
        },
        methods:{
            onClick(){
                this.$emit("change");
            }
        }
    }
</script>

<style scoped>
    .address-item {
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 40px;
        background-color:   #fff;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .address-title{
        font-size:16px;
        line-height: 22px;
        margin-bottom:8px;
    }

    .address-detail{
        font-size:13px;
    }
</style>
