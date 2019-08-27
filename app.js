//app.js

var utils = require('./utils/util.js');

App({
  getOpenid: function () {

    // 登录
    return new Promise(function (resolve, reject) {
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
              //  console.log(res.data.data.openid)
                getApp().globalData.openid = res.data.data.openid
                //将这个openid保存在本地缓存中
                wx.setStorage({
                  key: 'openid',
                  data: res.data.data.openid
                })

                var userData = {
                  openid: res.data.data.openid
                }

                utils.getWebDataWithPostOrGet({
                  url: "AdminSystem/eyas/wechat/getUserInfoByOpenid",
                  param: userData,
                  method: "GET",
                  success: function (data) {
                 //   console.log(data);

                    getApp().globalData.user = data;
                  
                  }
                })
              }
            })
          } else {
           // console.log('登录失败！' + res.errMsg);
          }
        }
      })
    })},
/******** */
// login:function(){
//   var that = this;
//   return new Promise(function(resolve,reject){

//   })
// },

/******** */
  onLaunch: function () {
    // 判断该用户有没有课时，没有的话则跳到提示充值页面去了
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;

   
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
    BaseUrl:"https://sanzhitu.iaimai.com:8080", // 现在这个没啥用，定义访问域名在utils中  :）
    openid:null,
    user:null,
    cMember:false
  }
})