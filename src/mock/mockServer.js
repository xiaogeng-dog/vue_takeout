/* 
使用mockjs提供mock数据接口
*/
import mockjs from 'mockjs'
import data from './data.json'

// 返回goods的接口
mockjs.mock('/shop_goods', { code: 0, data: data.goods })
// 返回ratings的接口
mockjs.mock('/shop_ratings', { code: 0, data: data.ratings })
// 返回info的接口
mockjs.mock('/shop_info', { code: 0, data: data.info })
