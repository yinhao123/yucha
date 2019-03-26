// pages/reservation/reservation.js
var utils = require('../../utils/util.js');
import initCalendar from '../../component/calendar/main.js';

// import { getSelectedDay  } from '../../component/calendar/main.js';

import { switchView } from '../../component/calendar/main.js';
import { jump } from '../../component/calendar/main.js';
import { enableArea, enableDays } from '../../component/calendar/main.js';
import { getSelectedDay } from '../../component/calendar/main.js';

const conf = {
  disablePastDay: true, // 是否禁选过去日期
  /**
  * 选择日期后执行的事件
  * @param { object } currentSelect 当前点击的日期
  * @param { array } allSelectedDays 选择的所有日期（当mulit为true时，才有allSelectedDays参数）
  */
  // afterTapDay: (currentSelect, allSelectedDays) => {
  //   console.log("切换了日期");
  //   console.log(currentSelect);
  //   console.log(allSelectedDays);
  //  },
  /**
   * 当改变月份时触发
   * @param { object } current 当前年月
   * @param { object } next 切换后的年月
   */
  // whenChangeMonth: (current, next) => {
  //   console.log("改变了月份");
  //   switchView("week");
  //  },
  /**
   * 日期点击事件（此事件会完全接管点击事件）
   * @param { object } currentSelect 当前点击的日期
   * @param { object } event 日期点击事件对象
   */
  onTapDay(currentSelect, event) {
    console.log("点击了日期");
    console.log(currentSelect.year + "-" + currentSelect.month + "-" + currentSelect.day);
    let thisdata = currentSelect.year + "-" + currentSelect.month + "-" + currentSelect.day;
    console.log(currentSelect);
    console.log(event);
    var webData = {
      // "selectDate": getNowFormatDate(),
      "selectDate": thisdata,
    }

    var that = this;
    utils.getWebDataWithPostOrGet({
      url: "AdminSystem/eyas/wechat/queryRecordInfoForPage",
      param: webData,
      method: "GET",
      success: function (data) {
        console.log(data);
      // 缓存到本地
      wx.setStorage({
        key: 'daychoose',
        data: data.data,
      })
      }
    })
  },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   * @param { object } ctx 当前页面实例
   */
  // afterCalendarRender(ctx) { },
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
    list:null,
    classinfo:null,
    selCurDate: getNowFormatDate(),
    count:0
  },
    
  selDay(e) {
    // console.log("点击事件")
    let cDate = new Date();
    let cYear = cDate.getFullYear();
    let cMandD = e.currentTarget.dataset.query;
    let tabDate = cYear+"-"+cMandD;
    console.log(tabDate);
    // console.log(e.currentTarget.dataset.query);
    var webData = {
      "selectDate": tabDate,
      //  "selectDate": "2019-03-19",
    }
    this.setData({
      currentData: e.currentTarget.dataset.index,
      selCurDate: tabDate
    })
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
    // console.log(this.data.selCurDate)
  },
  // 上一周下周选择
  selWeek(e){
    console.log(e.currentTarget.dataset.week);
    var msg = e.currentTarget.dataset.week;
    
    // getDates();
    if(msg == "next" ){
      if(this.data.count<4){
        //  console.log("当前日期"+this.data.selCurDate);
        //  console.log(this.data.count);
        let dateTemp = this.data.selCurDate.split("-");
        console.log(dateTemp);
        let nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式  
        let millSeconds = Math.abs(nDate) + (7 * 24 * 60 * 60 * 1000);

        let rDate = new Date(millSeconds);
        let year = rDate.getFullYear();
        let month = rDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let date = rDate.getDate();
        if (date < 10) date = "0" + date;
        //获得点击当天一周后的具体时间
        let after_date = year + "-" + month + "-" + date;
        this.setData({
          selCurDate: after_date
        })
        console.log(after_date);
        var webData = {
          "selectDate": after_date
        }    
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
        that.data.count++;
        console.log(that.data.count);
      }else{
          return;
      }
    }else if(msg == "pre"){
      if (this.data.count >0){
        let dateTemp = this.data.selCurDate.split("-");
        console.log(dateTemp);
        let nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式  
        let millSeconds = Math.abs(nDate) - (7 * 24 * 60 * 60 * 1000);

        let rDate = new Date(millSeconds);
        let year = rDate.getFullYear();
        let month = rDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        let date = rDate.getDate();
        if (date < 10) date = "0" + date;
        //获得点击当天一周后的具体时间
        let after_date = year + "-" + month + "-" + date;
        this.setData({
          selCurDate: after_date
        })
        console.log(after_date);
        var webData = {
          "selectDate": after_date
        }
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
        that.data.count--;
        console.log(that.data.count);
      }else{
        return;
      }
    }
    this.setData({
      hday: formate(msg),
    })
  },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
 
    try{
      let classinfo = wx.getStorageSync("classinfo");
      this.setData({
        classinfo:classinfo
      })
      if(!classinfo){
        wx.showModal({
          title: '系统提示',
          content: '请先选择一个课程',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.switchTab({
                url: '/pages/courses/courses',
              })

            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        })
      }
    }catch(e){
      // todo
    }
    initCalendar(conf);
   switchView("week");
    
    var webData = {
     "selectDate": getNowFormatDate(),
      //  "selectDate": "2019-03-19",
    }
  
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
  onShow: function (e) {
    console.log(getSelectedDay());
    switchView("week");
    console.log("onshow...");
 
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
    // wx.navigateTo({
    //   url: '/pages/msgsuccess/msgsuccess'
    // })
    var that = this;
    wx.showModal({
      title: '约课提示',
      content: '约课成功后,上课前24小时内不能取消。点击确定，马上预约。',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          // 请求约课信息
          var webData = {
            "userid": 8,
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
                wx.redirectTo({
                  url: '/pages/msgsuccess/msgsuccess'
                })
              }else{
                wx.redirectTo({
                  url: '/pages/msgwarn/msgwarn'
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
  
})

var w = 0;
var tttddd = utils.formatTime(new Date());

function getDates(w) {
  var new_Date = new Date();
  // console.log(utils.formatTime(new_Date))
  var timesStamp = new_Date.getTime()+w*7*24*60*60*1000;
  var currenDay = new_Date.getDay();
  var dates = [];
  for (var i = 0; i < 7; i++) {
    dates.push(utils.formatTime(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7))));
  }
  return dates
}
//格式化时间
function formate(msg){
  if (msg) {
    if (msg == "pre") {
      w = w - 1;
      if(w<0){
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
    w = 0;
  }
  var dayArr = getDates(w);
  // console.log(dayArr);
  for(var i = 0; i<dayArr.length; i++){
    var days = []
    // console.log(i);
      if(i == 0){
        var week = "周一";
        var day1 = dayArr[i].split("-");
        var day2 = new Array(day1[1],day1[2]);
        var day3 = day2.join("-");
        days.push(week,day3);
        dayArr[i] = days;
      }else if(i == 1){
        var week = "周二";
        var day1 = dayArr[i].split("-");
        var day2 = new Array(day1[1], day1[2]);
        var day3 = day2.join("-");
        days.push(week, day3);
        dayArr[i] = days;
      } else if (i == 2) {
        var week = "周三";
        var day1 = dayArr[i].split("-");
        var day2 = new Array(day1[1], day1[2]);
        var day3 = day2.join("-");
        days.push(week, day3);
        dayArr[i] = days;
      } else if (i == 3) {
        var week = "周四";
        var day1 = dayArr[i].split("-");
        var day2 = new Array(day1[1], day1[2]);
        var day3 = day2.join("-");
        days.push(week, day3);
        dayArr[i] = days;
      } else if (i == 4) {
        var week = "周五";
        var day1 = dayArr[i].split("-");
        var day2 = new Array(day1[1], day1[2]);
        var day3 = day2.join("-");
        days.push(week, day3);
        dayArr[i] = days;
      } else if (i == 5) {
        var week = "周六";
        var day1 = dayArr[i].split("-");
        var day2 = new Array(day1[1], day1[2]);
        var day3 = day2.join("-");
        days.push(week, day3);
        dayArr[i] = days;
      } else if (i == 6) {
        var week = "周日";
        var day1 = dayArr[i].split("-");
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