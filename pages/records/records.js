// pages/records/records.js
var app = getApp();
var utils = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:1,
      userid:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    // console.log(e.target.dataset.appointmentid);
    let user = wx.getStorageSync("user");
    let userid = user.data.userInfo.userid;
    let appointmentid = e.target.dataset.appointmentid;
    let status = e.target.dataset.status;
    var that = this;
    if(status == 1){

    
    wx.showModal({
      title: '系统提示',
      content: '你确定要取消该课程的预约？',
      success(res) {
        if (res.confirm) {
        
          var webData = {
            "userid": userid,
            "appointmentid": appointmentid
          }
          
          utils.getWebDataWithPost({
            url: "AdminSystem/eyas/wechat/updateAppointmentInfo",
            param: webData,
            method: "POST",
            success: function (data) {
             
              if(data.success){
              wx.showToast({
                title: '取消成功',
              })
                that.onLoad();
              // 并且将取消预约设置为 已取消 颜色灰色 
            }else{
                wx.showToast({
                  title: data.errormsg ?data.errormsg:"取消失败",
                  icon: 'none',
                })
            }
           
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    } else if (status == 2) {
        wx.showToast({
          title: '该课程已签到',
          icon: 'none'
        })
    } else if (status == 3) {
      wx.showToast({
        title: '该课程已取消预约',
        icon: 'none'
      })
     
    }
  }
})