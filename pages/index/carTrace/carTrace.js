var countDis;
var test = getApp().globalData.hostName;;


Page({
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    paddingTop: '114px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '添加行车轨迹',
    polylineArr:[],
    overTrace:false,
    startTrace: true,
    tracing: false,
    move: false,
    moveStartX: 0, //起始位置
    moveSendBtnLeft: 0, //发送按钮的left属性
    moveEndX: 0, //结束位置
    screenWidth: 0, //屏幕宽度
    moveable: true, //是否可滑动
    disabled: true,//验证码输入框是否可用,
    SendBtnColor: "#7f7f7f", //滑动按钮颜色
    hour: 0,
    typeCar:0,
    hourShow: false,
    start: true,
    finally: false,
    stop: false,
    distance: 0,
    polyline: [{
      points: [
      ],
      color: "#00FF00DD",
      width: 10,
      borderColor: '#000000',
      arrowLine: true,
      borderWidth: 2
    }],
    markers: [],

    controls: [{
      id: 1,
      iconPath: '../../img/know.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 20,
        height: 20
      },
      clickable: true
    }]
  },
  regionchange(e) {
  },
  markertap(e) {
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  typeCar1:function(e){
      this.setData({
        typeCar:0
      })
  },
  typeCar2:function(){
    this.setData({
      typeCar: 1
    })
  },

  controltap(e) {
  },
  polylineFun: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
       
        
        that.data.polylineArr.push(that.data.latitude + ',' + that.data.longitude)
       
        
        that.data.polyline[0].points.push({ latitude: that.data.latitude, longitude: that.data.longitude })
        console.log('所有点为' + that.data.polylineArr)

        var pointsArr = that.data.polyline[0].points
        var pointsArrTemp = 'polyline[' + 0 + '].points'
        that.setData({
          [pointsArrTemp]: pointsArr
        })
        for (var i in that.data.polyline[0].points){
          console.log('points里的经纬度列表' + i+':'+that.data.polyline[0].points[i].latitude + '+' + that.data.polyline[0].points[i].longitude)
        }
        console.log('获取到的经纬度：' + that.data.latitude + '+' + that.data.longitude)
       


        if (that.data.polyline[0].points.length == 1) {
          that.data.markers.push({
            id: 0,
            latitude: that.data.latitude,
            longitude: that.data.longitude,
            iconPath: '../../img/startPos.png',
            width: 30,
            height: 30,
          });
          var markerArr = that.data.markers
          var markerArrTemp = 'markers'
          that.setData({
            [markerArrTemp]: markerArr
          })
         }
       

        

        if (that.data.polyline[0].points.length > 1) {
          var len = that.data.polyline[0].points.length - 1;
          var senLen = that.data.polyline[0].points.length - 2;
          var secondPoits = that.data.polyline[0].points[senLen];
          var lastPoints = that.data.polyline[0].points[len]

          var lat1 = lastPoints.latitude;
          var lat2 = secondPoits.latitude;
          var lng1 = lastPoints.longitude;
          var lng2 = secondPoits.longitude;

          var dis = getGreatCircleDistance(lat1, lat2, lng1, lng2)
          var disPlus = (dis + that.data.distance) * 1

          var disPlusFix = disPlus.toFixed(3)
          disPlusFix = disPlusFix * 1
          that.setData({
            distance: disPlusFix
          })
        }
      }
    })
  },
  getLocationTime: function (e) {
    var that = this;
    that.setData({
      test: '99',
      startTrace: false,
      tracing: true,
      start: false,
      stop: true,
      move: false
    })
    that.polylineFun()
    countDis = setInterval(that.polylineFun, 10000)
    this.setData({
      time: 0
    })
    setInterval(function () {
      if (that.data.time == 60) {
        var hourTemp = that.data.hour
        hourTemp++
        that.setData({
          time: 0,
          hour: hourTemp,
          hourShow: true
        })
      }
      var timeTemp = that.data.time;
      timeTemp++
      that.setData({
        time: timeTemp
      })


    }, 60000)
  },

  stop: function (e) {

    var that = this;
    var left = ((e.changedTouches[0].clientX - that.data.moveStartX) / (that.data.screenWidth / 750))
    if (left < 275.5) {
      for (let i = left; i >= 0; i--) {

        that.setData({
          moveSendBtnLeft: i
        })
      }
    } else {
      that.setData({
        moveEndX: e.changedTouches[0].clientX,
        moveable: false,
        disabled: false,
        SendBtnColor: "#289adc",
        move: true
      })
    }
    if (that.data.move == false) {
      return
    }
    this.setData({
      finally: true,
      stop: false,
    })
    clearInterval(countDis);
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        that.data.polyline[0].points.push({ latitude: that.data.latitude, longitude: that.data.longitude })
        var pointsArr = that.data.polyline[0].points
        var pointsArrTemp = 'polyline[' + 0 + '].points'
        that.setData({
          [pointsArrTemp]: pointsArr
        })
        

        that.data.markers.push({
          id: 1,
          latitude: that.data.latitude,
          longitude: that.data.longitude,
          iconPath: '../../img/endPos.png',
          width: 30,
          height: 30,
        });
        var markerArr = that.data.markers
        var markerArrTemp = 'markers'
        that.setData({
          [markerArrTemp]: markerArr
        })
      }
    })
    console.log(that.data.polylineArr)
    var pointTemp = JSON.stringify(that.data.polylineArr)
    console.log(pointTemp)
    wx.showNavigationBarLoading() //在标题栏中显示加载


    wx.onUserCaptureScreen(function (res) {
      console.log('用户截屏了')
    })
    var typeTemp = 1
    var typeCarTemp;
    var moduName;
    if (that.data.typeCar == 0){
      typeCarTemp='接车'
    }else{
      typeCarTemp = '送车'
    }
    if (that.data.modulsis == 1) {
      moduName ='claims'
    } else if (that.data.modulsis == 2){
      moduName = 'maintain'
    } else if (that.data.modulsis == 3) {
      moduName = 'yearbook'
    } else if (that.data.modulsis == 4) {
      moduName = 'trailer'
      typeTemp = 3
    } else if (that.data.modulsis == 5) {
      moduName = 'rescue'
      typeTemp = 4
    } else if (that.data.modulsis == 6) {
      moduName = 'accident'
    } else if (that.data.modulsis == 7) {
      moduName = 'used'
    } else if (that.data.modulsis == 8) {
      moduName = 'sale'
    } else if (that.data.modulsis == 10) {
      moduName = 'risk'
    }
    wx.request({
      url: test + 'task/' + moduName+'/schedule',
      method: 'POST',
      data: {
        title: typeCarTemp,
        picture: [],
        case_id: that.data.listId,
        maintain_id:that.data.listId,
        yearbook_id: that.data.listId,
        trailer_id: that.data.listId,
        rescue_id: that.data.listId,
        accident_id: that.data.listId,
        sale_id: that.data.listId,
        used_id: that.data.listId,
        risk_id: that.data.listId,
        pick_path: pointTemp,
        type: typeTemp
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + this.data.sessionId
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
    wx.showToast({
      title: '添加成功',
      duration:500
    })
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
   

    if(that.data.stop==false){
      
      setTimeout(function () {
        that.setData({
          tracing:false,
          overTrace: true
        })
      }, 500)
    }
   
    
  },
  backPage:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  //  开始移动
  moveSendBtnStart: function (e) {
    if (!this.data.moveable) {
      return;
    }

    this.setData({
      moveStartX: e.changedTouches["0"].clientX
    })
  },
  //移动发送按钮
  moveSendBtn: function (e) {
    if (!this.data.moveable) {
      return;
    }
    var that = this;
    // console.log(e.touches[0]);
    var left = ((e.touches[0].clientX - that.data.moveStartX) / (that.data.screenWidth / 750))
    if (left <= 275.5) {
      this.setData({
        moveSendBtnLeft: left
      })
    } else {

      this.setData({
        moveSendBtnLeft: 275.5
      })
    }
  },
  // 结束移动
  onReady() {
    
    var that = this;
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
    var tt = 0;
    setInterval(function () {
      tt++;
      that.setData({
      test:tt
      })
    }, 1000)
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
    })
    
  },
  onPullDownRefresh: function () {
    
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  onLoad: function (options) {
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
    var that = this;
    wx.setStorageSync('freshFlag', true)
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.setData({
      modulsis: options.modulsis,
      listId: options.list
    })
  
    

    
    // 获取屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.screenWidth
        })
      },
    })
  },
})
var EARTH_RADIUS = 6371.004;    //单位KM  
var PI = Math.PI;
function getRad(d) {
  return d * PI / 180.0;
}


function getGreatCircleDistance(lat1, lat2, lng1, lng2) {

  var radLat1 = getRad(lat1);
  var radLat2 = getRad(lat2);
  var a = radLat1 - radLat2;
  var b = getRad(lng1) - getRad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;

  s = Math.round(s * 10000) / 10000;
  return s
}


