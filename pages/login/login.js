// pages/login/login.js
var app =getApp()
var test = getApp().globalData.hostName;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    eyes: true,
    text: 'password',
    userPwd: "",
    modal: true,
    dataa: ''
  },
  formSubmit: function (e) {
    var that = this

    console.log(e)
    if (e.detail.value.name == '') {
      this.setData({
        userNull: true
      })
      return
    }
    if (e.detail.value.pass == '') {
      this.setData({
        pswNull: true
      })
      return
    }
    this.setData({
      logining: true
    })
    wx.request({
      url: test + 'task/login',
      method: 'POST',
      data: {
        mobile: e.detail.value.name,
        password: e.detail.value.pass
      },
      dataType: String,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'// 默认值
      },
      success: function (res) {
        console.log(app.globalData.js_code)

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
        if (res.data.status == 1) {

          wx.setStorageSync('job_no', res.data.task.job_no); //工号
          wx.setStorageSync('saveName', e.detail.value.name);
          wx.setStorageSync('serviceId', res.data.task.service_id);
          wx.setStorageSync('savePsw', e.detail.value.pass);
          wx.setStorageSync('gruop', res.data.task.group_id);
          wx.setStorageSync('rank', res.data.task.type);
          wx.setStorageSync('userid', res.data.task.id);
          wx.setStorageSync('userName', res.data.task.nickname);
          wx.setStorageSync('userType', res.data.task.type);
          wx.setStorageSync('clock', res.data.task.clock);
          wx.setStorageSync('serviceType', res.data.task.service_type);
          wx.setStorageSync('nickname', res.data.task.nickname);
          var userId = wx.getStorageSync('userid');
          var wxSession = res.data.task.session_id;
          var serviseModule = res.data.task.modules;
          wx.setStorageSync('module', res.data.task.module_id);
          wx.setStorageSync('PHPSESSID', wxSession);
          console.log("$$$$$$$$$" + wxSession);
          //updateOpneid(that, res.data.task.session_id)
          console.log(userId);
          that.setData({
            userNull: false,
            pswNull: false,
            error: false,
          })
          wx.switchTab({
            url: '../index/index'
          })
          setTimeout(function(){
            that.setData({
              logining:false
            })
          },1000)
        } else {
          setTimeout(function () {

            that.setData({
              logining: false
            })
          }, 1000)
          that.setData({
            userNull: false,
            pswNull: false,
            error: true,
          })
        }
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      },
      fail(res) {
        var ss = res.data.status
        that.setData({
          dataa: ss
        })
      }
    })



  },

  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  toeditPsw: function () {
    wx.navigateTo({
      url: '../mobilePsw/mobilePsw',
    })
  },
  openEyes: function (e) {
    console.log(e.currentTarget.dataset.num)
    this.setData({
      eyes: !this.data.eyes
    })
    if (e.currentTarget.dataset.num == 'open') {
      this.setData({
        text: 'text'
      })
    } else {
      this.setData({
        text: 'password'
      })
    }

  },
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },

  jumpToMyPage: function () {
    var that = this;
    //判断用户名是否为空

    if (this.data.userName == '') {
      this.setData({
        pswNull: false,
        error: false,
        userNull: true
      })
      return
    }

    //判断密码是否为空

    if (this.data.userPwd == '') {
      this.setData({
        userNull: false,
        error: false,
        pswNull: true
      })
    }
    
    var sessionId;
    wx.showNavigationBarLoading() //在标题栏中显示加载
   



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        app.globalData.mobileType = res.model
      }
    })

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
    this.setData({
      userName: wx.getStorageSync('saveName'),
      userPwd: wx.getStorageSync('savePsw')
    })

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
    this.onShow()
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
function updateOpneid(that, session){
  wx.request({
    url: test + 'task/base/resed',
    method: 'POST',
    data: {
      js_code: app.globalData.js_code
    },
    dataType: String,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session
    },
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
      console.log(res)
      
    },
    complete: function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },
    fail(res) {
      var ss = res.data.status
      that.setData({
        dataa: ss
      })
    }
  })
}