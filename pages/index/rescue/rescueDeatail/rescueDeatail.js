// pages/index/claimsDetail/claimsDetail.js
var test = getApp().globalData.hostName;
var common = require('../../../../pages/common.js');
var detail = require('../../../template/getDataDetail/getDataDetail.js');
Page({
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    paddingTop: '114px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '救援详情',
    details:{},
    detail: {
      opratorRank: ''
    },
    detailId: '',
    listId: '',
    ss: '',
    reason: false,
    steps: [

    ],
    oprationModal: false,
    modal: [false, false, false, false]
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  submitFormId: function (e) {
    console.log(e.detail.formId)
    common.getFormId(e.detail.formId)
  },
  reasonOpen: function () {
    var temp = 'detail.reason'
    this.setData({
      [temp]: true
    })

  },
  showGetCar: function (e) {
    var that = this
    var typeTrace;
    if (e.currentTarget.id == 'jieche') {

      for (var i in that.data.scheduleAll) {
        if (that.data.scheduleAll[i].title == '接车') {
          wx.navigateTo({
            url: '../../showTrace/showTrace?trace=' + that.data.scheduleAll[i].pick_path,
          })
        }
      }

    } else {
      typeTrace = '送车'
      for (var i in that.data.scheduleAll) {
        if (that.data.scheduleAll[i].title == '送车') {
          wx.navigateTo({
            url: '../../showTrace/showTrace?trace=' + that.data.scheduleAll[i].give_path,
          })
        }
      }
    }
  },
  unpassReason: function (e) {
    detail.unpassReason(e, this, this.data.listId, this.data.sessionId, 'rescue')
  },
  cancelClaim: function () {
    var temp = 'detail.oprationModal';
    var temp1 = 'detail.cancelModal'
    this.setData({
      [temp1]: true,
      [temp]: false
    })
  },
  openImg: function (e) {
    wx.setStorageSync('freshFlag', false)
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [e.currentTarget.id] // 需要预览的图片http链接列表
    })

  },
  confirmCancel: function () {
    detail.confirmCancel(this, this.data.listId, this.data.sessionId, 'rescue')
  },
  noCancel: function () {
    var temp = 'detail.cancelModal'
    this.setData({
      [temp]: false
    })
  },
  toEdit: function () {
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: false
    })
    wx.navigateTo({
      url: '../editRescue/editRescue?module=' + this.data.detailId,
    })
  },
  toDelete: function () {
    var temp = 'detail.oprationModal';
    var temp1 = 'detail.deleteMODAL';
    this.setData({
      [temp1]: true,
      [temp]: false
    })
  },
  confirmDelete: function () {
    detail.confirmDelete(this, this.data.listId, this.data.sessionId, 'rescue')

  },
  cancelDeleteModal: function () {
    var temp = 'detail.deleteMODAL'
    this.setData({
      [temp]: false,
    })
  },
  link: function (e) {
    var phonenumber = e.currentTarget.dataset.num;
    wx.makePhoneCall({
      phoneNumber: phonenumber //仅为示例，并非真实的电话号码
    })
  },
  toSelectPeople: function () {
    var pageModule = 0
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: false
    })
    wx.navigateTo({
      url: '../../allot/allot?module=' + this.data.detailId + '&moduleis=4',
    })
  },
  closeOprationModal: function (e) {
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: false
    })
  },
  stopBubble: function () {
  },
  openModal: function () {
    var temp = 'detail.oprationModal'
    this.setData({
      [temp]: true
    })
  },
  closeModal: function () {
    var temp1 = 'detail.check';
    this.setData({
      [temp1]: false
    })
  },
  checkModal: function () {
    var temp = 'detail.oprationModal';
    var temp1 = 'detail.check';
    this.setData({
      [temp]: false,
      [temp1]: true
    })
  },
  onLoad: function (options) {
    var bean = options.listId;
    var tempListId = 'details.listId';
    var tempServiceId = 'details.serviceId';
    var tempModule = 'details.moduNum'
    this.setData({
      [tempServiceId]: wx.getStorageSync('serviceId'),
      [tempModule]: 5,
      listId: bean,
      [tempListId]: bean
    })
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
    console.log(this.data.details)
  },
  getCodeImg: function () {
    var that = this
    var tempCode = 'detail.code';
    var tempImg = 'detail.codeOk'
    var tempHeight = 'detail.codeHeight'

    this.setData({
      [tempCode]: true,
      [tempHeight]: '0px'
    })
    setTimeout(function () {
      that.setData({
        [tempHeight]: '80%',
        [tempImg]: true
      })
    }, 2000)
  },
  closeCodeImg: function () {
    var tempImg = 'detail.codeOk'
    var tempCode = 'detail.code'
    this.setData({
      [tempImg]: false,
      [tempCode]: false
    })
  },
  onReady: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    that.data.sessionId = wx.getStorageSync('PHPSESSID')
    that.data.userId = wx.getStorageSync('userid');
    var tempUserId = 'details.userId'
    that.setData({
      [tempUserId]: that.data.userId
    })
    detail.getDetail(that, that.data.sessionId, that.data.listId, 'rescue', 5)
  },
  checkPass: function () {
    var that = this
    detail.checkPass(that, that.data.listId, this.data.sessionId, 'rescue')
  },
  onShow: function () {
    var freshFlag = wx.getStorageSync('freshFlag')
    if (freshFlag) {
      this.onReady()
    }

  },
  orders: function () {
    var that = this;
    detail.orders(that, 'rescue')
  },
  finish: function () {
    detail.finish(this, 'rescue')
  },
  tocarTrace: function () {
    wx.navigateTo({
      url: '../../carTrace/carTrace?modulsis=5&&list=' + this.data.listId,
    })
  },
  toAddProgress: function () {
    wx.navigateTo({
      url: '../../addProgress/addProgress?moduleis=5&&detailId=' + this.data.detailId,
    })
  },
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorage({
      key: 'freshFlag',
      success: function (res) { },
    })
  },
  onPullDownRefresh: function () {

    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})