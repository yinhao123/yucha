const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var webUrl = "http://47.104.243.243:8080/";
//网络请求方法
function getWebDataWithPostOrGet(model) {
  wx.request({
    url: webUrl + model.url,
    data: model.param,
    header: {
      "Content-Type": "application/json",
      "openid":"adfaasfwf233"
    },
    method: model.method,
    success: function (res) {
      model.success(res.data)
    },
    fail: function (res) {
      wx.showModal({
        title: res,
        showCancel: false
      })
    }
  })
}
// 导出模块
// module.exports = {
//   getWebDataWithPostOrGet: getWebDataWithPostOrGet
// }
module.exports = {
  getWebDataWithPostOrGet: getWebDataWithPostOrGet,
  formatTime: formatTime
}
