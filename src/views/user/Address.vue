<template>
<div class="main-container">

<!--    分割线-->
    <div class="split-line" >
    </div>

    <div>



<!--        渲染地址项-->
        <van-row v-for="(ad,index) in address">

            <van-col span="5"  offset="1" @click="editUserAddress(ad, index)">
                <h5>{{ad.name}}</h5>
                <van-tag v-if="ad.isDefault" plain type="primary">默认</van-tag>
            </van-col>
            <van-col span="16" @click="editUserAddress(ad)">
                <p>{{ad.tel}}</p>
                <p>{{ad.province}}{{ad.city}}{{ad.county}}{{ad.addressDetail}}</p>

            </van-col>
            <van-col span="2"  @click="onDelete(index,ad)">
                <van-icon name="delete"></van-icon>
            </van-col>


            <van-col span="22" offset="1">
                <van-divider></van-divider>
            </van-col>

        </van-row>

        <van-button class="fixed-bottom" type="default" icon="plus" block text="新建地址" @click="createNewAddress" />

<!--        新建/修改地址遮罩层-->
        <van-overlay :show="showEditPanel">
            <div class="wrapper" @click.stop>
                <div class="block">

                    <van-cell-group class="border-radius mg-bottom">

                        <van-field v-model="editAddress.name" placeholder="收货人姓名" />
                        <van-field v-model="editAddress.tel" placeholder="收货人电话" />
<!--                        省/市/区选择-->
                        <van-field
                                readonly
                                clickable
                                name="area"
                                :value="value"
                                placeholder="点击选择省市区"
                                @click="showArea = true"
                        />
                        <van-popup v-model="showArea" position="bottom">
                            <van-area
                                    :area-list="areaList"
                                    @confirm="onConfirm"
                                    @cancel="showArea = false"
                            />
                        </van-popup>

                        <van-field v-model="editAddress.addressDetail" placeholder="街道门牌,楼层房间号等信息" />
                    </van-cell-group>

                    <van-cell-group class="border-radius mg-bottom">
                        <van-cell center title="设为默认地址">
                            <template #right-icon>
                                <van-switch v-model="editAddress.isDefault" size="24" />
                            </template>
                        </van-cell>
                    </van-cell-group>

                    <van-button type="danger" class="mg-bottom" block
                                @click="OnSave"
                                round>保存</van-button>
                    <van-button type="default" block round @click="onCancel">取消</van-button>
                </div>
            </div>
        </van-overlay>



    </div>

    {{defaultAddress}}

</div>
</template>

<script>

    import bg_default from '@/assets/images/address_bg.png';
    import areaList from '../../utils/area'
    import {addNewAddress, deleteAddressById, editAddress, getAllAddress} from "../../api/api";
    import { Dialog } from 'vant';
    export default {
        name: "Address",
        data(){
            return {
                showArea: false,
                value: '',
                showEditPanel: false,
                editAddress:{
                    province:'',
                    city:'',
                    county:'',
                    addressDetail:'',
                    tel:'',
                    isDefault: false,
                    name:'',
                    id:'',
                },
                areaList:[],
                bg:bg_default,
                address: [],
                isNew: true,
            }
        },
        methods:{
            onConfirm(values) {
                this.editAddress.province = values[0].name;
                this.editAddress.city = values[1].name;
                this.editAddress.county = values[2].name;
                this.value = values.map((item) => item.name).join('/');
                this.showArea = false;
            },
            onCancel(){
                this.clearData();
                this.showEditPanel = false;
            },
            clearData(){
                this.editAddress={
                    province:'',
                        city:'',
                        county:'',
                        addressDetail:'',
                        tel:'',
                        isDefault: false,
                        name:'',
                };
                this.value = '';
                this.isNew = true;
            },
            createNewAddress() {
                this.showEditPanel = true;
                this.isNew = true;
            },
            OnSave(){
                // 新增
                if (this.isNew) {
                    addNewAddress(this.editAddress).then(resp=>{
                        if (resp) {
                            this.clearData();
                            this.showEditPanel = false;
                            this.address.push(resp.object);
                        }
                    });
                } else {
                    // 编辑
                    editAddress(this.editAddress).then(resp=>{
                        if (resp) {
                            this.address[this.editAddress.index] = this.editAddress;
                            this.clearData();
                            this.showEditPanel = false;
                        }
                    })
                }
            },
            editUserAddress(data,index){
                this.isNew = false;
                this.editAddress['index'] = index;
                this.showEditPanel = true;
                this.value = data.province+"/"+data.city+"/"+data.county
                this.editAddress = data;
            },

            loadData(){
                getAllAddress().then(resp=>{
                    this.address = resp;
                })
            },
            onDelete(index,item){
                Dialog.confirm({
                    title: '标题',
                    message: '确认删除该地址?',
                })
                    .then(() => {
                        deleteAddressById(item.id).then(resp=>{
                            if (resp) {
                                this.address.splice(index, 1);
                            }
                        })
                    })
                    .catch(() => {
                        // on cancel
                    });

            }

        },
        created() {
            this.loadData();
            this.areaList = areaList;
        },
        computed:{
            defaultAddress: function () {
                this.address.forEach(item=>{
                    if (item.isDefault) {
                        return item;

                    }
                })
            }
        }
    }
</script>
<style scoped>

    .main-container{
        background-color: #fff;
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background-color: #eeeeee;
    }

    .block {
        width: 100%;
        height: 100%;
        background-color: #eeeeee;

    }

    .border-radius{
        border-radius: 8px;
    }

    .mg-bottom{
        margin-bottom: 10px;
    }

    .fixed-bottom{
        position: fixed;
        bottom: 0px;
    }


</style>
