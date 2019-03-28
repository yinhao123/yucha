// pages/details/details.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:null,
    recordid:null,
    record:null
  },
  /**
   * 预约课程
   */
  appointClass()
  {

    let userid = this.data.userid;
    let recordid = this.data.record.recordid;
    console.log("userid"+userid);
    console.log("recordid"+recordid);
    // 预约之前前进行确认提示
    wx.showModal({
      title: '预约提示',
      content: '你确定要预约该课程吗？',
      confirmColor:'#576B95',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          // 请求约课信息
          var webData = {
            "userid": userid,
            "recordid": recordid
          }
          var that = this;

          utils.getWebDataWithPostOrGet({
            url: "AdminSystem/eyas/wechat/saveAppointmentInfo",
            param: webData,
            method: "POST",
            success: function (data) {
              console.log(data.success);
              if (data.success) {
                // 跳转到约课成功的页面
                wx.redirectTo({
                  url: '/pages/msgsuccess/msgsuccess'
                })
              } else {
                wx.redirectTo({
                  url: '/pages/msgwarn/msgwarn?errormsg=' + data.errormsg
                })

              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.classid);
   let record = wx.getStorageSync('record');
   this.setData({
     record:record
   })
    this.setData({
      userid:options.userid
    })
    // this.setData({
    //   classinfo:options.classinfo
    // })
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

  }
})