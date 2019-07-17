//app.jsv
var app=getApp()

App({
  data:{ 
    cameral:''
  },
  onLaunch: function () {
    var that=this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        that.globalData.js_code = res.code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    var systemHeight = wx.getSystemInfoSync().windowHeight
    var systemWidth = wx.getSystemInfoSync().windowWidth

    that.globalData.cameral = 'width:' + systemWidth + 'px; height:' + systemHeight + 'px';

  },
  onUnload: function () {
  },
  globalData: {
    userInfo: null,
    // hostName: "https://www.chedou123.cn/", 
    // hostName1: "https://www.chedou123.cn/"
    // hostName:"https://dev.feecgo.com/",
    // hostName1:"https://dev.feecgo.com/"

    hostName: "http://192.168.1.104/",
    hostName1: "http://192.168.1.104/"
  }
})