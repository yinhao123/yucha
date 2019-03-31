var base64 = require("../../images/base64");
//index.js
var utils = require('../../utils/util.js');
//获取应用实例

const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  
    imgs: null,
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 3000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    nodes:null,
    classInfo:null,
    classid:null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function (e) {
    console.log(e.cassid);
    this.setData({
        classid:e.cassid
    })
    // 请求该课程相关的信息
    var webData = {
      "classid": e.cassid,

    }
    var that = this;
    utils.getWebDataWithPostOrGet({
      url: "AdminSystem/eyas/wechat/getClassInfoByClassID",
      param: webData,
      method: "GET",
      success: function (data) {
        // console.log(url)
        console.log(data.data.classinfo);
        let str1 = data.data.classinfo.imgcode.decode
        wx.setStorage({
          key: 'classinfo',
          data: data.data.classinfo,
        })
        that.setData({
          classInfo: data.data.classinfo,
          nodes:data.data.classinfo.details,
          imgs: getApp().globalData.BaseUrl +'/AdminSystem'+data.data.classinfo.imgcode
        })
      }
    })

    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse){
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 跳转预约课程
   */
  appointCourses: function ()
  {
    try{
       var classinfo = wx.getStorageSync("classinfo");
       if(classinfo){
         var id = classinfo.classid;
         console.log("id：" + id);
         wx.switchTab({
           url: '/pages/reservation/reservation'
         })
       }
    }catch(e){}
  
  },
  /**
   * 跳转课程列表
   */
  coursesList: function()
  {
    wx.redirectTo({
      url: '/pages/courses/courses',
    })
  }
})