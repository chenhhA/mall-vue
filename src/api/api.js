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

const getProduct = "/product/"
export function loadProduct(id) {
    return request({
        url: getProduct + id,
        method: 'get'
    })
}
