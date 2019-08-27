// pages/msgchongzhi/msgchongzhi.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:"你的课时数不足，请到前台充值课时，充值完成后点击我已充值即可。"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.setData({
      info:options.info
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
   * 我已支付
   */
  myPay:function(){
      // 查询该客户是否已经充值，若没有充值，则弹出提示框“你还未充值”，若充值成功，则提示“你已充值成功”
      var openid = wx.getStorageSync("openid");
      
    var userData = {
      openid: openid
    }

    utils.getWebDataWithPostOrGet({
      url: "AdminSystem/eyas/wechat/getUserInfoByOpenid",
      param: userData,
      method: "GET",
      success: function (data) {
        console.log(data);

        //getApp().globalData.user = data;
        // 获取到restclass,判断这个数的大小
        let end = data.data.userInfo.restclass;
        console.log(end);
        if(end>0){
          wx.showToast({
            title: '充值成功！',
          })
          wx.switchTab({
            url: '/pages/courses/courses',
          })
        }else{
          wx.showToast({
            title: '您还未充值！',
            icon: 'loading',
          })
        }

      }
    })
  },
  /**
   * 联系客服
   */
  linkServer:function(){
    wx.makePhoneCall({
      phoneNumber: '05372781919',
    })
  }
})