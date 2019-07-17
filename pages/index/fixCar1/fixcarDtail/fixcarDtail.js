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
    titleTop: '维修详情',
    failArr: [
      { id: 1, content: '客户暂不修车', class: 'each_cell', active: false },
      { id: 2, content: '维修时间太长', class: 'each_cell each_cell_right', active: false },
      { id: 3, content: '客户自选其他修理厂', class: 'each_cell', active: false },
      { id: 4, content: '事故垫付金额高', class: 'each_cell each_cell_right', active: false },
      { id: 5, content: '配件无现货', class: 'each_cell', active: false }
    ],
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
    feedback:1,
    feedback_con:'',
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
  tofix:function(){
    wx.navigateTo({
      url: '../../checkLoss/fix/fix?listId=' + this.data.listId +'&&module=11',
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
  // addBox:function(){
  //   this.setData({
  //     text_focus:true
  //   })
  // },
  // cancelBox:function(){
  //   this.setData({
  //     text_focus: false
  //   })
  // },
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
  activeTag: function (e) {
    var that = this
    console.log(e.currentTarget.id)
    for (let i in that.data.failArr) {
      if (that.data.failArr[i].id == e.currentTarget.id) {
        that.data.failArr[i].active = true;
      }else{
        that.data.failArr[i].active =false
      }
    }
    that.setData({
      failArr: that.data.failArr
    })
  },
  closeCodeImg: function () {
    var tempImg = 'detail.codeOk'
    var tempCode = 'detail.code'
    this.setData({
      [tempImg]: false,
      [tempCode]: false
    })
  },
  onLoad: function (options) {
    var bean = options.listId;
    var tempListId = 'details.listId';
    var tempServiceId = 'details.serviceId';
    var tempModule = 'details.moduNum'
    this.setData({
      hostName: test,
      [tempServiceId]: wx.getStorageSync('serviceId'),
      [tempModule]: 11,
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
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  closeCodeImg: function () {
    var tempImg = 'detail.codeOk'
    var tempCode = 'detail.code'
    this.setData({
      [tempImg]: false,
      [tempCode]: false
    })
  },
  feedback_status: function (e) {
    this.setData({
      feedback: e.currentTarget.id
    })
  },
  feedback: function (e) {
    var that = this
    var temp1 = ''
    if (that.data.feedback == 2) {
      for (let i in that.data.failArr) {
        if (that.data.failArr[i].active) {
          temp1 += that.data.failArr[i].content + ','
        }
      }
      temp1 = temp1.slice(0, temp1.length - 1)
      var content = e.detail.value.con + ',' + temp1 + '。'
    }else{
      var content = e.detail.value.con + '.'
    }
   
    console.log(e.detail.value.con)
    wx.request({
      url: test + 'task/push/feedback',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
      },// 默认值
      data: {
        id: that.data.listId,
        result: that.data.feedback,
        content: content
      },
      success: function (res) {
        addProgress(that, content)
      }
    })
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
    that.data.userId = wx.getStorageSync('userid')
    var tempUserId = 'details.userId'
    that.setData({
      userId: that.data.userId,
      [tempUserId]: that.data.userId
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
      url: '../../addProgress/addProgress?moduleis=2&&detailId=' + this.data.detailId,
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
function addProgress(that,con) {
  var title = ''
  if (that.data.feedback == 1) {
    title = '反馈结果：推修成功'
  } else if (that.data.feedback == 2) {
    title = '反馈结果：推修失败'
  } else if (that.data.feedback == 3) {
    title = '反馈结果：不确定'
    that.setData({
      feedback:1,
      ok_btn:false
    })
  }
  wx.request({
    url: test + 'task/push/schedule',
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
    },// 默认值
    data: {
      case_id: that.data.listId,
      title: title,
      content: con,
      picture: '',
      type:2
    },
    success: function (res) {
      wx.showToast({
        title: '反馈成功',
        duration: 500
      })
      that.setData({
        feedback_con:''
      })

      setTimeout(function () {

        that.onReady()
      }, 500)
    }
  })
}