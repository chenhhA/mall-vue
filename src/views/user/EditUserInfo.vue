<template>
    <div class="user_information"  style="margin-top: 20px">

<!--        头像-->
        <van-cell-group >
            <van-cell title="头像" class="cell_middle">
                <van-uploader :after-read="avatarAfterRead">
                    <div class="user_avatar_upload">
                        <img
                                :src="userInfo.avatar"
                                alt="你的头像"
                                v-if="userInfo.avatar"
                        >
                        <van-icon name="camera_full" v-else></van-icon>
                    </div>
                </van-uploader>
            </van-cell>
        </van-cell-group>

<!--        基本信息-->
        <van-cell-group class="mg-bottom ">
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
                    :value="userInfo.birthday"
                    label="出生日期"
                    placeholder="请选择出生日期"
                    @click="showDatePicker = true"
            />
            <van-popup v-model="showDatePicker" position="bottom" :style="{ height: '50%' }" >

                <van-datetime-picker
                        @confirm="onDateConfirm"
                        @cancel="showDatePicker = false"
                        v-model="currentDate"
                        type="date"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :formatter="formatter"
                />

            </van-popup>
        </van-cell-group>

<!--        安全相关操作-->
        <van-cell-group class="mg-bottom">
            <van-cell title="修改密码" is-link to="/user/info/resetPassword" />
            <van-cell title="修改邮箱" is-link to="/user/info/updateEmail" />
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
    import {queryUserInfo, updateUserInfo, uploadImg} from "../../api/api";

    export default {
        name: "EditUserInfo",
        data(){
            return{
                currentDate: new Date(),
                fileList:[],
                showDatePicker:false,
                minDate: new Date(1940, 0, 1),
                maxDate: new Date(2020, 12, 31),
                userInfo: {}
            }
        },
        created() {
            this.userInfo = this.$store.state.userInfo;
            this.userInfo.birthday = this.formatDate(this.userInfo.birthday);
        },
        methods:{
            onSave(){
                let data = {};
                data.avatar  = this.userInfo.avatar;
                data.nickname = this.userInfo.nickname;
                data.birthday = this.userInfo.birthday;
                data.gender = this.userInfo.gender;

                updateUserInfo(data).then(resp=>{
                    if (resp) {
                        // 更新vuex信息
                        queryUserInfo().then(resp=>{
                            if (resp) {
                                console.log(resp);
                                this.$store.commit("setUserInfo", resp);
                                this.$router.push("/user");
                            }
                        })
                    }
                })
            },
            onCancel() {
                this.$router.push("/user");
            },

            onDateConfirm(){
                let formatDate;
                let year = this.currentDate.getFullYear();
                let month = this.currentDate.getMonth()+1;
                let day = this.currentDate.getDate();
                formatDate = year+'-'+month+'-'+day;

                this.userInfo.birthday = formatDate;
                this.showDatePicker = false;
            },
            formatter(type, val) {
                if (type === 'year') {
                    return `${val}年`;
                } else if (type === 'month') {
                    return `${val}月`;
                } else if (type === 'day') {
                    return `${val}日`;
                }
                return val;
            },
            avatarAfterRead(file){
                let content = file.file;
                let data = new FormData();
                data.append('img',content);

                uploadImg(data).then(resp=>{
                    if (resp) {
                        this.userInfo.avatar = resp.object;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user_information {
        .user_avatar_upload {
            position: relative;
            width: 50px;
            height: 50px;
            border: 1px solid $border-color;
            img {
                max-width: 100%;
                max-height: 100%;
            }
            i {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 20px;
                color: $border-color;
            }
        }
        .user_quit {
            margin-top: 20px;
        }
    }
    .mg-bottom {
        margin-bottom: 10px;
    }
</style>
