// pages/msgwarn/msgwarn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errormsg:"Sorry,这课程太火爆了，请稍后再试！"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      this.setData({
        errormsg:options.errormsg
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
   * 继续选课
   */
  chooseCourses: function () {
    // 跳转到课程列表

    wx.switchTab({
      url: '/pages/courses/courses'
    })
  },
  /**
   * back Index
   */
  backIndex : function ()
  {
    wx.switchTab({
      url: '/pages/courses/courses'
    })   
  }
})