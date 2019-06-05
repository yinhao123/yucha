// pages/courses/courses.js
var base64 = require("../../images/base64");
var utils = require('../../utils/util.js');
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
  
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 3000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    list:null,
    isMember:false,
    openId:null
   
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
              // console.log(res.data.data.openid)
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
                  return new Promise(function (resolve, reject) {
                    if (data) {
                      //  resolve(console.log(data))
                      getApp().globalData.user = data;
                      resolve(data);
                      wx.setStorage({
                        key: 'user',
                        data: data,
                      })
                      if (data.data.userInfo.restclass < 1){
                            wx.redirectTo({
                              url: '/pages/msgchongzhi/msgchongzhi',
                            })
                      }
                    } else {
                      reject("失败.....")
                    }
                  }).then(res => {
                    getApp().globalData.cMember = res.success
                    console.log(res)
                    console.log(app.globalData.cMember);
                    if (!app.globalData.cMember) {
                      wx.redirectTo({
                        url: '../reg/reg',
                      })
                    }
                  })

                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    })
   
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
   
    wx.hideLoading();



  
    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    var user =  wx.getStorageSync("user");
     console.log("用户id");
     var userid = user.data.userInfo.userid;
     console.log(userid);
    var webData = {
      "userid":userid
    }
    var that = this;
    utils.getWebDataWithPostOrGet({
      url: "AdminSystem/eyas/wechat/queryClassInfoList",
      param: webData,
      method: "GET",
      success: function (data) {
        console.log("课程列表");
        console.log(data.data.list);
       wx.setStorage({
         key: 'courseslist',
         data: data.data.list,
       })
        that.setData({
          list: data.data.list,
       
        });
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})