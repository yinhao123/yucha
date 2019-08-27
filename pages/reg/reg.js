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
  
    this.setData({
      genderIndex: e.detail.value
    })
  },
  bindChildrenGenderChange: function (e) {
   
    this.setData({
      genderIndex: e.detail.value
    })
  },
  bindDateChange(e) {
   
    this.setData({
      date: e.detail.value
    })
  },
  onLoad: function (options) {

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
   
    var children123={
      "cname": e.detail.value.cname,
      "birthday": e.detail.value.birthday,
      "csex": parseInt(e.detail.value.gender) + 1,
    }
    console.log("注册提交！！！！！！");
    console.log(e.detail.value.username);
    if (e.detail.value.username=="" || e.detail.value.telephone == ""  ){
      console.log
      wx.showToast({
        title: '请将信息填写完整再提交！',
        icon: 'none',
        duration: 2000
      })
    return false;
    }else{
      var webData = {
        "username": e.detail.value.username,
        "telephone": e.detail.value.telephone,
        "sex": parseInt(e.detail.value.gender) + 1,
        "children": JSON.stringify(children123),
        "openid": openid
      }

      wx.showModal({
        
        content: '您的姓名：'+e.detail.value.username+'，手机：'+e.detail.value.telephone+'，确认注册？',
        success(res) {
          if (res.confirm) {
           

            wx.request({
              url: 'https://sanzhitu.iaimai.com:8080/AdminSystem/eyas/wechat/register', // 仅为示例，并非真实的接口地址
              data: {
                "username": e.detail.value.username,
                "telephone": e.detail.value.telephone,
                "sex": parseInt(e.detail.value.gender) + 1,
                "children": children123,
                "openid": openid
              },
              method: "POST",
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                app.globalData.cMember = true;
                wx.showToast({
                  title: '注册成功',
                  icon: 'success',
                  duration: 2000
                }),
                  wx.reLaunch({
                    url: '/pages/msgchongzhi/msgchongzhi'
                  })

              }
            })
          } else if (res.cancel) {
           
          }
        }
      })
   



    }



  }
})