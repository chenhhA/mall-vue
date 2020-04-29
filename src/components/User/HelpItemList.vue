<template>
    <div>

        <van-collapse v-model="activeNames">
            <van-collapse-item
                    v-for="helpItem in helpItems"
                    :title="helpItem.question" :name="helpItem.id" >{{helpItem.answer}}</van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
    import {getHelpItemByHelpCategoryId} from "../../api/api";

    export default {
        name: "HelpItemList",
        props: {
            categoryId: [Number],
        },
        data(){
            return{
                helpItems:[],
                activeNames:[],
            }
        },
        methods:{
            loadData() {
                getHelpItemByHelpCategoryId(this.categoryId).then(resp=>{
                    if (resp){
                        this.helpItems = resp;
                    }
                })
            }
        },
        created() {
            this.loadData()
        }
    }
</script>

<style scoped>

</style>
