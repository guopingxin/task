// pages/index/allot/allot.js
var app = getApp()
var wxSortPickerView = require('../allotSort/allotSort.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    paddingTop: '114px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '分配作业员',
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        paddingTop: '140px',
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        titTop: '90px',
        container: 'containerX',
      })
    }
    wx.setStorageSync('freshFlag', true)
    this.data.moduleis = options.moduleis
    console.log(this.data.moduleis)
    this.data.special = options.special
    console.log(options.special)
    console.log(this.data.special)
    var pageModule = options.module
    this.setData({
      listId: pageModule
    })
    console.log(pageModule)

    var that = this
    var test = getApp().globalData.hostName;
    this.data.sessionId = wx.getStorageSync('PHPSESSID');
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;

    wx.request({
      url: test + 'task/base/tasks?module_id=' + options.moduleis,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + this.data.sessionId
      },
      success: function (res) {
        console.log(res)
        var dataType = typeof res.data
        console.log(dataType)
        if (dataType == 'string') {
          var jsonStr = res.data;
          jsonStr = jsonStr.replace(" ", "");
          var temp
          if (typeof jsonStr != 'object') {
            jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
            temp = JSON.parse(jsonStr);
            res.data = temp;
          }
        }
        console.log(res)
        wxSortPickerView.init(res.data.task, that);
      }
    })
  },
  
  formSubmit:function(e){
   console.log(e)

    var that = this
    if (e.detail.value.task == '') {
      this.setData({
        pNull: true,
      })
      return
    }
    var test = getApp().globalData.hostName;
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    var temp = e.detail.value.task.split("&")
    console.log(temp)
    var taskId = temp[0]
    var groupId = temp[1]
    console.log(taskId)
    console.log(groupId)

    if (groupId == null || groupId=='null'){
      groupId=0
    }
    if (that.data.moduleis==1){
      var moduleName ='survey'
    } else if (that.data.moduleis == 2){
      var moduleName = 'push'
    } else if (that.data.moduleis == 3) {
      var moduleName = 'trailer'
    } else if (that.data.moduleis == 4) {
      var moduleName = 'rescue'
    }
      wx.request({
        url: test + 'task/' + moduleName+'/allot',
        method: 'POST',
        data: {
          id: that.data.listId,
          task_id: taskId,
          group_id: groupId
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
        },// 默认值
        success: function (res) {
          console.log(res)
          var dataType = typeof res.data
          console.log(dataType)
          if (dataType == 'string') {
            var jsonStr = res.data;
            jsonStr = jsonStr.replace(" ", "");
            var temp
            if (typeof jsonStr != 'object') {
              jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
              temp = JSON.parse(jsonStr);
              res.data = temp;
            }
          }
          if (that.data.moduleis == 9) {
            wx.setStorageSync('refreshFlag', true)
          }
          wx.showToast({
            title: '分配成功',
            duration:1000
          })
          console.log(res)
        }
      })
      setTimeout(function(){
        if (that.data.special == 100) {
          wx.navigateBack({
            delta: 2,
          })

          return
        } else {
          wx.navigateBack({
            delta: 1,
          })
        }
      },1000)
      
   
    
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
    this.onShow()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
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