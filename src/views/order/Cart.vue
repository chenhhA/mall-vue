<!--购物车-->
<template>
    <div class="tab-cart">
        <div class="editor_head" v-show="goods.length">
            <span>购物车</span>
            <van-icon :name="isEditor ? 'success' : 'editor'"/>
            <span @click="isEditor = !isEditor">{{isEditor ? '完成' : '编辑'}}</span>
        </div>
        <van-checkbox-group @change="toggle" class="card-goods" v-model="checkedGoods">
            <div v-for="(item, i) in goods" :key="i" class="card-goods__item">
                <van-checkbox :key="item.id" :name="item.id" v-model="item.checked"></van-checkbox>

                <van-card :title="item.goodsName" :price="item.price" :num="item.number" :thumb="item.picUrl">
                    <div slot="desc">
                        <div class="van-card__desc">
                            <van-tag plain style="margin-right:6px;" v-for="(spec, index) in item.specifications" :key="index">
                                {{spec}}
                            </van-tag>
                        </div>
                    </div>
                    <div slot="footer" v-if="isEditor">
                        <van-stepper v-model="item.number" @change="stepperEvent(item,arguments)" disableInput/>
                    </div>
                    <div slot="footer" v-else>添加日期 {{item.addTime}}</div>
                </van-card>

                <div class="cart_delete" v-if="isEditor" @click="deleteCart(i)">删除</div>
            </div>
        </van-checkbox-group>

        <is-empty v-if="!goods.length">您的购物车空空如也~</is-empty>

        <van-submit-bar
                style="bottom: 50px"
                :price="totalPrice"
                :disabled="!checkedGoods.length"
                :buttonText="submitBarText"
                :loading="isSubmit"
                label="总计"
                @submit="cartSubmit"
        >
            <van-checkbox v-model="checkedAll" @click="setCheckAll" style="padding: 0 10px;">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>

<script>
    export default {
        name: "Cart"
    }
</script>

<style lang="scss"  scoped>
    @import '../../assets/scss/mixin';

    .tab-cart {
        padding-bottom: 50px;
        box-sizing: border-box;
    }

    .editor_head {
    @include one-border;
        text-align: right;
        padding: 10px;
        font-size: $font-size-normal;
        background-color: #fff;
    }

    .card-goods {
        background-color: $bg-color;
    .card-goods__item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        background-color: #fff;
    }
    .cart_delete {
        line-height: 100px;
        padding: 0 10px;
        color: #fff;
        background-color: $red;
    }
    .card-goods__footer {
        font-size: $font-size-normal;
        color: $font-color-gray;
    }
    }

    .clear_invalid {
        width: 120px;
        color: $font-color-gray;
        border: 1px solid $font-color-gray;
        margin: 0 auto;
        text-align: center;
        padding: 5px 3px;
        margin-top: 20px;
        border-radius: 3px;
    }
</style>
