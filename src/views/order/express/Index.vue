<template>
    <van-steps direction="vertical" :active="0">
        <van-step v-for="trace in traces">
            <h3>{{trace.AcceptStation}}</h3>
            <p>{{trace.AcceptTime}}</p>
        </van-step>
    </van-steps>
</template>

<script>
    import {queryExpress} from "../../../api/api";

    export default {
        name: "Index",
        data(){
            return{
                traces:[],
                orderId:'',
            }
        },
        methods:{
            loadData(){
                queryExpress(this.orderId).then(resp=>{
                    if (resp) {
                        this.traces = resp.Traces;
                        this.traces.reverse();
                    }
                })
            }
        },
        created() {
            // 从vuex中读取数据
            this.orderId = this.$route.query.orderId;
            this.loadData();
        }
    }
</script>

<style scoped>

</style>
