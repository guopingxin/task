// pages/index/sign/sign.js
var test = getApp().globalData.hostName;
var QQMapWX = require('../../../../qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: '4J3BZ-YS3CO-XKKWU-SV3H4-HPQF7-5XBUV' // 必填
});
var dateTimePicker = require('../../../dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '申请请假',


  },

  backPage: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var iphoneReg = /iPhone X/
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // // 精确到分的处理，将数组的秒去掉
    // var lastArray = obj1.dateTimeArray.pop();
    // var lastTime = obj1.dateTime.pop();
    this.setData({
      uname: wx.getStorageSync('userName'),
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  },
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
  },
  changeDateTime(e) {
    this.setData({
      dateTime: e.detail.value
    });
  },
  submit: function(e) {
    var that=this
    if (e.detail.value.reason==''){
      this.setData({
        reasonNull:true
      })
      return
    }else{
      this.setData({
        reasonNull: false
      })
    }
    wx.showLoading({
      title: '提交中...',
    })
    wx.request({
      url: test + 'task/base/leave',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + wx.getStorageSync('PHPSESSID')
      }, // 默认值
      data: {
        task_id: wx.getStorageSync('userid'),
        cause: e.detail.value.reason,
        start_date: this.data.dateTimeArray1[0][this.data.dateTime1[0]] + `-` + this.data.dateTimeArray1[1][this.data.dateTime1[1]] + `-` +
          this.data.dateTimeArray1[2][this.data.dateTime1[2]] + ` ` +
          this.data.dateTimeArray1[3][this.data.dateTime1[3]] + `:` +
          this.data.dateTimeArray1[4][this.data.dateTime1[4]] + `:` +
          this.data.dateTimeArray1[5][this.data.dateTime1[5]],
        end_date: this.data.dateTimeArray[0][this.data.dateTime[0]] + `-` + this.data.dateTimeArray[1][this.data.dateTime[1]] + `-` +
          this.data.dateTimeArray[2][this.data.dateTime[2]] + ` ` +
          this.data.dateTimeArray[3][this.data.dateTime[3]] + `:` +
          this.data.dateTimeArray[4][this.data.dateTime[4]] + `:` +
          this.data.dateTimeArray[5][this.data.dateTime[5]]
      },
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: '提交成功',
        })
        setTimeout(function(){
          wx.navigateBack({
            delta:1
          })
        },1000)

      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {



  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})