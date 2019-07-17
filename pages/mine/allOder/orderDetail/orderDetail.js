// pages/mine/allOder/orderDetail/orderDetail.js
var test = getApp().globalData.hostName;
var test1 = getApp().globalData.hostName1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '订单详情',
    steps: [],
    allImg:[],
  },
  link: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.num //仅为示例，并非真实的电话号码
    })
  },
  openImg:function(e){
    var that=this
    this.data.openImg=true
    console.log(e.target.id)
    wx.previewImage({
      current: e.target.id, // 当前显示图片的http链接
      urls: that.data.allImg // 需要预览的图片http链接列表
    })
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.orderId = options.order_id
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid')
    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
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
    if (this.data.openImg){
      this.data.openImg=false
      return
    }
    this.setData({
      steps: [],
      allImg:[]
    })
    getDetail(this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  accept: function (e) {
    var that = this
    console.log(e.currentTarget.id)
    wx.request({
      url: test + 'task/order/receive',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        order_id: that.data.orderId,
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

        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '接单成功',
          })
          that.data.detailData.server.work_status == 1
          var temp ='detailData.server.work_status'
          that.setData({
            [temp]:3
          })
          wx.setStorageSync('accept', 1)
          wx.setStorageSync('orderId', that.data.orderId)
        } else {

        }

      }
    })
  },
  addProgress: function () {
    wx.navigateTo({
      url: '../../../index/addProgress/addProgress?detailId=' + this.data.orderId + '&&moduleis=100',
    })
  },
  finish: function (e) {
    wx,wx.showLoading({
      title: '处理中...',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.removeStorageSync('accept')
    wx.removeStorageSync('orderId')
    var that = this
    wx.request({
      url: test + 'task/order/finish',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        order_id: that.data.orderId,
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

        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '完成',
          })
          var temp ='detailData.server.work_status'
          that.setData({
            [temp]: 4
          })
          
          wx.setStorageSync('finish', 1)
          wx.setStorageSync('orderId', that.data.orderId)
          that.onShow()

        } else {

        }

      }
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
  copyTBL: function (e) {
    console.log(e.currentTarget.id)
    wx.setClipboardData({
      data: e.currentTarget.id,
      success: function (res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          title: '复制成功',
        })
      }
    });
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
function getDetail(that) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: test + 'task/order/orderInfo',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        order_id: that.data.orderId,
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

        console.log(res)

        if (res.data.status == 1) {
          that.setData({
            detailData: res.data.data
          })
          var aa = []
          var toTrace;
          console.log(res.data.data)
          for (var n in res.data.data.schedule) {
            var last = 'grey';
            if (n == res.data.data.schedule.length - 1) {
              last = 'blue'
            }
            var first = 'has'
            if (n == 0) {
              first = 'nohas'
            }
        
            var year = res.data.data.schedule[n].date;
            var month = year.slice(5, 10);
            var time = year.slice(11)
            var picStr = '';
            if (res.data.data.schedule[n].picture) {
              picStr = res.data.data.schedule[n].picture;
              var tempPic = res.data.data.schedule[n].picture.split(',')
              for (var t in tempPic){
                that.data.allImg.push(test + 'uploads/work/'+tempPic[t])
              }
              
            }
            aa.unshift({ trace: toTrace, first: first, color: last, current: true, month: month, time: time, done: true, pic: picStr.split(","), text: res.data.data.schedule[n].title, desc: res.data.data.schedule[n].date })
          }
          that.setData({
            steps: aa
          })
          console.log(that.data.steps)
        } else {

        }
        that.setData({
          loaded: true
        })
        //that.data.serviceDetail = res
        resolve(that)

      }
    })
  })
}