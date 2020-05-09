<template>
    <!-- 二级分类商品列表展示-->
    <div>
        <van-tabs v-model="active"    sticky swipeable lazy-render>
            <van-tab v-for="(category ,index) in categoryList.children "
                     :title="category.name"
                    :name="category.id">
                <ProductList :category-id="category.id"></ProductList>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import ProductList from "../../components/ProductList";
    export default {
        name: "ItemList",
        components: {ProductList},
        created(){
            this.parentId = parseInt(this.$route.query.category);
            this.currentCategoryId = parseInt(this.$route.query.subCategoryId);
            this.active = this.currentCategoryId;
            this.categoryList = this.$store.getters.getCategoryById(this.parentId);
            console.log(this.categoryList);
        },
        data(){
            return{
                currentCategoryId:'',
                parentId:'',
                active:0,
                categoryList:[]
            }
        },
        watch: {
            active: function (val) {
            },
        },
        methods:{
            alertActive(val) {
                this.active = val;
            },
        }
    }
</script>

<style scoped>

</style>
