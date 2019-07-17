// pages/index/mine/myOrder/myOrder.js
var test = getApp().globalData.hostName;
var test1 = getApp().globalData.hostName1;
var common = require('../../../pages/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titTop:'64px',
    titleTop: '订单列表',
    orderList: [],
    page: 1,
    decoration: 1,
    work_status: '',
    status: ''
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  submitFormId: function(e) {
    console.log(e.detail.formId)
    common.getFormId(e.detail.formId)
  },
  changeType: function(e) {
    var that = this
    that.setData({
      noAllData: false,
      noData: false
    })
    console.log(e)
    that.data.page = 1
    this.setData({
      decoration: e.currentTarget.dataset.id,
      orderList: [],
      loaded: false
    })
    if (e.currentTarget.dataset.id == 1) {
      that.data.work_status = ''
      that.data.status = ''
    } else if (e.currentTarget.dataset.id == 2) {
      that.data.work_status = 2
      that.data.status = ''
    } else {
      that.data.work_status = ''
      that.data.status = 3
    }
    getOrderList(this).then(function() {
      that.setData({
        loaded: true
      })
    })
  },
  topay: function() {
    wx.navigateTo({
      url: './Payment/Payment',
    })
  },
  addProgress: function(e) {
    wx.setStorageSync('pogressId', e.currentTarget.id)
    wx.navigateTo({
      url: '../../index/addProgress/addProgress?detailId=' + e.currentTarget.id + '&&moduleis=100',
    })
  },
  toOrderDetail: function() {
    wx.navigateTo({
      url: './orderDetail/orderDetail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      hostName1: test1
    })
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
        titTop:'90px'
      })
    }
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    getOrderList(this)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (wx.getStorageSync('finish') == 1) {
      var tempId = wx.getStorageSync('orderId')
      for (var i in this.data.orderList) {
        if (this.data.orderList[i].id == tempId) {
          var temp1 = 'orderList[' + i + '].work_status'
          this.setData({
            [temp1]: 4
          })
          break
        }
      }
      wx.removeStorageSync('finish')
      wx.removeStorageSync('orderId')
    }
    if (wx.getStorageSync('accept') == 1) {
      var tempId = wx.getStorageSync('orderId')
      for (var i in this.data.orderList) {
        if (this.data.orderList[i].id == tempId) {
          var temp1 = 'orderList[' + i + '].work_status'
          this.setData({
            [temp1]: 3
          })
          break
        }
      }
      wx.removeStorageSync('accept')
      wx.removeStorageSync('orderId')
    }
    if (wx.getStorageSync('pogressId')){
      if (wx.getStorageSync('progressed')){
        console.log('哈哈')
        var tempId = wx.getStorageSync('pogressId')
        for (var i in this.data.orderList) {
          if (this.data.orderList[i].id == tempId) {
            console.log(this.data.orderList[i])
            var temp1 = 'orderList[' + i + '].schedule'
            var schedule=this.data.orderList[i].schedule+1
            this.setData({
              [temp1]: schedule
            })
            break
          }
        }
      }
      wx.removeStorageSync('pogressId')
      wx.removeStorageSync('progressed')
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  toAllot: function(e) {
    wx.navigateTo({
      url: '../../index/allot/allot?module=' + e.currentTarget.id + '&&moduleis=100',
    })
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
    var that = this
    this.data.page++
      this.setData({
        loaded: false
      })
    console.log(this.data.page)
    getOrderList(that)

  },

  accept: function(e) {
    var that = this
    wx.showLoading({
      title: '接单中...',
    })
    console.log(e.currentTarget.id)
    wx.request({
      url: test + 'task/order/receive',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        order_id: e.currentTarget.id,
      },
      success: function(res) {
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

        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '接单成功',
          })
          for (let i in that.data.orderList) {
            if (that.data.orderList[i].id == e.currentTarget.id) {
              var temp = 'orderList[' + i + '].work_status'
              that.setData({
                [temp]: 3
              })
              break
            }
          }

        } else {
          wx.showModal({
            title: '接单失败',
            content: '',
          })

        }

      }
    })
  },

  finish: function(e) {
    var that = this
    wx.showLoading({
      title: '处理中...',
    })
    console.log(e.currentTarget.id)
    wx.request({
      url: test + 'task/order/finish',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        order_id: e.currentTarget.id,
      },
      success: function(res) {
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

        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '完成',
          })
          for (let i in that.data.orderList) {
            if (that.data.orderList[i].id == e.currentTarget.id) {
              var temp = 'orderList[' + i + '].work_status'
              that.setData({
                [temp]: 4
              })
              break
            }
          }

        } else {
          wx.showModal({
            title: '失败',
            content: '',
          })
        }

      }
    })
  },
  toDetail: function(e) {
    wx.navigateTo({
      url: './orderDetail/orderDetail?order_id=' + e.currentTarget.id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

function getOrderList(that) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: test + 'task/order/index',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        task_id: that.data.userId,
        page: that.data.page,
        status: that.data.status,
        work_status: that.data.work_status
      },
      success: function(res) {
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

        console.log(res)

        if (res.data.status == 1) {
          for (var i in res.data.data) {
            that.data.orderList.push(res.data.data[i])
          }
          that.setData({
            loaded: true,
            orderList: that.data.orderList
          })
        } else {
          if (res.data.data == '暂无订单') {
            if (that.data.orderList.length == 0) {
              that.setData({
                noAllData: true
              })
            } else {
              that.setData({
                noData: true
              })
              setTimeout(function() {
                that.setData({
                  noData: false
                })
              }, 1000)
            }
          }
        }
        that.setData({
          loaded: true,
          loaded1: true
        })
        //that.data.serviceDetail = res


        resolve(that)
      }
    })
  })
}