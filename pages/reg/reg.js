// pages/reg/reg.js
var utils = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2019-01-01',
    gender: ["男", "女"],
    genderIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindGenderChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    this.setData({
      genderIndex: e.detail.value
    })
  },
  bindChildrenGenderChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    this.setData({
      genderIndex: e.detail.value
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
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
// debugger;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // 注册信息
    var openid = app.globalData.openid;
    // children123.cname = e.detail.value.cname,
    //   children123.birthday = e.detail.value.birthday,
    //   children123.csex = parseInt(e.detail.value.gender) + 1; 
    var children123={
      "cname": e.detail.value.cname,
      "birthday": e.detail.value.birthday,
      "csex": parseInt(e.detail.value.gender) + 1,
    }
    var webData = {
      "username": e.detail.value.username,
      "telephone": e.detail.value.telephone,
      "sex": parseInt(e.detail.value.gender)+1,
      "children": JSON.stringify(children123),
      "openid":openid
    }

   console.log( JSON.stringify(webData));
    wx.request({
      url: 'https://sanzhitu.iaimai.com:8080/AdminSystem/eyas/wechat/register', // 仅为示例，并非真实的接口地址
      data: {
        "username": e.detail.value.username,
        "telephone": e.detail.value.telephone,
        "sex": parseInt(e.detail.value.gender) + 1,
        "children": children123,
        "openid": openid
      },
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        console.log(app.globalData.cMember);
        app.globalData.cMember = true;
        console.log(app.globalData.cMember);
        if (data.success) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          }),
            wx.reLaunch({
              url: '/pages/msgchongzhi/msgchongzhi'
            })
        }
      }
    })




    
    console.log(webData);
    var that = this;
    utils.getWebDataWithPostOrGet({
      url: "AdminSystem/eyas/wechat/register",
      param: webData,
      method: "POST",
      success: function (data) {
        // console.log(data.success);
        console.log(app.globalData.cMember);
        app.globalData.cMember = true;
        console.log(app.globalData.cMember);
        if (data.success){
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          }),
            wx.reLaunch({
              url: '/pages/msgchongzhi/msgchongzhi'
            })
        }
      }
    })

  }
})