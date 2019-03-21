// pages/reservation/reservation.js
var utils = require('../../utils/util.js');
import initCalendar from '../../component/calendar/main.js';
import { getSelectedDay  } from '../../component/calendar/main.js';
import { switchView } from '../../component/calendar/main.js';
const conf = {
  disablePastDay: true, // 是否禁选过去日期
};

Page(
  {

  /**
   * 页面的初始数据
   */
  data: {
    userid : 1,
    recordid:1,
    hday :formate(),
    //currentData: getDay(),
    currentData: getDay(),
    list:null
  },
    
  selDay(e) {
    // console.log("点击事件")
    console.log(e);
    this.setData({
      currentData: e.currentTarget.dataset.index
    })
  },
  // 上一周下周选择
  selWeek(e){
    console.log(e.currentTarget.dataset.week);
    var msg = e.currentTarget.dataset.week;
    // getDates();
    
    this.setData({
      hday: formate(msg),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    initCalendar(conf);
    switchView("month");
    
    var webData = {
      "selectDate": getNowFormatDate(),
      // "selectDate": "2019-03-19",
    }
    console.log(webData)
    var that = this;
    utils.getWebDataWithPostOrGet({
      url: "AdminSystem/eyas/wechat/queryRecordInfoForPage",
      param: webData,
      method: "GET",
      success: function (data) {
        console.log(data);
      that.setData({
        list: data.data.list
      })
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
    this.calendar.jump();
    switchView();
    console.log(getSelectedDay());
    
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
   * 选课提示
   */
  appointment: function ()
  {
    var that = this;
    wx.showModal({
      title: '约课提示',
      content: '约课成功后,上课前24小时内不能取消。点击确定，马上预约。',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          // 请求约课信息
          var webData = {
            "userid": 1,
            "recordid":1
          }
          var that = this;
          utils.getWebDataWithPostOrGet({
            url: "AdminSystem/eyas/wechat/saveAppointmentInfo",
            param: webData,
            method: "POST",
            success: function (data) {
              console.log(data.success);
              if (data.success){
                // 跳转到约课成功的页面
                wx.navigateTo({
                  url: '/pages/msgsuccess/msgsuccess'
                })
              }else{
                url: '/pages/msgwarn/msgwarn'
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  
})

var w = 1;

function getDates(w) {
  // debugger;
  var new_Date = new Date()
  var timesStamp = new_Date.getTime()+w*7*24*60*60*1000;
  var currenDay = new_Date.getDay();
  var dates = [];
  for (var i = 0; i < 7; i++) {
    dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/[年月]/g, '-').replace(/[日上下午]/g, ''));
  }
  // console.log(dates);
  return dates
}
//格式化时间
function formate(msg){
  if (msg) {
    if (msg == "pre") {
      w = w - 1;
      if(w<1){
        wx.showToast({
          title: '上周已过去啦',
          icon: 'loading',
          duration: 2000
        })
        w=1;
        return;
      }
    } else if (msg == "next") {
      w = w + 1;
      // getDates(w)
      if(w>4){
        wx.showToast({
          title: '下周再来吧',
          icon: 'loading',
          duration: 2000
        })
        w = 4;
        return;
      }
    }
  } else {
    w = 1;
  }
  var formates = {}
  var dayArr = getDates(w);
  for(var i = 0; i<dayArr.length; i++){
    var days = []
    // console.log(i);
      if(i == 0){
        var week = "周一";
        var day1 = dayArr[i].split("/");
        var day2 = new Array(day1[1],day1[2]);
        var day3 = day2.join("-");
        days.push(week,day3);
        dayArr[i] = days;
      }else if(i == 1){
        var week = "周二";
        var day1 = dayArr[i].split("/");
        var day2 = new Array(day1[1], day1[2]);
        var day3 = day2.join("-");
        days.push(week, day3);
        dayArr[i] = days;
      } else if (i == 2) {
        var week = "周三";
        var day1 = dayArr[i].split("/");
        var day2 = new Array(day1[1], day1[2]);
        var day3 = day2.join("-");
        days.push(week, day3);
        dayArr[i] = days;
      } else if (i == 3) {
        var week = "周四";
        var day1 = dayArr[i].split("/");
        var day2 = new Array(day1[1], day1[2]);
        var day3 = day2.join("-");
        days.push(week, day3);
        dayArr[i] = days;
      } else if (i == 4) {
        var week = "周五";
        var day1 = dayArr[i].split("/");
        var day2 = new Array(day1[1], day1[2]);
        var day3 = day2.join("-");
        days.push(week, day3);
        dayArr[i] = days;
      } else if (i == 5) {
        var week = "周六";
        var day1 = dayArr[i].split("/");
        var day2 = new Array(day1[1], day1[2]);
        var day3 = day2.join("-");
        days.push(week, day3);
        dayArr[i] = days;
      } else if (i == 6) {
        var week = "周日";
        var day1 = dayArr[i].split("/");
        var day2 = new Array(day1[1], day1[2]);
        var day3 = day2.join("-");
        days.push(week, day3);
        dayArr[i] = days;
      }
  }
  return dayArr;

}
//获得当前是周几
function getDay(){
  // debugger;
  var week;
  var weeks = new Date().getDay();  
  console.log(week);
  switch(weeks){
      case 0:
      week = 6;
      break;
      case 1:
      week = 0;
      break;
      case 2:
      week = 1;
      break;
      case 3:
      week = 2;
      break;
      case 4:
      week = 3;
      break;
      case 5:
      week = 4;
      break;
      case 6:
      week = 5;
      break;
  }
  return week;
}

// 获取当前时间yyyy-mm-dd
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate;
}