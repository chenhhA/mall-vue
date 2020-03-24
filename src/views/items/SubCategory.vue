<template>
    <!--<van-grid :gutter="10">-->
    <!--<van-grid-item-->
    <!--v-for="category in categories"-->
    <!--:key="category.id"-->
    <!--:icon="category.icon"-->
    <!--:text="category.name"-->
    <!--/>-->
    <div>
        <van-grid :gutter="10"
                  :column-num="2">
            <van-grid-item
                    v-for="category in categories.children"
                    :key="category.id"
                    :icon="category.icon"
                    :text="category.name"
                    @click="handleItemClick(category.id)"
            />
        </van-grid>
    </div>

</template>

<script>
    export default {
        name: "SubCategory",
        data() {
            return {
                parentId: ''
            }
        },
        props: {
            currentCategory: [Number],
        },
        methods: {
            handleItemClick(id) {
                console.log(id);
                this.$router.push('/category/' + id);
            }
        },

        mounted() {
            console.log(this.currentCategory);
        },
        computed: {
            categories: function () {
                console.log(this.currentCategory);
                return this.$store.getters.getSubCategoryById(this.currentCategory);
            },

        }
    }
</script>

<style scoped>

</style>
