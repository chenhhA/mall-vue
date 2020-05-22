<template>
    <div>
<!--        购物车导航栏-->
        <van-cell>
            <span class="header-title">购物车</span>

            <span class="header-right">
                <span style="color: #DD1A21; margin-right: 5px">
                    领券
                </span>
                <span v-if="edit === false" @click="changToEdit">
                    编辑
                </span>
                <span v-else @click="changToPay">
                    完成
                </span>
            </span>
        </van-cell>

<!--        选择组-->
        <van-checkbox-group v-model="result"   direction="horizontal" @change="groupChange">

<!--            购物车中的一项-->
            <template v-for="item in cartItem">

                <van-checkbox :name="item.id"></van-checkbox>

                <van-card
                        @click="handleProductClick(item.productId)"
                        :num="item.number"
                        :price="formatPrice(item.price)"
                        :title="item.productName"
                        :thumb="item.picUrl"
                        style="width: 90%"
                >
                    <template #tags>
                        <van-tag plain
                                 v-for="sp in item.specifications"
                                 style="margin-right: 2px"
                                 type="danger">{{sp}}</van-tag>
                    </template>

                    <template #num>
                        <van-stepper @change="numChange(item)"
                        v-model="item.number" />
                    </template>
                </van-card>
            </template>



        </van-checkbox-group>

<!--        底部接算栏-->
        <van-submit-bar style="bottom:50px"
                        :price="total* 100"
                        :buttonText="submitBarText"
                        @submit="onSubmit" >
            <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
        </van-submit-bar>
    </div>

</template>

<script>
    import {deleteCartItemById, deleteCartItemsByIds, loadCart, modifiyCartItemNum} from "../../api/api";

    export default {
        name: "Cart",
        data() {
            return {
                result: [], // 选中的购物车项
                cartItem:[],
                edit: false,
                checked:false //全选
            }
        },
        methods: {
            handleProductClick(id){
                this.$router.push("/product/" + id);
            },
            loadData(){
                loadCart().then(resp=>{
                    this.cartItem = resp;
                })
            },
            numChange(d){
                modifiyCartItemNum(d.id, d.number).then(resp=>{
                    if (resp) {
                    }
                })
            },
            changToEdit(){
                this.edit = true;
            },
            changToPay(){
                this.edit = false;
            },
            selectAll(){
                this.result= [];
                this.cartItem.forEach(item=>{
                    this.result.push(item.id);
                })
            },
            groupChange(value){
                console.log(value);
            },
            getCartItemById(id){ // 返回指定id的购物车项
                for (let i = 0; i < this.cartItem.length; i++) {
                    if (id === this.cartItem[i].id) {
                        console.log("find")
                        console.log(this.cartItem[i])
                        return this.cartItem[i]
                    }
                }
            },
            onSubmit(){
                // 处于编辑状态
                if (this.edit) {
                    deleteCartItemsByIds(this.result).then(resp => {
                        if (resp) {
                            this.clearData();
                            this.loadData();
                        }
                    });
                } else {
                    // 提交状态--提交到vue
                    this.$store.commit("setCartItem", this.result);
                    this.$router.push("/order/preview?from=1");
                }
            },
            clearData(){
                this.result = [];
                this.cartItem = [];
                this.edit = false;
                this.checked = false;
            }
        },
        mounted() {
            this.loadData();
        },
        computed: {
            total:function () {
                //
                if (this.result.length === 0) {
                    return 0.00
                }

                let total = 0.00;
                this.result.forEach(id=>{
                    let a = this.getCartItemById(id)
                    total += (a.price * a.number)
                })
                return total;
            },
            submitBarText() {
                return this.edit ? '删除' : '结算';
            },
        }
    }
</script>


<style scoped>
    .header-title{
        font-size: 1.4em;
    }
    .header-right{
        float: right;
    }
</style>
