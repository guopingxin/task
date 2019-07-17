// pages/index/editClaims/editClaims.js
var edit = require('../../../template/getDataEdit/getDataEdit.js')
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
    titleTop: '编辑',
    listId: ''
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
    this.data.listId = options.module
    console.log(this.data.listId)
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
  formSubmit: function (e) {
    var that = this;
    var ifCar = false;
    edit.editSubmit(e, that, this.data.listId, this.data.sessionId, 'push', 'true', 11)
  },
  cancelRed: function (e) {
    var that = this;
    edit.cancelRed(e, that)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    edit.editShow(this, this.data.sessionId, 'push', 11, this.data.listId)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    this.setData({
      choosedBrand: wx.getStorageSync('brand'),
    })
    if (this.data.choosedBrand) {
      var temp ='carHost.brandName'
      this.setData({
        brandId: this.data.choosedBrand.split('&&')[1],
        [temp]: this.data.choosedBrand.split('&&')[0]
      })
      wx.removeStorageSync('brand')

    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  tofix:function(){
    wx.navigateTo({
      url: '../addFixCar/addbrand/addbrand',
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