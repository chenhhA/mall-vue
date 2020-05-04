<template>
    <van-steps direction="vertical" :active="0">
        <van-step v-for="trace in traces">
            <h3>{{trace.acceptStation}}</h3>
            <p>{{trace.AcceptTime}}</p>
        </van-step>
    </van-steps>
</template>

<script>
    export default {
        name: "Index",
        data(){
            return{
                traces:[]
            }
        },
        methods:{
        },
        created() {
            // 从vuex中读取数据
            this.traces = this.$store.state.traces;
            this.traces.reverse();
        }
    }
</script>

<style scoped>

</style>
