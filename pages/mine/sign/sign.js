// pages/index/sign/sign.js
var test = getApp().globalData.hostName;
var QQMapWX = require('../../../qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: '4J3BZ-YS3CO-XKKWU-SV3H4-HPQF7-5XBUV' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_cell: 'back_cell',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '打卡',
    markers: [],
    theImage: '',

  },
  handler: function(e) {
    var that = this
    if (e.detail.authSetting["scope.userLocation"]) {
      console.log('位置拿到了')
      that.setData({
        locationModal: false
      })
      wx.showLoading({
        title: '获取中...',
      })
      that.onReady()
      setTimeout(function() {
        wx.hideLoading()
      }, 5000)
    }
  },
  signUp: function() {
    var that = this
    if (!this.data.theImage) {
      this.setData({
        redInfor: true
      })
      return;
    }

    if (wx.getStorageSync('clock') == 0) {//上班打卡
      this.data.signing = 0
      upload(that).then(location)

    } else {
      wx.showToast({
        title: '今日已签到',
      })
    }
    //  else if (wx.getStorageSync('clock') == 1) {//下班打卡
    //   this.data.signing = 1
    //   upload(that).then(location)
    // } 

  },
  backPage: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
   
    var iphoneReg = /iPhone X/
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
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
  onReady: function() {
    var that = this
    var myDate = new Date();
    this.setData({
      dataShow: myDate.getFullYear() + '年' + parseInt(myDate.getMonth()) + 1 + '月' + myDate.getDate() + '日'
    })
    var temp = myDate.getMinutes() + ''
    if (temp.length == 1) {
      console.log(123455)
      temp = '0' + temp
    }
    that.setData({
      timeNow: myDate.getHours() + ':' + temp
    })
    setInterval(function () {
      var myDate = new Date();
      var temp = myDate.getMinutes() + ''
      if (temp.length == 1) {
        console.log(123455)
        temp = '0' + temp
      }
      that.setData({
        timeNow: myDate.getHours() + ':' + temp
      })
    }, 1000)
    console.log(this.data.dataShow)
    that.setData({
      signStatus: wx.getStorageSync('clock')
    })
    if (wx.getStorageSync('clock') == 0) {
      this.setData({
        signText: that.data.timeNow+' 上班签到'
      })
    } else {
      this.setData({
        signText: '今日已签到'
      })
    // else if (wx.getStorageSync('clock') == 1) {
    //   this.setData({
    //     signText: that.data.timeNow +' 下班打卡'
    //   })
    // }
    
    }
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            that.data.locationText = res.result.address;
            var cityReg = /市/
            if (res.result.address.match(cityReg)) {
              console.log(res.result.address.match(cityReg))
              that.data.locationTextShow = res.result.address.slice(res.result.address.match(cityReg).index+1)
            }
            that.setData({
              locationTextShow: that.data.locationTextShow,
              locationText: res.result.address
            })
            that.data.markers.push({
              //iconPath: "../../img/headd.png",
              id: 0,
              latitude: that.data.latitude,
              longitude: that.data.longitude,
              label: {
                content: wx.getStorageSync('userName'),
                color: '#ffffff',
                borderWidth: 4,
                width: 200,
                anchorX: 10,
                anchorY: -20,
                x: 10,
                y: -20,
                bgColor: '#000000'
              }
            })
            that.setData({
              markers: that.data.markers
            })
          },
          fail: function(res) {
            console.log(res);
          },
          complete: function(res) {
            console.log(res);
          }
        });
      },
      fail: function(res) {
        console.log(res)
        if (res.errMsg == 'getLocation:fail auth deny') {
          console.log('您拒绝了')
          that.setData({
            locationModal: true
          })
        }
      },
    })
  },
  closeModalSign:function(){
    this.setData({
      signResult:false
    })
  },
  upload: function() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res.tempFilePaths[0])
        that.setData({
          theImage: res.tempFilePaths[0],
          redInfor:false
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    chechSign(this)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(this.data.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.data.timer)
    clearInterval(this.data.timer)
  },
  toLeave: function() {
    wx.navigateTo({
      url: './leave/leave',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

function location(that) {
  wx.request({
    url: test + 'task/base/clock',
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'PHPSESSID=' + wx.getStorageSync('PHPSESSID')
    }, // 默认值
    data: {
      task_id: wx.getStorageSync('userid'),
      location: that.data.locationText,
      type: that.data.signing,
      picture: that.data.file_name
    },
    success: function(res) {
      console.log(res)
      var dataType = typeof res.data
      console.log(dataType)
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
      if (res.data.status == 1) {
        wx.hideLoading()
        wx.showToast({
          title: '成功',
        })
        var temp = wx.getStorageSync('clock')
        if (temp == 0) {
          // that.setData({
          //   signText: that.data.timeNow+'下班打卡'
          // })
           that.setData({
            signText: '今日已签到'
          })
          that.data.timer = setInterval(function() {
            console.log('我正在记录位置')
            recordLocation(that)
          }, 300000)
          wx.setStorageSync('clock', 2)
          wx.request({
            url: test + 'task/index/report',
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cookie': 'PHPSESSID=' + wx.getStorageSync('PHPSESSID')
            }, // 默认值
            data: {
              id: wx.getStorageSync('userid'),
              nickname: wx.getStorageSync('nickname'),
              location: that.data.longitude + ',' + that.data.latitude,
            },
            success: function(res) {
              console.log(res)
              var dataType = typeof res.data
              console.log(dataType)
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
              if (res.data.status == 1) {
                that.setData({
                  signResult: true,
                  theImage: ''
                })
              }

            },
            complete: function() {
              // complete
              wx.hideNavigationBarLoading() //完成停止加载
              wx.stopPullDownRefresh() //停止下拉刷新
            }
          })
        } else if (temp == 1) {
          that.setData({
            signText: '今日已签到'
          })
          that.setData({
            signResult: true,
            theImage: ''
          })
          console.log('斤斤计较')
          wx.setStorageSync('clock', 2)
          clearInterval(that.data.timer)
          clearInterval(that.data.timer)
        }
      }

    },
    complete: function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  })
}
function chechSign(that) {
  wx.request({
    url: test + 'task/index/obtain',
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'PHPSESSID=' + wx.getStorageSync('PHPSESSID')
    }, // 默认值
    success: function(res) {
      console.log(res)
      var dataType = typeof res.data
      console.log(dataType)
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
      if (res.data.status == 1) {
        console.log(res.data.location)
        var tempArr = res.data.location;
        var tempId = wx.getStorageSync('userid')
        for (var i in tempArr) {
          if (tempArr[i].task_id == tempId) {
            recordLocation(that)
            that.data.timer = setInterval(function() {
              console.log('我正在记录位置')
              recordLocation(that)
            }, 300000)
            break
          } else {

          }
        }


      }

    },
    complete: function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  })
}

function recordLocation(that) {
  if (wx.getStorageSync('clock') == 2) {
    clearInterval(that.data.timer)
    return
  }
  wx.getLocation({
    type: 'wgs84',
    success: function(res) {
      console.log(res)
      that.setData({
        latitude: res.latitude,
        longitude: res.longitude
      })
      wx.request({
        url: test + 'task/index/report',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + wx.getStorageSync('PHPSESSID')
        }, // 默认值
        data: {
          id: wx.getStorageSync('userid'),
          nickname: wx.getStorageSync('nickname'),
          location: that.data.longitude + ',' + that.data.latitude,
        },
        success: function(res) {
          console.log(res)
          var dataType = typeof res.data
          console.log(dataType)
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
          if (res.data.status == 1) {


          }

        },
        complete: function() {
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
        success: function(res) {
          console.log(res.result.address);
          that.data.locationText = res.result.address;
        },
        fail: function(res) {
          console.log(res);
        },
        complete: function(res) {
          console.log(res);
        }
      });
    },
    fail: function(res) {
      console.log(res)
      if (res.errMsg == 'getLocation:fail auth deny') {
        console.log('您拒绝了')
        that.setData({
          locationModal: true
        })

      }
    },
  })

}

function upload(that) {

  return new Promise(function(resolve, reject) {
    wx.showLoading({
      title: '上传中...',
    })
    wx.uploadFile({
      url: test + 'task/base/clock_upload',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      },
      filePath: that.data.theImage,
      name: 'image',
      formData: {
        image: '图片'
      },
      success: res => {
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
          var jj = JSON.parse(jsonStr);
          console.log(jj)
          that.data.file_name = jj.file_name
        }
        console.log(res)
        resolve(that)
      }
    })
  })

}