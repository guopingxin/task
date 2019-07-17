// pages/mine/mine.js
var test = getApp().globalData.hostName;
var common = require('../../pages/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '我',

  },
  submitFormId: function (e) {
    console.log(e.detail.formId)
    common.getFormId(e.detail.formId)
  },
  toOrder:function(){
    wx.navigateTo({
      url: './allOder/allOder',
    })
  },
  toDataOrder:function(){
    wx.navigateTo({
      url: './toDataOrder/toDataOrder',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      hostName: test,
      serviceType: wx.getStorageSync('serviceType')
    })
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }

  },
  unbindWX: function () {
    var that = this
    wx.showLoading({
      title: '解绑中...',
    })
    wx.login({
      success: res1 => {
        console.log(res1)
        wx.request({
          url: test + 'task/index/unbind',
          method: 'GET',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=' + that.data.sessionId
          },
          success: function (res) {
            var dataType = typeof res.data
            if (dataType == 'string') {
              var jsonStr = res.data;
              jsonStr = jsonStr.replace(" ", "");
              var temp
              if (typeof jsonStr != 'object') {
                jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
                temp = JSON.parse(jsonStr);
                res.data = temp;
              }
            }
            if (res.data.status == 1) {
              wx.showToast({
                title: '解绑成功',
              })
              var temp = 'userInfor.openid'
              console.log(that.data.userInfor)
              that.setData({
                [temp]: false
              })

            } else {
              wx.showModal({
                title: '请求超时',
                content: '',
              })
            }
            wx.hideLoading()


          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  bindWX: function (e) {
    var that = this
    wx.showLoading({
      title: '绑定中...',
    })
    wx.login({
      success: res1 => {
        console.log(res1)
        wx.request({
          url: test + 'task/index/bind',
          method: 'POST',
          data: {
            js_code: res1.code
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=' + that.data.sessionId
          },
          success: function (res) {
            var dataType = typeof res.data
            if (dataType == 'string') {
              var jsonStr = res.data;
              jsonStr = jsonStr.replace(" ", "");
              var temp
              if (typeof jsonStr != 'object') {
                jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
                temp = JSON.parse(jsonStr);
                res.data = temp;
              }
            }
            if (res.data.status == 1) {
              wx.showToast({
                title: '绑定成功',
              })
              var temp = 'userInfor.openid'
              console.log(that.data.userInfor)
              that.setData({
                [temp]: true
              })

            } else if (res.data.status == -2) {
              wx.showModal({
                title: '该微信已被绑定到其他帐号',
                content: '',
              })
            } else {
              wx.showModal({
                title: '请求超时',
                content: '',
              })
            }
            wx.hideLoading()


          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    wx.request({
      url: test + 'task/index/taskInfo',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      }, // 默认值
      data: {
        id: wx.getStorageSync('userid')
      },
      success: function(res) {
        console.log(res)
        var dataType = typeof res.data
        console.log(dataType)
        if (dataType == 'string') {
          var jsonStr = res.data;
          jsonStr = jsonStr.replace(" ", "");
          var temp
          if (typeof jsonStr != 'object') {
            jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
            temp = JSON.parse(jsonStr);
            res.data = temp;
          }
        }
        console.log(res.data.task)
        that.setData({
          userInfor: res.data.task,
        })
        console.log(that.data.userInfor)

      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
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
  updateAvatar: function() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res.tempFilePaths[0])
        wx.showLoading({
          title: '上传中...',
        })
        wx.uploadFile({
          url: test + 'task/index/up_head',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=' + that.data.sessionId
          },
          filePath: res.tempFilePaths[0],
          name: 'image',
          formData: {
            image: ''
          },
          success: res => {

            var jsonStr = res.data;
            jsonStr = jsonStr.replace(" ", "");
            if (typeof jsonStr != 'object') {
              jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
              var jj = JSON.parse(jsonStr);
              res.data = jj
            }
            console.log(res)
            if (res.data.status == 1) {
              console.log(res.data.file_name)
              setUserAvatar(that, res.data.file_name)
            }


          }
        })
      }
    })
  },
  tempw:function(){
    wx.navigateTo({
      url: '../../../../editPsw/editPsw',
    })
  },
  toData: function() {
    wx.navigateTo({
      url: './allData/allData',
    })
  },
  logoutModal: function() {
    this.setData({
      logOut: true
    })
  },
  logOutL: function(e) {
    var aa = wx.getStorageSync('userid')
    var that = this;
    try {
      wx.removeStorageSync('userid')
      wx.removeStorageSync('PHPSESSID')
      wx.removeStorageSync('location')
      wx.removeStorageSync('userName')
      wx.removeStorageSync('service')
      wx.redirectTo({
        url: '../login/login',
      })
    } catch (e) {
      // Do something when catch error
    }
  },
  cancelModal: function() {
    this.setData({
      logOut: false
    })
  },
  toSign:function(){
    wx.navigateTo({
      url: 'sign/sign',
    })
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

function setUserAvatar(that, image) {

  wx.request({
    url: test + 'task/index/up_head',
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'PHPSESSID=' + that.data.sessionId
    }, // 默认值
    data: {
      image: image
    },
    success: function(res) {
      console.log(res)
      var dataType = typeof res.data
      console.log(dataType)
      if (dataType == 'string') {
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        var temp
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
          temp = JSON.parse(jsonStr);
          res.data = temp;
        }
      }
      wx.hideLoading()
      wx.showToast({
        title: '修改成功',
      })
      that.onReady()

    },
    complete: function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  })
}