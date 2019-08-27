// pages/myinfo/myinfo.js
var utils = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:1234567890,
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = app.globalData.openid;
    if(openid==null){
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    }
    var webData = {
      "openid":openid
    }
    var that = this;
    utils.getWebDataWithPostOrGet({
      url: "AdminSystem/eyas/wechat/getUserInfoByOpenid",
      param: webData,
      method: "GET",
      success: function (data) {
       that.setData({
         userInfo: data.data.userInfo
       })
      }
    })
  },

 
})