<template>
    <!--    <van-nav-bar-->
    <!--            title="购物车"-->
    <!--            right-text="编辑"-->
    <!--            @click-right="onClickRight"/>-->
    <!-- 全边框 -->

    <div>
        <van-checkbox-group v-model="result" style="width: 100%;padding: 10px">

            <van-swipe-cell>

                <van-checkbox name="a" horizontal>

                </van-checkbox>
                <div>
                    <van-image
                            width="100"
                            height="100"
                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                    />
                </div>
            </van-swipe-cell>

            <van-checkbox name="b">复选框 b</van-checkbox>
        </van-checkbox-group>
    </div>
</template>

<script>
    export default {
        name: "Cart",
        data() {
            return {
                result: ['a', 'b'],

            }
        },
        methods: {
            onClickRight() {

            }
        }
    }
</script>

<style scoped>

</style>
