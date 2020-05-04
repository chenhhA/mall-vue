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

const LOG_OUT_URL = '/logout';
export function logout() {
    return  request
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

// 商品收藏地址
const collectProductUrl = '/user/collect'

// 添加商品到收藏夹
export function addProductToCollect(id) {
    return request({
        url: collectProductUrl+"/"+ id,
        method:'post'
    })
}

// 获取收藏夹详情
export function getCollect() {
    return request({
        url: collectProductUrl,
        method:'get'
    })
}

export function deleteFromCollect(id) {
    return request({
        url: collectProductUrl+'/'+id,
        method:'delete'
    })
}

// 浏览记录地址
const footprintUrl = '/user/footprint'
export function getFootprint() {
    return request({
        url:footprintUrl,
        method:'get'
    })
}

export function deleteFootprintById(id) {
    return request({
        url:footprintUrl +'/'+id,
        method:'delete'
    })
}

// 查询用户拥有优惠券
const UserCouponUrl = '/coupon/own'
export function queryUserOwnCoupon() {
    return request({
        url:UserCouponUrl,
        method:'get'
    })
}

// 兑换优惠券
const UserCouponExchangeUrl = '/coupon/code'
export function exchangeCoupon(code) {
    return request({
        url:UserCouponExchangeUrl +"?code="+code,
        method:'post'
    })
}

// 订单预览接口地址
const OrderUrl = '/order/generateConfirmOrder'
export function getOrderPreview(ids) {
    let params= "?";
    ids.forEach(id=>{
        params += ("ids=" + id +"&");
    })
    return request({
        url: OrderUrl+params,
        method:'get'
    })
}

// 提交订单接口
const OrderSubmitUrl = '/order/generateOrder'
export function submitOrder(orderParams) {
    return request({
        url: OrderSubmitUrl,
        method:'post',
        data: orderParams
    })
}

// 确定收货接口
const OrderConfirmUrl = '/order/confirm'
export function confirmOrder(id) {
    return request({
        url: `${OrderConfirmUrl}?orderId=${id}`,
        method:'put',
    })
}

// 取消订单
const CancelOrderUrl = '/order/cancel'
export function cancelOrder(id) {
    return request({
        url: `${CancelOrderUrl}?orderId=${id}`,
        method:'put',
    })
}

// 删除订单订单
const DeleteOrderUrl = '/order/'
export function deleteOrder(id) {
    return request({
        url: `${DeleteOrderUrl}${id}`,
        method:'delete',
    })
}

// 订单查询接口
const OrderQueryUrl = '/order/list'
export function queryOrder(pageNum, size, orderStatus) {
    return request({
        url: `${OrderQueryUrl}?pageNum=${pageNum}&size=${size}&OrderStatus=${orderStatus}`,
        method:'get',
    })
}
// 订单支付接口
const orderPayUrl = '/order/pay?'
export function payOrder(orderId, payType) {
    return request({
        url: orderPayUrl + "orderId="+ orderId + "&payType="+payType,
        method:'put',
    })
}

// 提交问题反馈接口
const SubmitFeedbackUrl = '/feedback'
export function submitFeedBack(feedback){
    return request({
        url: SubmitFeedbackUrl,
        method:'post',
        data: feedback
    })
}

// 获取反馈信息接口
const FeedbackUrl = '/feedback/list'
export function getFeedBack(feedback){
    return request({
        url: FeedbackUrl,
        method:'get',
    })
}

// 帮助分类接口
const HelpCategoryUrl = '/help/category'
export function getHelpCategory(){
    return request({
        url: HelpCategoryUrl,
        method:'get',
    })
}

// Q/A接口
const HelpItemUrl = '/help/question'
export function getHelpItemByHelpCategoryId(id){
    return request({
        url: HelpItemUrl + "?categoryId="  + id,
        method:'get',
    })
}



