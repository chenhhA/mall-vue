<template>
    <div>
<!--        头像-->
        <van-cell-group>
            <van-uploader v-model="fileList"  />
        </van-cell-group>

        <van-cell-group>
            <van-uploader v-model="lis"  />
        </van-cell-group>

<!--        基本信息-->
        <van-cell-group>
            <van-cell title="用户id" :value="userInfo.id" />
            <van-cell title="账号" :value="userInfo.username" />
            <van-field
                    v-model="userInfo.nickname"
                    name="昵称"
                    label="昵称"
                    placeholder="请填写昵称"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />

            <van-field name="radio" label="性别">
                <template #input>
                    <van-radio-group v-model="userInfo.gender" direction="horizontal">
                        <van-radio name="1">男</van-radio>
                        <van-radio name="2">女</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-field
                    readonly
                    clickable
                    name="calendar"
                    :value="userInfo.birthday"
                    label="出生日期"
                    placeholder="请选择出生日期"
                    @click="showCalendar = true"
            />
            <van-calendar v-model="showCalendar" @confirm="onConfirm" />
        </van-cell-group>

<!--        安全相关操作-->
        <van-cell-group>

        </van-cell-group>

<!--        操作按钮-->
        <div>
            <van-row>
                <van-col span="12">
                    <van-button type="danger" block @click="onSave">保存</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="default" block @click="onCancel">取消</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditUserInfo",
        data(){
            return{
                lis:[{'url': 'https://mall-1251176395.cos.ap-guangzhou.myqcloud.com'}],
                fileList:[],
                showCalendar:false,
                userInfo: {
                    "id": 1,
                    "username": "test123",
                    "password": null,
                    "gender": 0,
                    "birthday": null,
                    "lastLoginTime": null,
                    "lastLoginIp": null,
                    "userLevel": 0,
                    "nickname": "听风就是雨",
                    "email": "",
                    "phone": "",
                    "avatar": "https://mall-1251176395.cos.ap-guangzhou.myqcloud.com/2020/03/11/ddwd.jpg",
                    "status": 0,
                    "addTime": null,
                    "enabled": true,
                    "authorities": null,
                    "accountNonLocked": true,
                    "credentialsNonExpired": true,
                    "accountNonExpired": true
                }
            }
        },
        methods:{
            onConfirm(date) {
                console.log(date)
                this.userInfo.birthday = `${date.getMonth() + 1}/${date.getDate()}`;
                this.showCalendar = false;
            },
            onSave(){
                console.log(this.userInfo);
            },
            onCancel() {


            }
        }
    }
</script>

<style scoped>

</style>
