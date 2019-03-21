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
    imgs: ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 3000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    list:null,
    isMember:false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 加个判断，如果去请求userid
    console.log("课程列表");
    try {
      const value = wx.getStorageSync('userInfo')
      if (value) {
        console.log("从本地缓存中读取userid成功".value)
        this.setData({
          isMember:value.success
        })
        
      }
    } catch (e) {
      console.log("从本地缓存中读取userid失败")
    }

console.log("console this.isMember");

    if(!this.isMember){
        wx.navigateTo({
          url: '../reg/reg',
        })
    }
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

    var webData = {
     
    }
    var that = this;
    utils.getWebDataWithPostOrGet({
      url: "AdminSystem/eyas/wechat/queryClassInfoList",
      param: webData,
      method: "GET",
      success: function (data) {
        console.log(data.data.list);
        that.setData({
          list: data.data.list
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