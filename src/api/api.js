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

// 获取修改密码的验证码
const RestAuthCodeUrl = "/current/authCode";
export function resetAuthCode() {
    return request(
        {
            url: RestAuthCodeUrl,
            method:'get',
        }
    )
}

// 获取忘记密码的验证码
export function forgetAuthCode(username) {
    return request(
        {
            url: `${AuthCodeUrl}/${username}`,
            method:'get',
        }
    )
}

// 重置密码
const ForgetAuthCodeUrl = "/forget";
export function forgetPassword(account, password, authCode) {
    return request(
        {
            url:`${ForgetAuthCodeUrl}?account=${account}&password=${password}&authCode=${authCode}` ,
            method:'put',
        }
    )
}

const ResetPasswordUrl = "/reset"
export function resetPassword(password, authCode) {
    return request({
        url : `${ResetPasswordUrl}?password=${password}&authCode=${authCode}`,
        method:'put'
    })
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
    return  request({
        url: LOG_OUT_URL,
        method:'post'
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
export function loadNewProduct(pageNum, size, sortType) {
    let params = "?"
    if (pageNum != null&& pageNum !== '') {
        params += `page=${pageNum}&`
    }
    if (size != null && size !== '') {
        params += `size=${size}&`
    }
    if (sortType!= null && size !== '') {
        params += `sortType=${sortType}`
    }
    return request({
        url: NewProductUrl + params,
        method: 'get'
    });
}

//加载热销商品
const HotProductUrl = "/product/hot"
export function loadHotProduct(pageNum, size, sortType) {
    let params = "?"
    if (pageNum != null&& pageNum !== '') {
        params += `page=${pageNum}&`
    }
    if (size != null && size !== '') {
        params += `size=${size}&`
    }
    if (sortType!= null && size !== '') {
        params += `sortType=${sortType}`
    }
    return request({
        url:HotProductUrl + params,
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

// 获取评价接口
const getCommentUrl = '/product/comment/'
export function getCommentByProductId(id, pageNum, size){
    return request({
        url:`${getCommentUrl}${id}?pageNum=${pageNum}&size=${size}`,
        method:'get'
    })
}
const addCommentUrl = '/order/comment/'
export function addComment(orderId, comments){
    return request({
        url:`${addCommentUrl}${orderId}`,
        method:'post',
        data: comments
    })
}

export function loadCommentByOrderId(orderId) {
    return request({
        url: `${addCommentUrl}${orderId}`,
        method:'get'

    })
}

// 访问量统计
const pvUrl = '/pv/'
export function addTotal() {
    return request({
        url:pvUrl,
        method:'get'
    })
}

export function addIndex() {
    return request({
        url:pvUrl+'index',
        method:'get'
    })
}
// 生成订单预览(从购物车发起)
const previewOrder = '/generateConfirmOrder/product'
export function previewOrderFromProduct(id, skuId, num) {
    return request({
        url : `${previewOrder}?productId=${id}&skuId=${skuId}&num=${num}`,
        method:'get'
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

export function queryFavoriteStatus(id) {
    return request({
        url: `${collectProductUrl}/isFavorite/${id}`,
        method:'get'
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

// 查询优惠券列表
const couponUrl ='coupon'
export function getCouponList() {
    return request({
        url: couponUrl,
        method: 'get'
    })
}

// 领取优惠券
export function getCoupon(id) {
    return request({
        url:`${couponUrl}/${id}`,
        method:'post'
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

// 订单预览接口地址(通过购物车中选顶的项生成)`
const OrderUrl = '/order/generateConfirmOrder'
export function getOrderPreviewFromCart(ids) {
    let params= "/cart?";
    ids.forEach(id=>{
        params += ("ids=" + id +"&");
    })
    return request({
        url: OrderUrl+params,
        method:'get'
    })
}

export function getOrderPreviewFromProduct(productId, skuId, buyNum) {
    let url = `/product?productId=${productId}&skuId=${skuId}&buyNum=${buyNum}`
    return request({
        url: OrderUrl + url,
        method: 'get',
    })
}


// 提交订单接口
const OrderSubmitUrl = '/order/generateOrder'
export function submitOrderFromCart(orderParams) {
    return request({
        url: OrderSubmitUrl+'/cart',
        method:'post',
        data: orderParams
    })
}

export function submitOrderFromProduct(orderParams) {
    return request({
        url: OrderSubmitUrl+'/product',
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

// 查询指定id的订单详情(包含收货地址,订单项,物流信息)
const queryOrderUrl = '/order/'
export function queryOrderById(id) {
    return request({
        url: queryOrderUrl + id,
        method:'get'
    })
}
// 订单物流信息查询接口
const queryOrderExpressInfoUrl = '/order/express/'
export function queryExpress(id) {
    return request({
        url:`${queryOrderExpressInfoUrl}${id}`,
        method:'get'
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

// 获取搜索提示词
const SEARCH_HINT_URL =  '/search/hotSearch'
export function getHotSearch() {
    return request({
        url:SEARCH_HINT_URL,
        method:'get'
    })
}

// 搜索接口
const SearchProductUrl = '/search'
export function searchProduct(searchParams,page) {
    return request({
        url: `${SearchProductUrl}?searchType=${searchParams.searchType}&sortType=${searchParams.sortOption}&keyword=${searchParams.keyword}&categoryId=${searchParams.categoryId}&pageNum=${page.pageNum}&size=${page.size}`,
        method:'get'
    })
}



