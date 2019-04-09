const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var webUrl = "https://sanzhitu.iaimai.com:8080/";
//网络请求方法
function getWebDataWithPostOrGet(model) {
  wx.request({
    url: webUrl + model.url,
    data: model.param,
    header: {
      "Content-Type": "application/x-www-form-urlencoded", //header: "application/x-www-form-urlencoded",
      "openid":getApp().globalData.openid
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
//网络请求方法
function getWebDataWithPost(model) {
  wx.request({
    url: webUrl + model.url,
    data: model.param,
    header: {
      "Content-Type": "application/json", //header: "application/x-www-form-urlencoded",
      "openid": getApp().globalData.openid
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
function byCodeGetOpenid()
{
  var that = this;
  // 登录
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        // 发起网络请求
        wx.request({
          url: "https://sanzhitu.iaimai.com:8080/AdminSystem/eyas/wechat/getOpenid",
          data: {
            code: res.code
          },
          success(res) {
            console.log(res.data.data.openid)
            getApp().globalData.openid = res.data.data.openid
            //将这个openid保存在本地缓存中
            wx.setStorage({
              key: 'openid',
              data: res.data.data.openid
            })

          

          }
        })
      } else {
        console.log('登录失败！' + res.errMsg);

        wx.showToast({
          title: '系统出bug了',
          icon: 'none',
          duration: 2000
        })

      }
    }
  })
}
// 获取当前时间yyyy-mm-dd
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
// 导出模块
// module.exports = {
//   getWebDataWithPostOrGet: getWebDataWithPostOrGet
// }
module.exports = {
  getWebDataWithPostOrGet: getWebDataWithPostOrGet,
  getWebDataWithPost: getWebDataWithPost,
  formatTime: formatTime,
  byCodeGetOpenid: byCodeGetOpenid,
  getNowFormatDate: getNowFormatDate
}
