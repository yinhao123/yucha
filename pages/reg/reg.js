// pages/reg/reg.js
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // 注册信息
    var webData = {
      "username": e.detail.value.username,
      "telephone": e.detail.value.telephone,
      "sex": e.detail.value.sex,
      "openid":'896563232'
    }
    var that = this;
    utils.getWebDataWithPostOrGet({
      url: "AdminSystem/eyas/wechat/register",
      param: webData,
      method: "GET",
      success: function (data) {
        console.log(data.success);
        if (data.success){
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          }),
            wx.reLaunch({
              url: '/pages/courses/courses'
            })
        }
      }
    })

  }
})