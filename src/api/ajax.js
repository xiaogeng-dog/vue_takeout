import axios from 'axios'

/**
 * ajax请求函数
 */

export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    // 执行异步请求
    if (type === 'GET') {
      // 准备Url 参数数据
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      axios
        .get(url)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    } else {
      axios
        .post(url, data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    }
  })
}
