<template>
    <div>

        <van-tabs v-model="activeName" sticky swipeable lazy-render>
            <van-tab
                    v-for="helpCategory in helpCategories"
                    :title="helpCategory.name" :name="helpCategory.id">
                <HelpItemList :category-id="helpCategory.id"></HelpItemList>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import {getHelpCategory} from "../../../api/api";
    import HelpItemList from "../../../components/User/HelpItemList";

    export default {
        name: "Index",
        components: {HelpItemList},
        data() {
            return {
                helpCategories: [],
                activeName: 8,
            }
        },
        methods: {
            loadData() {
                getHelpCategory().then(resp => {
                    if (resp) {
                        this.helpCategories = resp;
                    }
                })
            },
        },
        created() {
            this.loadData();
        }
    }
</script>

<style scoped>

</style>
