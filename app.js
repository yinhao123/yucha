//app.js

var utils = require('/utils/util.js');

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
          if (res.code) {
            // 发起网络请求
            wx.request({
              url: utils.BaseUrl+"/getopenid",
              data: {
                code: res.code
              },
              success(res) {
                console.log(res.data)
                App.globalData.openid = res.data.openid;
                //将这个openid保存在本地缓存中
                wx.setStorage({
                  key: 'openid',
                  data: res.data
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },
  globalData: {
    userInfo: null,
    BaseUrl:"47.104.243.243:8080", // 现在这个没啥用，定义访问域名在utils中  :）
    openid:null
  }
})