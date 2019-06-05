// pages/details/details.js
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:null,
    recordid:null,
    record:null,
    classinfo:null,
    checked:1,
    children: [{ cname: "Loading..." }
    ],
   childrens:[]

  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail);
    this.setData({
      childrens:e.detail.value
    })
    var checkboxItems = this.data.children, 
    values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].cid == values[j]) {
          console.log("改变check" + i + "....." + checkboxItems[i].name);
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      children: checkboxItems
    });
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  /**
   * 选课之前先选择孩子
   */
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },

  /**
   * 在选课的时候，增加孩子选项
   */
  open: function () {
    wx.showActionSheet({
      itemList: this.setData.children,
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  },
  /**
   * 预约课程
   */
  appointClass(e)
  {

    console.log("孩子的数量");
    console.log(this.data.childrens);
    console.log(this.data.childrens.length);
    if(this.data.childrens.length == 0){
       wx.showModal({
         title: '系统提示',
         content: '请先选择报名本课程的孩子',
         success(res) {
           if (res.confirm) {
             console.log('用户点击确定')
           } else if (res.cancel) {
             console.log('用户点击取消')
           }
         }
       })
      
    }else{
      console.log("childrens类型" + typeof (this.data.childrens));
    let userid = parseInt(this.data.userid);
    let recordid = this.data.record.recordid;
      let childrens = parseInt(this.data.childrens.join());
    console.log("userid"+userid);
    console.log("recordid"+recordid);

    var th = this;
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
            "recordid": recordid,
            "childrens": childrens
          }
          var that = this;

          wx.request({
            url: "https://sanzhitu.iaimai.com:8080/AdminSystem/eyas/wechat/saveAppointmentInfo",
            data: webData,
            header: {
              "Content-Type": "application/json", //header: "application/x-www-form-urlencoded",
              "openid": getApp().globalData.openid
            },
            method: "POST",
            success: function (data) {
              console.log("Get back data");
              console.log(data);
              if (data.data.success) {
                // 跳转到约课成功的页面
                wx.redirectTo({
                  url: '/pages/msgsuccess/msgsuccess'
                })
              } else {
                console.log( data.data.errormsg);
                wx.redirectTo({
                  url: '/pages/msgwarn/msgwarn?errormsg=' + data.data.errormsg
                })

              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.classid);
   let record = wx.getStorageSync('record');
   let classinfo = wx.getStorageSync("classinfo");
   this.setData({
     record:record
   });
   this.setData({
     classinfo:classinfo
   })


    this.setData({
      userid:options.userid
    });
    /**
     * 请求孩子信息，并缓存在Storage中
     * 
     */
    var webData = {
      "userid": options.userid,
     
    }
    var that = this;

    utils.getWebDataWithPostOrGet({
      url: "/AdminSystem/eyas/wechat/queryChildrenInfoByUserId",
      param: webData,
      method: "GET",
      success: function (data) {
        console.log(data.success);
        if (data.success) {
          console.log("Success get Children info.");
          console.log(data.data.list);
          let ch = data.data.list;
          
          if(ch.length == 1){
            var ch2 = ch.map(function (obj, index) {
              obj.id = index;//添加id属性
              obj.checked = 1;
              return obj;
            });

            console.log(ch2);
            let arrayChildrens = new Array();
            arrayChildrens[0]=ch2[0].cid
            console.log("arrayChildrens类型" + typeof (arrayChildrens));
            // 如果只有一个孩子，则默认是选中的
            that.setData({
              childrens: arrayChildrens
            })
            wx.setStorageSync("children", ch2);
            that.setData({
              children: ch2
            })
            
          
          }
          wx.setStorageSync("children", data.data.list);
          that.setData({
            children:data.data.list
          })
        } else {
         console.exception("请求孩子信息失败");
        }
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

  }
})