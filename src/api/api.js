import request from '../utils/Api'

// 获取验证码
const AuthCodeUrl = "/authCode";
export function getAuthCode(email) {
    return request(
        {
            url: AuthCodeUrl + "?email=" + email,
            method:'get',
        }
    )
}

// 注册
const RegiserUrl = "/register";
export function registerUser(user, authCode) {
    return request({
        url: RegiserUrl+"?authCode=" +authCode,
        method: 'post',
        data: user
    })
}

// 登陆
const LoginUrl = "/doLogin";
export function loginUser(username, password){
    return request({
        url: LoginUrl + "?username=" + username + "&password=" + password,
        method: 'post'
    })
}

// 获取分类信息
const GetAllCategoryUrl = "/category/all"
export function getCategory() {
    return request({
        url: GetAllCategoryUrl,
        method: 'get'
    })
}

const AdUrl = "/ad"
export function loadAd(type, categoryId){
    return request({
        url: AdUrl + "?type=" + type + "&categoryId=" + categoryId,
        method: 'get'
    })
}

// 加载新商品
const NewProductUrl = "/product/new"
export function loadNewProduct() {
    return request({
        url: NewProductUrl,
        method: 'get'
    })
}

//加载热销商品
const HotProductUrl = "/product/hot"
export function loadHotProduct() {
    return request({
        url:HotProductUrl,
        method:'get'
    })
}

// 根据id加载商品所有信息
const getProduct = "/product/"
export function loadProduct(id) {
    return request({
        url: getProduct + id,
        method: 'get'
    })
}

// 根据分类id加载商品
const categoryUrl = "/product/category"
export function loadProductByCategoryId(id, page, size){
    return request({
        url:  categoryUrl + "?categoryId="+id+"&page="+page +"&size="+size,
        method:'get'
    })
}

// 添加商品到购物车
const cartUrl = "/cart"
export function addItemToCart(productId,productStockId, number) {
    return request({
        url: cartUrl+"?productId="+productId+"&productStockId="+productStockId+"&number="+number,
        method:'post'
    })

}

// 加载购物车商品
export function loadCart() {
    return request({
        url: cartUrl,
        method:'get'
    })
}

// 修改购物车商品数量
export function modifiyCartItemNum(cartId, num) {
    return request({
        url: cartUrl+"?cartId="+cartId +"&count="+ num,
        method:'put'
    })
}

// 删除多个购物车项
export function deleteCartItemsByIds(cartId) {
    console.log(cartId);
    let params= "?";
    cartId.forEach(id=>{
        params += ("ids=" + id +"&");
    })
    return request({
        url: cartUrl+params,
        method:'delete'
    })
}

// 收货地址api
const userAddressUrl = '/address'

// 获取所有收货地址
export function getAllAddress() {
    return request({
        url: userAddressUrl,
        method: 'get',
    })
}

// 新增地址
export function addNewAddress(address) {
    return request({
        url: userAddressUrl,
        method:'post',
        data: address
    })
}

// 删除指定id的收货地址
export function deleteAddressById(id) {
    return request({
        url: userAddressUrl +'/'+ id,
        method: 'delete'
    })
}

// 修改地址信息
export function editAddress(address) {
    return request({
        url: userAddressUrl+'/'+address.id,
        method:'put',
        data: address
    })
}

// 图片上传api
const imgUploadUrl = '/oss'
export function uploadImg(data) {
    return request({
        url: imgUploadUrl,
        method:'post',
        data:data
    })

}
const editUserInfoUrl = '/userinfo'


// 修改用户基本信息
export function updateUserInfo(data) {
    return request({
        url:editUserInfoUrl +'?avatar='+data.avatar+"&gender="+data.gender+'&nickname='+data.nickname+'&birthday='+data.birthday,
        method:'post',
    })
}

// 查询用户基本信息
export function queryUserInfo() {
    return request({
        url: editUserInfoUrl,
        method:'get'
    })
}



