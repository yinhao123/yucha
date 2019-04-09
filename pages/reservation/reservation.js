// pages/reservation/reservation.js
var utils = require('../../utils/util.js');



Page(
  {

  /**
   * 页面的初始数据
   */
  data: {
    courseslist: [],
    index:0,
    userid:null,
    recordid:null,
    hday :formate(),
    //currentData: getDay(),
    currentData: getDay(),
    list:null,
    classinfo:null,
    selCurDate: getNowFormatDate(),
    count:0
  },
  /**
   * 进入课程详情页
   */
    seeDetails(e){
      let classinfo = e.currentTarget.dataset.index;
      wx.setStorageSync("record", classinfo);

      let user = wx.getStorageSync("user");
      let userid = user.data.userInfo.userid;
     console.log(userid);
      wx.navigateTo({
        url: '/pages/details/details?userid=' + userid
      })
    },
  /**
   * 点击重选课程
   */
    changeCourses(){
      wx.showModal({
        title: '友情提示',
        content: '你是否想要选择其他课程？',
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
    },
    bindPickerChange(e) {
      console.log('picker发送选择改变，携带值为', parseInt(e.detail.value)+1)
      
      this.setData({
        index: e.detail.value
      })
      let thisClassid = parseInt(e.detail.value) + 1;
      var today = wx.getStorageSync("chooseDay");
     let coursesList = wx.getStorageSync("courseslist");
     
     this.setData({
       classinfo: coursesList[e.detail.value]
     })
     wx.setStorage({
       key: 'classinfo',
       data: coursesList[e.detail.value],
     })
     
      var webData = {
        "selectDate": today,
        "classid": thisClassid
      }
      var that = this;
      utils.getWebDataWithPostOrGet({
        url: "AdminSystem/eyas/wechat/queryRecordInfoForPage",
        param: webData,
        method: "GET",
        success: function (data) {
          console.log("排课列表");
          console.log(data);
          that.setData({
            list: data.data.list
          })
        }
      })


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
      "classid":this.data.classinfo.classid
    }
    this.setData({
      currentData: e.currentTarget.dataset.index,
      selCurDate: tabDate
    })
    console.log("选择的tab日期"+tabDate);
    console.log("选择的tab序号是" + e.currentTarget.dataset.index);
    wx.setStorage({
      key: 'chooseDay',
      data: tabDate,
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
          "selectDate": after_date,
          "classid": this.data.classinfo.classid
        }    
        wx.setStorage({
          key: 'chooseDay',
          data: after_date,
        })
        var that = this;
        utils.getWebDataWithPostOrGet({
          url: "AdminSystem/eyas/wechat/queryRecordInfoForPage",
          param: webData,
          method: "GET",
          success: function (data) {
            console.log(data);
            console.log("排课列表");
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
        wx.setStorage({
          key: 'chooseDay',
          data: after_date,
        })
        var webData = {
          "selectDate": after_date,
          "classid":this.data.classinfo.classid
        }
        var that = this;
        utils.getWebDataWithPostOrGet({
          url: "AdminSystem/eyas/wechat/queryRecordInfoForPage",
          param: webData,
          method: "GET",
          success: function (data) {
            console.log("排课列表");
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
    let classinfo = wx.getStorageSync("classinfo");
    var id = parseInt(classinfo.classid)-1;
    console.log("选择的id是"+id);
    this.setData({
      index:id
    })
    this.setData({
      classinfo: classinfo
    })
    // 这一页要获取到所有的课程,从本地获取之后要赋值给数组
    let courseslist = wx.getStorageSync("courseslist");
    this.setData({
      courseslist: courseslist
    })
   
    // 获取到今天的日期存到Storage中
    var day = new Date();
    var todayData = utils.getNowFormatDate();
    console.log("today is "+todayData);
    wx.setStorage({
      key: 'today',
      data: todayData,
    })
    // 这个是在进入这个页面的时候就要加载今天的课程列表
    var webData = {
      "selectDate": todayData,
      "classid": this.data.classinfo.classid
    }
    var that = this;
    utils.getWebDataWithPostOrGet({
      url: "AdminSystem/eyas/wechat/queryRecordInfoForPage",
      param: webData,
      method: "GET",
      success: function (data) {
        console.log("排课列表");
        console.log(data);
        that.setData({
          list: data.data.list
        })
      }
    })

    try{
      let classinfo = wx.getStorageSync("classinfo");
      this.setData({
        classinfo:classinfo
      })
      if(!classinfo){
        wx.showModal({
          title: '提示',
          content: '请先选择一个课程',
          showCancel:false,
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
      
    }

    var webData = {
     "selectDate": getNowFormatDate(),
  
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
   
    let classinfo = wx.getStorageSync("classinfo");
    console.log("Onshow课程id"+parseInt(classinfo.classid));

    this.setData({
      index: parseInt(classinfo.classid)-1
    })

    this.setData({
      classinfo: classinfo
    })
    var todayData = utils.getNowFormatDate();
    var webData = {
      "selectDate": todayData,
      "classid": parseInt(classinfo.classid) 
    }
    var that = this;
    utils.getWebDataWithPostOrGet({
      url: "AdminSystem/eyas/wechat/queryRecordInfoForPage",
      param: webData,
      method: "GET",
      success: function (data) {
        console.log("排课列表");
        console.log(data);
        that.setData({
          list: data.data.list
        })
      }
    })



      let courseslist = wx.getStorageSync("courseslist");
    this.setData({
      courseslist: courseslist
    })
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
  appointment: function (e)
  {
    console.log(e.target.dataset.index);
    let recordid = e.target.dataset.index;
    let user = wx.getStorageSync("user");
    let userid = user.data.userInfo.userid;
    let course = wx.getStorageSync("classinfo");
    let classid = course.classid;
    console.log("userid : "+userid);
    console.log("classid : "+classid);
    let that = this;
    wx.showModal({
      title: '约课提示',
      content: '约课成功后,不能取消。点击确定，马上预约。',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          // 请求约课信息
          var webData = {
            "userid":userid,
            "recordid": recordid
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
                  url: '/pages/msgwarn/msgwarn?errormsg='+data.errormsg
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