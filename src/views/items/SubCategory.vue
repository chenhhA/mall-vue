<template>
<!--分类菜单项-->
    <div>
        <van-grid :gutter="20"
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
            }
        },
        props: {
            currentCategory: [Number],
        },
        methods: {
            handleItemClick(id) {
                this.$router.push(
                    '/item/list?category=' + this.currentCategory +
                    "&subCategoryId=" + id)
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
