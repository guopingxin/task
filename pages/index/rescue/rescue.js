// pages/index/adminAgency/adminAgency.js
var list = require('../../template/getDataList/getDataList.js');
var test = getApp().globalData.hostName;
var common = require('../../../pages/common.js')
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
    titleTop: '救援列表',
    allData: {
      listAtrr: [],
      theModule: '所有业务',
      iconTask: 'zan-icon zan-icon-records',
      active_tit: 'check',
      noactive_tit: 'loss',
    },
    toright: false,
    toLeft: true,
    keywords: '',
    page: 1,
    taskId: ''
  },
  submitFormId: function (e) {
    console.log(e.detail.formId)
    common.getFormId(e.detail.formId)
  },
  toAll: function () {
    var listAtrr = 'allData.listAtrr';
    var temp1 = 'allData.active_tit'
    var temp2 = 'allData.noactive_tit'
    this.setData({
      [listAtrr]: [],
      [temp1]: 'check',
      [temp2]: 'loss',
      keywords: '',
      page: 1,
      toLeft: false,
      taskId: this.data.userId
    })
    this.onShow()
  },
  toEach: function () {
    var listAtrr = 'allData.listAtrr';
    var temp1 = 'allData.active_tit'
    var temp2 = 'allData.noactive_tit'
    this.setData({
      [listAtrr]: [],
      [temp1]: 'loss',
      [temp2]: 'check',
      keywords: '',
      page: 1,
      taskId: ''
    })
    this.onShow()
  },
  handletouchmove: function (event) {
    var that = this;
    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    var tx = currentX - this.data.lastX
    var ty = currentY - this.data.lastY
    var text = ""
    //左右方向滑动
    var iconTask = 'allData.iconTask';
    var theModule = 'allData.theModule';
    var listAtrr = 'allData.listAtrr';
    var theModule = 'allData.theModule';
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < -20) {
        text = "向左滑动"
        if (that.data.toright) {
          return
        } else {
          console.log(that.data.userId)
          if (that.data.rank == 1) {
            wx.showLoading({
              title: '加载中...',
            })

            that.setData({
              [iconTask]: 'zan-icon zan-icon-contact',
              [theModule]: '我的业务',
              toright: true,
              [listAtrr]: [],
              keywords: '',
              page: 1,
              toLeft: false,
              taskId: that.data.userId
            })
            that.onShow()
          } else {
            return
          }
        }


      }

      else if (tx > 20) {
        text = "向右滑动"
        if (that.data.toLeft) {
          return
        } else {
          console.log(that.data.userId)
          if (that.data.rank == 1) {
            wx.showLoading({
              title: '加载中...',
            })
            that.setData({
              [iconTask]: 'zan-icon zan-icon-records',
              [theModule]: '所有业务',
              toright: false,
              toLeft: true,
              [listAtrr]: [],
              keywords: '',
              page: 1,
              taskId: ''
            })
            that.onShow()
          } else {
            return
          }
        }
      }



    }
    //上下方向滑动
    else {
      if (ty < 0)
        text = "向上滑动"
      else if (ty > 0)
        text = "向下滑动"
    }
    console.log(text)

    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
    this.setData({
      text: text,
    });
  },
  cancelSearch: function () {
    var temp = 'allData.listAtrr'
    var cancelSearchIcon = 'allData.cancelSearchIcon'
    this.setData({
      keywords: '',
      page: 1,
      task_id: '',
      keyWordsTemp: '',
      [temp]: [],
      [cancelSearchIcon]: false,
    })
    this.onShow()

  },
  toChoose: function (e) {
    var that = this
    var cancelSearchIcon = 'allData.cancelSearchIcon'
    if (e.detail.value == '') {
      return
    }
    var temp = 'allData.listAtrr'
    that.setData({
      [cancelSearchIcon]: true,
      [temp]: [],
      keywords: e.detail.value
    })
    that.onShow()


  },
  cancelSearch: function () {
    var temp = 'allData.listAtrr'
    this.setData({
      keywords: '',
      page: 1,
      task_id: '',
      keyWordsTemp: '',
      [temp]: [],
      cancelSearchIcon: false,
    })
    this.onShow()

  },
  toChoose: function (e) {
    var that = this
    if (e.detail.value == '') {
      return
    }
    var temp = 'allData.listAtrr'
    that.setData({
      cancelSearchIcon: true,
      [temp]: [],
      keywords: e.detail.value
    })
    that.onShow()


  },
  toAddAgency: function () {
    wx.navigateTo({
      url: 'addRescue/addRescue',
    })
  },
  toDetail: function (e) {
    console.log(e)
    var listId = e.currentTarget.id
    console.log(listId)
    wx.navigateTo({
      url: 'rescueDeatail/rescueDeatail?listId=' + listId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '载入中...',
    })
    this.data.taskId = wx.getStorageSync('userid')
    this.data.rank = wx.getStorageSync('rank')
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
    var that = this
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var temp = 'allData.gif'
    this.setData({
      [temp]: true,
    })
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    //获取列表
    var promiseTemp = new Promise(function (resolve, reject) {
      console.log('start new Promise...');
      resolve();
    });
    list.getList(that, 'rescue', session_id, that.data.page, that.data.keywords, 5)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var temp = 'allData.listAtrr'
    this.setData({
      [temp]: [],
      keywords: '',
      page: 1
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

    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page++;
    this.setData({
      gif: true
    })
    console.log(this.data.page)
    this.onShow();
    console.log('上啦啦')
    console.log(this.data.page)
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})