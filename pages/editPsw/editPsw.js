// pages/editPsw/editPsw.js
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '修改密码',
  },
  backPage:function(){
    wx.navigateBack({
      delta:1
    })
  },
  toEdit:function(e){
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    var that=this;
    console.log(e)
    if (e.detail.value.new.length<6){
      that.setData({
        nuArc: true
      })
      return
    }
    if (e.detail.value.new != e.detail.value.renew){
      that.setData({
        differArc:true
      })
      return
    }
    wx.request({
      url: test + 'task/index/setPassword',
      method: 'POST',
      data:{
        oldPassword: e.detail.value.older,
        newPassword: e.detail.value.new,
        repPassword: e.detail.value.renew,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
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
        console.log(res.data)
        if (res.data.msg =='旧密码错误'){
          that.setData({
            primaryDiffer:true
          })
        }else{
          wx.showToast({
            title: '修改成功',
          })
          setTimeout(function(){
            wx.reLaunch({
              url: '../login/login',
            })
          },1000)
          
        }
     
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var iphoneReg = /iPhone X/
    console.log(app.globalData.mobileType)
    if (app.globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }
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
    this.onShow();
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