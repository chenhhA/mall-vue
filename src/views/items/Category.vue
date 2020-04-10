<!--分类菜单界面-->
<template>
    <van-row>
        <van-col span="8"   >
            <van-sidebar v-model="activeKey">
                <van-sidebar-item v-for="category in categories" :title="category.name" :rowbow="category" @click="onClick(category)"/>
            </van-sidebar>
        </van-col>
        <van-col span="16">
            <sub-category :current-category="activeCategoryId" class="sub-category"></sub-category>
        </van-col>
    </van-row>


</template>

<script>
    import SubCategory from "./SubCategory";
    export default {
        name: "Category",
        components: {SubCategory},
        data() {
            return{
                activeKey:0,
                activeCategoryId: 1
            }
        },
        computed:{
            categories: function () {
                return this.$store.getters.getCategory;
            }
        },
        methods:{
            onClick(category){
                this.activeCategoryId = category.id;
            }
        }
    }
</script>

<style scoped>
.sub-category{
    padding:10px;
}
</style>
