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
    titleTop: '推修详情',
    listArr: [],
    zfdzp1: [],
    zfdzp2: [],
    ckzpp1: [],
    ckzpp2: [],
    ckzpp3: [],
    ckzpp4: [],
    ckzpp5: [],
    ckzpp6: [],
    gydzp1: [],
    gydzp2: [],
    gydzp3: [],
    gydzp4: [],
    gydzp5: [],
    gydzp6: [],
    gydzp7: [],
    gydzp8: [],
    gydzp9: [],
    gydzp10: [],
    detailId: '',
    allImg: [],
    
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
  reasonOpen: function () {
    var temp = 'detail.reason'
    this.setData({
      [temp]: true
    })
  },
  submitFormId: function (e) {
    console.log(e.detail.formId)
    common.getFormId(e.detail.formId)
  },
  tofix:function(){
    wx.navigateTo({
      url: '../../checkLoss/fix/fix?listId=' + this.data.listId +'&&module=11',
    })
  },
  tofix1: function () {
    wx.navigateTo({
      url: '../../checkLoss/fix/fix?listId=' + this.data.listId + '&&module=111',
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
    detail.unpassReason(e, this, this.data.listId, this.data.sessionId, 'push')
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
    detail.confirmCancel(this, this.data.listId, this.data.sessionId, 'push')
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
      url: '../editFixCar/editFixCar?module=' + this.data.detailId,
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
    detail.confirmDelete(this, this.data.listId, this.data.sessionId, 'push')

  },
  cancelDeleteModal: function () {
    var temp = 'detail.deleteMODAL'
    this.setData({
      [temp]: false,
    })
  },
  link: function (e) {
    wx.setStorageSync('freshFlag', false)
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
      url: '../../allot/allot?module=' + this.data.detailId + '&moduleis=2',
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
  checkMoney:function(e){
    var that=this
    console.log(e.detail.value.money)
    if (e.detail.value.money==''){
      return
    }
    wx.request({
      url: test + 'task/push/set_money',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
      },// 默认值
      data: {
        id: that.data.listId,
        money: e.detail.value.money
      },
      success: function (res) {
        if(res.data.status==1){
          that.onReady()
        }
   
      }
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
  openImg1: function (e) {
    wx.setStorageSync('freshFlag', false)
    var that = this
    var allImgTemp = [];
    for (var j in this.data.allImg) {
      var eachTemp = test + 'uploads/work/' + this.data.allImg[j].path
      allImgTemp.push(eachTemp)

    }
    var picId = e.currentTarget.id;
    console.log(picId)
    for (var i in this.data.allImg) {
      if (this.data.allImg[i].imgId == picId) {
        var a = test + 'uploads/work/' + this.data.allImg[i].path
        console.log(a)
        wx.previewImage({
          current: a, // 当前显示图片的http链接
          urls: allImgTemp// 需要预览的图片http链接列表
        })
        return
      }
    }
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    var bean = options.listId;
    this.setData({
      hostName: test,
      listId: bean
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
  },
  onReady: function () {
    var that = this
    that.setData({
      allImg: [],
      zfdzp1: [],
      zfdzp2: [],
      ckzpp1: [],
      ckzpp2: [],
      ckzpp3: [],
      ckzpp4: [],
      ckzpp5: [],
      ckzpp6: [],
      gydzp1: [],
      gydzp2: [],
      gydzp3: [],
      gydzp4: [],
      gydzp5: [],
      gydzp6: [],
      gydzp7: [],
      gydzp8: [],
      gydzp9: [],
      gydzp10: [],
      detail: [],
      oprator: [],
    })
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    that.data.sessionId = wx.getStorageSync('PHPSESSID')
    that.setData({
      userId: wx.getStorageSync('userid')
    })
    detail.getDetail(that, that.data.sessionId, that.data.listId, 'push', 11)
  },
  checkPass: function () {
    var that = this
    detail.checkPass(that, that.data.listId, this.data.sessionId, 'push')
  },
  onShow: function () {
    var freshFlag = wx.getStorageSync('freshFlag')
    if (freshFlag) {
      this.onReady()
    }
  },
  orders: function () {
    var that = this;
    detail.orders(that, 'push')
  },
  finish: function () {
    detail.finish(this, 'push')
  },
  tocarTrace: function () {
    wx.navigateTo({
      url: '../../carTrace/carTrace?modulsis=6&&list=' + this.data.listId,
    })
  },
  toAddProgress: function () {
    wx.navigateTo({
      url: '../../addProgress/addProgress?moduleis=6&&detailId=' + this.data.detailId,
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