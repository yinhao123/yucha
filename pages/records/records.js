// pages/records/records.js
var app = getApp();
var utils = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:1,
      userid:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  let openid = wx.getStorageSync("openid");
  //   var userData = {
  //     openid: openid
  //   }
   
  //   var that = this;
  //   utils.getWebDataWithPostOrGet({
  //     url: "AdminSystem/eyas/wechat/getUserInfoByOpenid",
  //     param: userData,
  //     method: "GET",
  //     success: function (data) {
  //       console.log(data.data.userInfo);
  //       that.setData({
  //         userid: data.data.userInfo.userid
  //       });
  //     }
  //   })
  //   console.log(this.data.userid)
  //   var userid = getApp().globalData.user.data.userInfo.userid;

    let user = wx.getStorageSync("user");
    let userid = user.data.userInfo.userid;
    var webData={
      "userid": userid
    }
    var that  = this; 
    utils.getWebDataWithPostOrGet({
      url: "AdminSystem/eyas/wechat/queryAppointmentInfo",
      param: webData,
      method: "GET",
      success: function (data) {
        console.log(data.data.list);
          that.setData({
             list : data.data.list
          });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 约课中操作，取消约课
   */
  cancelCourse:function () {
    wx.makePhoneCall({
      phoneNumber: '12345678' 
    })
  }
})