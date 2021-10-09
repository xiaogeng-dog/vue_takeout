/**
 * 接口请求函数
 */
import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'
//  1、根据经纬度获取位置详情
export const getAddress = geohash => ajax(`${BASE_URL}/position/${geohash}`)

//  2、获取食品分类列表
export const getFoodTypes = () => ajax(`${BASE_URL}/index_category`)

//  3、根据经纬度获取商铺列表
export const getShopListByLati = (latitude, longitude) =>
  ajax(`${BASE_URL}/shops`, { latitude, longitude })

//  4、根据经纬度和关键字搜索商铺列表
export const getShopListByLatiAndKW = (geohash, keyword) =>
  ajax(`${BASE_URL}/search_shops`, { geohash, keyword })

//  5、获取一次性验证码
export const getCaptcha = () => ajax(`${BASE_URL}/captcha`)

//  6、用户名密码登陆
export const handleLogin = ({ name, pwd, captcha }) =>
  ajax(`${BASE_URL}/login_pwd`, { name, pwd, captcha }, 'POST')

//  7、发送短信验证码
export const handleSendcode = phone => ajax(`${BASE_URL}/sendcode`, { phone })

//  8、手机号验证码登陆
export const handleLoginByPhoneN = (phone, code) =>
  ajax(`${BASE_URL}/login_sms`, { phone, code }, 'POST')

//  9、根据会话获取用户信息
export const getUserInfo = () => ajax(`${BASE_URL}/userinfo`)

//  10、用户登出
export const logout = () => ajax(`${BASE_URL}/logout`)

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax(`/shop_info`)
/**
 * 获取商家评价
 */
export const reqShopRatings = () => ajax(`/shop_ratings`)
/**
 * 获取商家商品
 */
export const reqShopGoods = () => ajax(`/shop_goods`)
