<template>
    <!-- 二级分类商品列表展示-->
    <div>
        current:{{currentCategoryId}}
        parentI:{{parentId}}
        <van-tabs v-model="active"  @change="handleChange"  sticky swipeable lazy-render>
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
            this.parentId = this.$route.query.category;
            this.currentCategoryId = this.$route.query.subCategoryId;
            this.categoryList = this.$store.getters.getCategoryById(this.parentId);
            this.alertActive(this.currentCategoryId);
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
                console.log("chang to "+ val)
            },
        },
        methods:{
            handleChange(){
                console.log(this.active);
            },
            alertActive(val) {
                console.log("old value" + this.active);
                this.active = val;
            },
            prinaat(){
                console.log("active" + this.active)
            },
            changeValue(){
                this.active = 42;
            }
        }
    }
</script>

<style scoped>

</style>
