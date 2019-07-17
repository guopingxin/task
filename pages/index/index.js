//index.js
//获取应用实例
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: '4J3BZ-YS3CO-XKKWU-SV3H4-HPQF7-5XBUV' // 必填
});

// 调用接口

var adds = {};  
var test = getApp().globalData.hostName;
const app = getApp()
Page({
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '作业端',
    count:0,
    userId:'',
    img_arr: [],
    formdata: '', 

    logOut: false,
    indexTag: true,
    adminPeople: false,
    mine: false,
    modal: false,
    ownModule: {},
    taskArray: [true, true, true, true, true, true, true, true, true, true]
  },
  toData: function () {
    wx.navigateTo({
      url: './allData/allData',
    })
  },
  toOrder:function(){
    wx.navigateTo({
      url: '../mine/allOder/allOder',
    })
  },
  ifUpdate:function(){

  },
  onLoad:function(){
    this.setData({
      serviceType: wx.getStorageSync('serviceType')
    })
    this.data.taskId = wx.getStorageSync('userid')
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
   
    var iphoneReg = /iPhone X/
    console.log(app.globalData.mobileType)
    if (app.globalData.mobileType.match(iphoneReg)) {
      this.setData({
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        container: 'containerX',
      })
    }

  },
  toMaintain:function(){
    wx.navigateTo({
      url: './maintain/maintain',
    })
  },
  logoutModal:function(){
    this.setData({
      logOut:true
    })
  },
  cancelModal:function(){
    this.setData({
      logOut: false
    })
  },
  onReady: function () {
    var that = this;
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    this.data.module = wx.getStorageSync('module');
    console.log(this.data.module)
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId

    
    for (var i in that.data.module) {
      if (that.data.module[i] == 1) {
        that.data.ownModule.checkLoss = true
      } else if (that.data.module[i] == 2) {
        that.data.ownModule.push = true
      } else if (that.data.module[i] == 3) {
        that.data.ownModule.trailer = true
      } else if (that.data.module[i] == 4) {
        that.data.ownModule.rescue = true
      } 
    }
    var moduleTemp = that.data.ownModule
    that.setData({
      ownModule: moduleTemp
    })
    
  },
 onShow:function(){
   this.data.sessionId = wx.getStorageSync('PHPSESSID')
   console.log(this.data.sessionId )
   var that = this
   chechSign(that)
   unhandle(this)
 },
 toRisk:function(){
   wx.navigateTo({
     url: 'risk/risk',
   })
 },
  toYearlyCheck:function(){
    wx.navigateTo({
      url: './yearlyCheck/yearlyCheck',
    })
  },
  toTrail:function(){
    wx.navigateTo({
      url: './trailer/trailer',
    })
  },
  toRescue:function(){
    wx.navigateTo({
      url: './rescue/rescue',
    })
  },

 
  handler:function(){

  },
  toCheckLoss:function(){
    wx.navigateTo({
      url: './checkLoss/checkLoss',
    })
  },
  formSubmit: function (e) {
    var id = e.target.id
    adds = e.detail.value;
    adds.program_id = app.jtappid
    adds.openid = app._openid
    adds.zx_info_id = this.data.zx_info_id
    this.upload()
  },  
  upload: function () {
    var that = this
    for (var i = 0; i < this.data.img_arr.length; i++) {
      wx.uploadFile({
        url: test + 'task/claims/upload',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
        },
        filePath: that.data.img_arr[i],
        name: 'content',
        formData: adds,
        success: function (res) {
          console.log(res)
          if (res) {
            wx.showToast({
              title: '已提交发布！',
              duration: 3000
            });
          }
        }
      })
    }
    this.setData({
      formdata: ''
    })
  },  
  upimg: function () {
    var that = this;
    if (this.data.img_arr.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传三张图片',
        icon: 'loading',
        duration: 3000
      });
    }
  },  

  uploadFileOpt:function(path){
    var that=this
    wx.uploadFile({
      url: test + 'task/claims/upload',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
      },
      filePath: path,
      name: 'content',
      formData: adds,
      success: function (res) {
        console.log(res)
        if (res) {
          wx.showToast({
            title: '已提交发布！',
            duration: 3000
          });
        }
      }
    })

  },
  tempw:function(){
    wx.navigateTo({
      url: './userInfor/userInfor',
    })
  },
  toSign:function(){
    clearInterval(this.data.timer)
    wx.navigateTo({
      url: './sign/sign',
    })
  },
  tofixCar:function(){
    wx.navigateTo({
      url: './fixCar/fixCar',
    })
  },
  tofixCar1: function () {
    wx.navigateTo({
      url: './fixCar1/fixCar',
    })
  },
  onHide:function(){
    clearInterval(this.data.timer)
  },


  getUserInfo: function(e) {
  },
  toUpdate: function(){
    wx.navigateTo({
      url: './updateData/updateData',
    })
    this.setData({
      modal: false
    })
  },
  cancelTo:function(){
    this.setData({
      modal:false
    })　
  },
  onPullDownRefresh: function () {
  this.onShow();

    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },

  
  logOutL:function(e){
    var aa = wx.getStorageSync('userid')
    var that=this;
    try {
      wx.removeStorageSync('userid')
      wx.removeStorageSync('PHPSESSID')
      wx.removeStorageSync('location')
      wx.removeStorageSync('userName')
      wx.removeStorageSync('service')
      wx.navigateBack({
        delta: 1,
      })
    } catch (e) {
      // Do something when catch error
    } 
  }
})
function chechSign(that){
  wx.request({
    url: test + 'task/index/obtain',
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + wx.getStorageSync('PHPSESSID')
    },// 默认值
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
      if (res.data.status == 1) {
        console.log(res.data.location)
        var tempArr = res.data.location;
        var tempId = wx.getStorageSync('userid')
        for (var i in tempArr){
          if (tempArr[i].task_id == tempId){
            recordLocation(that)
            that.data.timer = setInterval(function () {
              console.log('我正在记录位置')
              recordLocation(that)
            }, 300000)
            break
          }else{

          }
        }


      }

    },
    complete: function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  })
}
function recordLocation(that){
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      console.log(res)
      that.setData({
        latitude: res.latitude,
        longitude: res.longitude
      })
      wx.request({
        url: test + 'task/index/report',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + wx.getStorageSync('PHPSESSID')
        },// 默认值
        data: {
          id: wx.getStorageSync('userid'),
          nickname: wx.getStorageSync('nickname'),
          location: that.data.longitude + ',' + that.data.latitude,
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
          if (res.data.status == 1) {


          }

        },
        complete: function () {
          // complete
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
      demo.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function (res) {
          console.log(res.result.address);
          that.data.locationText = res.result.address;
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    },
    fail:function(res){
      console.log(res)
      if (res.errMsg =='getLocation:fail auth deny'){
        console.log('您拒绝了')
        that.setData({
          locationModal:true
        })

      }
    },
  })
 
}
function unhandle(that) {
  wx.request({
    url: test + 'task/order/untreated',
    method: 'GET',
    data: {
      task_id: that.data.taskId
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'PHPSESSID=' + that.data.sessionId
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
      if (res.data.status == 1) {
        that.setData({
          count: res.data.count
        })

      }
    }
  })
}
