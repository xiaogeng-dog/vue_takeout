/**
 * 通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from '@/store/mutation-types'

import {
  getAddress,
  getFoodTypes,
  getShopListByLati,
  getUserInfo,
  logout,
  reqShopRatings,
  reqShopGoods,
  reqShopInfo,
  getShopListByLatiAndKW
} from '../api'
export default {
  // 异步获取地址
  async getAddress({ commit, state }) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await getAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },
  async getFoodTypes({ commit }) {
    const result = await getFoodTypes()
    if (result.code === 0) {
      const categories = result.data
      commit(RECEIVE_CATEGORIES, { categories })
    }
  },
  async getShopListByLati({ commit, state }) {
    const { longitude, latitude } = state
    const result = await getShopListByLati(longitude, latitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },
  // 同步记录用户信息
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },
  // 异步获取用户信息
  async getUserInfo({ commit }) {
    const result = await getUserInfo()
    if (result.code === 0) {
      commit(RECEIVE_USER_INFO, { userInfo: result.data })
    }
  },
  // 异步退出
  async logout({ commit }) {
    const result = await logout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  // 异步获取商家信息
  async getShopInfo({ commit }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({ commit }, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({ commit }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },

  // 同步更新food中的count值
  updateFoodCount({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },

  // 同步清空购物车
  clearCart({ commit }) {
    commit(CLEAR_CART)
  },

  // 异步获取商家商品列表
  async searchShops({ commit, state }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await getShopListByLatiAndKW(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, { searchShops })
    }
  },


}
