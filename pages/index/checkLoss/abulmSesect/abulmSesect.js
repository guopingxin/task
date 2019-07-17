// pages/index/checkLoss/abulmSesect/abulmSesect.js
var test = getApp().globalData.hostName;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageReady:false,
    allDetail:[
      {id:0,kind:'ckzp',pos:'p1'},
      { id: 1, kind: 'ckzp', pos: 'p2' },
      { id: 2, kind: 'ckzp', pos: 'p3' },
      { id: 3, kind: 'ckzp', pos: 'p4' },
      { id: 4, kind: 'ckzp', pos: 'p5' },
      { id: 5, kind: 'ckzp', pos: 'p6' },
      { id: 6, kind: 'gydz', pos: 'p1' },
      { id: 7, kind: 'gydz', pos: 'p2' },
      { id: 8, kind: 'gydz', pos: 'p3' },
      { id: 9, kind: 'gydz', pos: 'p4' },
      { id: 10, kind: 'gydz', pos: 'p5' },
      { id: 11, kind: 'gydz', pos: 'p6' },
      { id: 12, kind: 'gydz', pos: 'p7' },
      { id: 13, kind: 'gydz', pos: 'p8' },
      { id: 14, kind: 'gydz', pos: 'p9' },
      { id: 15, kind: 'gydz', pos: 'p10' },
      { id: 16, kind: 'zfdz', pos: 'p1' },
      { id: 17, kind: 'zfdz', pos: 'p2' },
    ],
    theKind:'',
    allmg:[],
    result:[],
  },
  seletPic:function(){
    var that=this;
    console.log('ppp')
    setTimeout(function(){
      that.setData({
        pageReady: true
      })
    },1000)
    
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        for (var j in res.tempFilePaths){
          that.data.allmg.push(res.tempFilePaths[j])
        }
        that.setData({
          allmg: that.data.allmg
        })
        for (var i in that.data.allDetail){
          if (that.data.allDetail[i].id == that.data.addClassifyId){
            that.data.theKind = that.data.allDetail[i].kind
            that.data.thePos = that.data.allDetail[i].pos
            console.log(that.data.allDetail[i])
            var temp = parseInt(that.data.allDetail[i].id)+1
            var lastPic = res.tempFilePaths[res.tempFilePaths.length-1];
            wx.showLoading({
              title: '上传中...',
              duration:1000000
            })
            Promise.all(res.tempFilePaths.map(item => wx.uploadFile({
              url: 'https://www.fendais.com/task/base/uploads',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
              },
              filePath: item,
              name: 'image',
              formData: {
                address: encodeURI(that.data.locationAddress),
                name: encodeURI(that.data.serviceName),
                task_name: encodeURI(that.data.userName)
              },
              success: res => {
                console.log(res)
           
                console.log(item)
                if (item == lastPic){
                  console.log('最后一张了')
                  wx.hideToast()
                }
                var jsonStr = res.data;
                jsonStr = jsonStr.replace(" ", "");
                if (typeof jsonStr != 'object') {
                  jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
                  var jj = JSON.parse(jsonStr);
                  console.log(jj)
                  that.data.result.push(jj.file_name)
                }
               
              }
            }))).then(res => {
              console.log(res)
              console.log(111)
            
            })
              
            
          }
        }
      }
    })
  },
  submit:function(){
    var that=this
    var posTemp;
    var Temp = that.data.result 
    console.log(Temp)
    console.log(that.data.theKind)
    console.log(this.data.listId)
    if (this.data.addClassifyId ==0|| this.data.addClassifyId == 6 || this.data.addClassifyId==16){
      posTemp ={ p1: Temp}
    } else if (this.data.addClassifyId == 1 || this.data.addClassifyId == 7 || this.data.addClassifyId == 17){
      posTemp = { p2: Temp }
    } else if (this.data.addClassifyId == 2 || this.data.addClassifyId == 8) {
      posTemp = { p3: Temp }
    } else if (this.data.addClassifyId == 3 || this.data.addClassifyId == 9) {
      posTemp = { p4: Temp }
    } else if (this.data.addClassifyId == 4 || this.data.addClassifyId == 10) {
      posTemp = { p5: Temp }
    } else if (this.data.addClassifyId == 5 || this.data.addClassifyId == 11) {
      posTemp = { p6: Temp }
    } else if (this.data.addClassifyId == 12) {
      posTemp = { p7: Temp }
    } else if (this.data.addClassifyId == 13) {
      posTemp = { p8: Temp }
    } else if (this.data.addClassifyId == 14) {
      posTemp = { p9: Temp }
    } else if (this.data.addClassifyId == 15) {
      posTemp = { p10: Temp }
    } 
    posTemp = JSON.stringify(posTemp)
    console.log(posTemp)
 
    if (that.data.theKind == 'ckzp'){
      wx.request({
        url: test + 'task/survey/schedule',
        method: 'POST',
        data: {
          ckzp: posTemp,
          gydz: [],
          zfdz: [],
          title: '',
          content: '',
          case_id: that.data.listId,
          pick_path: '',
          give_path: '',
          type: that.data.caseType
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
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
            wx.showToast({
              title: '提交成功',
              duration: 500
            });
            wx.setStorageSync('refreshFlag', true)
            setTimeout(function () {
             
              wx.navigateBack({
                delta:1
              })
            
            }, 500)
            return
          } else {
            wx.showToast({
              title: '提交失败',
              duration: 500
            });
            return
          }

        },
        complete: function () {
          // complete
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
    } else if (that.data.theKind == 'gydz'){
      wx.request({
        url: test + 'task/survey/schedule',
        method: 'POST',
        data: {
          ckzp: [],
          gydz: posTemp,
          zfdz: [],
          title: '',
          content: '',
          case_id: that.data.listId,
          pick_path: '',
          give_path: '',
          type: that.data.caseType
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
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
          console.log(res)
          if (res.data.status == 1) {
            wx.showToast({
              title: '提交成功',
              duration: 500

            });
            wx.setStorageSync('refreshFlag', true)
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 500)
            return
          } else {
            wx.showToast({
              title: '提交失败',
              duration: 500
            });
            return
          }

        },
        complete: function () {
          // complete
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
    } else if (that.data.theKind == 'zfdz') {
      wx.request({
        url: test + 'task/survey/schedule',
        method: 'POST',
        data: {
          ckzp: [],
          gydz: [],
          zfdz: posTemp,
          title: '',
          content: '',
          case_id: that.data.listId,
          pick_path: '',
          give_path: '',
          type: that.data.caseType
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
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
            wx.showToast({
              title: '提交成功',
              duration: 500

            });
            wx.setStorageSync('refreshFlag', true)
            setTimeout(function () {
              wx.navigateBack({
                delta:1
              })
            }, 500)
            return
          } else {
            wx.showToast({
              title: '提交失败',
              duration: 500
            });
            return
          }

        },
        complete: function () {
          // complete
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageReady:false
    })
    this.data.caseType=options.caseType
    this.data.addClassifyId = options.addClassifyId;
    this.data.sessionId = wx.getStorageSync('PHPSESSID');
    this.data.locationAddress = wx.getStorageSync('location');
    this.data.serviceName = options.serviceName;
    this.data.listId = options.listId
    console.log('sss')
    this.seletPic()
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