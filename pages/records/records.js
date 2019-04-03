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
  cancelCourse:function (e) {
    console.log(e.target.dataset.appointmentid);
    let user = wx.getStorageSync("user");
    let userid = user.data.userInfo.userid;
    let appointmentid = e.target.dataset.appointmentid;
    var that = this;
    wx.showModal({
      title: '系统提示',
      content: '你确定要取消该课程的预约？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          var webData = {
            "userid": userid,
            "appointmentid": appointmentid
          }
          
          utils.getWebDataWithPost({
            url: "AdminSystem/eyas/wechat/updateAppointmentInfo",
            param: webData,
            method: "POST",
            success: function (data) {
              console.log(data);
              if(data.success){
              wx.showToast({
                title: '取消成功',
              })
            }else{
                wx.showToast({
                  title: data.errormsg ?data.errormsg:"取消失败",
                  icon: 'none',
                })
            }
              // that.setData({
              //   list: data.data.list
              // });
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})