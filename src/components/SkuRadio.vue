<template>
    <div>
        sp= {{specification}}
        select = {{selected}}
        <span class="select-item" @click="change" v-for="value in specification.values">

            <van-image
                    v-if="value.picUrl != null"
                    width="30"
                    height="30"
                    :src="value.picUrl"
            />
            {{value.value}}
        </span>
    </div>
</template>

<script>
    export default {
        name: "SkuRadio",
        props:{
            specification:[Object],
            selected:[Number]
        },
        methods:{
            change(){

            }
        }
    }
</script>

<style scoped>
.select-item{
border:1px solid #7F7F7F;
    border-radius: 4px;
    padding:2px;
    height: 30px;
    line-height: 30px;


}
    .active{
        color:#DD1A21;
        border:2px solid #DD1A21
    }
</style>
