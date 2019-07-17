var imgId = 0;
var test = getApp().globalData.hostName;
var zfdz;
var imgLength = 0;
var loadLength = 0;
Page({
  data: {
    subOver: true,
    subOver1: true,
    firstLoad: 1000,
    systemWidth: '',
    systemHeight: '',
    camStatus: 'normal',
    src: '',
    animation: '',
    flashSecond: false,
    ifClose: false,
    choosedText: '收款方账户信息',
    peoAddCarPath: [],
    frameNumPath: [],
    enviorPath: [],
    checkPthotoPath: [],
    carBrokePath: [],
    oldInjuryPath: [],
    peoAddCarArr: [],
    frameNumArr: [],
    enviorArr: [],
    checkPthotoArr: [],
    carBrokeArr: [],
    oldInjury: [],
    idArc: '',
    photosBlock: [true, false, false, false, false],
    btnGree: ['blueColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor', 'greeColor'],
    arr: [1, 2, 3, 4, 5],
    imageArr: [],
    cameraBack: 'back',
    flash: {
      auto: true,
      off: false,
      on: false
    },
    falshContrl: false,
    cameraFlasf: 'auto',
    listArr: ['人车合一', '车架号', '环境照片', '验车照片', '车损照片', '旧伤照片', '事故证明', '索赔申请书', '行驶证', '驾驶证', '查勘报告', '个案签报', '拒赔材料', '从业资格证', '法院判决书', '调查单证', '收款方账户信息', '收款方身份证明'],
  },
  peAddCar: function (e) {
    this.setData({
      choosedText: '收款方账户信息'
    })
    this.commonfun(e.currentTarget.id)
  },
  frameNum: function (e) {
    this.setData({
      choosedText: '收款方身份证明'
    })
    this.commonfun(e.currentTarget.id)
  },

  commonfun: function (idArc) {
    this.setData({

      which: idArc,
      selectCell: false,
      couldTake: false,
    })

    console.log(this.data.which)
    for (var i in this.data.btnGree) {
      if (i == idArc) {
        var temp = 'btnGree[' + idArc + ']'
        var blockPhoto = 'photosBlock[' + idArc + ']'
        console.log(temp)
        this.setData({
          [temp]: 'blueColor',
          [blockPhoto]: true
        })
        console.log()
      } else {
        var temp = 'btnGree[' + i + ']';
        var blockPhoto = 'photosBlock[' + i + ']'
        console.log(temp)
        this.setData({
          [temp]: 'greeColor',
          [blockPhoto]: false
        })
      }
    }
    console.log(this.data.photosBlock)

  },

  shiftCamera: function () {
    var cameraTemp = this.data.cameraBack;
    if (cameraTemp == 'front') {
      this.setData({
        cameraBack: 'back'
      })

    } else {
      this.setData({
        cameraBack: 'front'
      })
    }

  },
  switchFlash: function (e) {
    console.log(e);
    if (!this.data.flashSecond) {
      this.setData({
        subOver1:false,
        falshContrl: true,
        flashSecond: true
      })
    } else {
      this.setData({
        subOver1:true,
        falshContrl: false,
        flashSecond: false
      })
    }


  },
  flashOr: function (e) {
    var that = this
    this.setData({
      subOver1:true,
      falshContrl: false,
      cameraling: false
    })
    var flashId = e.currentTarget.id;
    for (var i in this.data.flash) {

      if (i == flashId) {
        console.log(i)
        var setFalsh = 'flash.' + i
        that.setData({
          [setFalsh]: true,
          cameraFlasf: i
        })
        console.log(this.data.cameraFlasf)

      } else {
        var setFalsh = 'flash.' + i
        that.setData({
          [setFalsh]: false
        })
      }
    }
  },
  rotate: function () {
    console.log(222)
    this.animation.rotate(90).step()
    this.setData({ animation: this.animation.export() })
  },
  onReady: function () {

    var that = this;
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    console.log(this.data.sessionId)
    this.data.locationAddress = wx.getStorageSync('location');
    if (this.data.locationAddress == '') {
      console.log('空的')
      this.data.locationAddress = ''
    } else {
      console.log('不是空的')

    }
    console.log('sa' + this.data.locationAddress)
    console.log(this.data.locationAddress)





    let lastState = 0;
    let lastTime = Date.now();

    wx.startAccelerometer();

    wx.onAccelerometerChange((res) => {
      const now = Date.now();

      // 500ms检测一次
      if (now - lastTime < 500) {
        return;
      }
      lastTime = now;

      let nowState;

      // 57.3 = 180 / Math.PI
      const Roll = Math.atan2(-res.x, Math.sqrt(res.y * res.y + res.z * res.z)) * 57.3;
      const Pitch = Math.atan2(res.y, res.z) * 57.3;

      //console.log('Roll: ' + Roll, 'Pitch: ' + Pitch)

      // 左横屏状态
      if (Roll > 50) {
        if ((Pitch > -180 && Pitch < -60) || (Pitch > 130)) {
          nowState = 1;
        } else {
          nowState = lastState;
        }

      } else if (Roll < -50) {
        if ((Pitch > -180 && Pitch < -60) || (Pitch > 130)) {
          nowState = 2;
        } else {
          nowState = lastState;
        }
      }
      else if ((Roll > 0 && Roll < 30) || (Roll < 0 && Roll > -30)) {
        let absPitch = Math.abs(Pitch);

        // 如果手机平躺，保持原状态不变，40容错率
        if ((absPitch > 140 || absPitch < 40)) {
          nowState = lastState;
        } else if (Pitch < 0) { /*收集竖向正立的情况*/
          nowState = 0;
        } else {
          nowState = lastState;
        }
      }
      else {
        nowState = lastState;
      }

      // 状态变化时，触发
      if (nowState !== lastState) {
        lastState = nowState;
        if (nowState === 1) {
          console.log('change:左横屏');
          that.setData({
            camStatus: 'left'
          })

        } else if (nowState === 2) {
          console.log('change:右横屏');
          that.setData({
            camStatus: 'right'
          })
        } else {
          console.log('竖直');
          that.setData({
            camStatus: 'normal'
          })
        }
      }
    });



  },
  takePhoto() {
    var that = this

    wx.showToast({
      title: '正在上传...',
      icon: 'loading',
      duration: 1000000
    })
    that.setData({
      subOver: false,
      ifPro: true,
      progressPer: 0,
      waiting: true
    })
    console.log(that.data.which)
    var arcArr = [that, that.data.which]

    var promiseTemp = new Promise(function (resolve, reject) {
      console.log('start new Promise...');
      resolve(arcArr);
    });
    promiseTemp.then(toTakePhoto).then(canvasToPic).then(loadImg).then(function () {
      wx.hideLoading();
      if (imgLength == loadLength) {
        that.setData({
          subOver: true,
        })
      }
    
    })








  },
  onLoad: function (options) {
    var that = this
    console.log(options.classifyId)
    that.data.caseType = options.caseType
    this.setData({
      hostName: test,
      which: options.classifyId,
      choosedText: this.data.listArr[options.classifyId]
    })
    this.commonfun(options.classifyId)
    console.log(this.data.which)
    this.animation = wx.createAnimation()
   that.data.caseType=options.caseType
    var userName = wx.getStorageSync('userName');
    var bean = options.listId;
    var service = options.serviceName
    console.log(service)
    this.setData({
      listId: bean,
      serviceName: service,
      userName: userName
    })
    var systemHeight = wx.getSystemInfoSync().windowHeight
    var systemWidth = wx.getSystemInfoSync().windowWidth
    that.data.scaleRata = systemWidth / systemHeight
    that.setData({
      cameral: 'width:100%;height:' + (systemHeight) + 'px',
      systemHeightNum: systemHeight,
      systemWidthNum: systemWidth,
      systemHeight: systemHeight + 'px',
      systemWidth: systemWidth + 'px'
    })

  },

  openImg: function () {
    console.log(22)
  },
  tosubmit: function () {
    var that = this
    that.setData({
      submitOver: true
    })
    wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log(this.data.peoAddCarPath)
    zfdz = {
      p1: that.data.peoAddCarPath, p2: that.data.frameNumPath,
      p3: that.data.enviorPath, p4: that.data.checkPthotoPath, p5: that.data.carBrokePath, p6: that.data.oldInjuryPath
    }
    console.log(zfdz)
    var zfdzTemp = JSON.stringify(zfdz)

    console.log(zfdzTemp)
    wx.request({
      url: test + 'task/survey/schedule',
      method: 'POST',
      data: {
        ckzp: [],
        gydz: [],
        zfdz: zfdzTemp,
        title: '',
        content: '',
        case_id: that.data.listId,
        pick_path: '',
        give_path: '',
        type: 1
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

  },
  onPullDownRefresh: function () {
    this.onShow()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  openModal: function () {
    this.setData({
      falshContrl: false
    })
    if (this.data.ifClose == false) {
      this.setData({
        couldTake: true,
        selectCell: true,
        ifClose: true
      })
    } else {
      this.setData({
        couldTake: false,
        selectCell: false,
        ifClose: false
      })
    }
  },
  error(e) {
    console.log(e);
  }
})
function toTakePhoto(arcArr) {
  return new Promise((resolve, reject) => {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        arcArr[0].setData({
          src: res.tempImagePath
        })
        arcArr[0].setData({
          waiting: false
        })
        wx.hideLoading()
        imgLength++;

        var secondArc = [arcArr[0], arcArr[1], res.tempImagePath]//that,which,初次图片路径
        resolve(secondArc)
        console.log(arcArr[0].data.src)
      }
    })
  })

}

function canvasToPic(secondArc) {
  return new Promise((resolve, reject) => {
    console.log('开始测试')
    console.log(secondArc[0].data.src)
    var printWidth;
    var printHidth;
    var outImageHight;
    var canvasHeight;
    var canvasWidth;
    var dataNow = new Date();
    var year = dataNow.getFullYear();
    var month = dataNow.getMonth() + 1;
    var today = dataNow.getDate();
    var hour = dataNow.getHours() < 10 ? "0" + dataNow.getHours() : dataNow.getHours();
    var minute = dataNow.getMinutes() < 10 ? "0" + dataNow.getMinutes() : dataNow.getMinutes();
    var second = dataNow.getSeconds() < 10 ? "0" + dataNow.getSeconds() : dataNow.getSeconds();
    var timeFont = year + '年' + month + '月' + today + '日' + ' ' + hour + '时' + minute + '分' + second + '秒'
    const mcan = wx.createCanvasContext('myCanvas')
    mcan.save()
    mcan.translate(0, 0)
    if (secondArc[0].data.camStatus == 'normal') {
      mcan.rotate(0 * Math.PI / 180)
      printWidth = secondArc[0].data.systemWidthNum;
      printHidth = secondArc[0].data.systemHeightNum;
      canvasHeight = secondArc[0].data.systemHeightNum
      outImageHight = secondArc[0].data.systemHeightNum
      console.log('shuzhe')
    } else if (secondArc[0].data.camStatus == 'left') {
      printWidth = secondArc[0].data.systemWidthNum;
      printHidth = secondArc[0].data.systemHeightNum;
      outImageHight = secondArc[0].data.systemHeightNum * secondArc[0].data.scaleRata;
      canvasHeight = printWidth * secondArc[0].data.scaleRata;
      mcan.translate(printWidth, 0)
      mcan.scale(secondArc[0].data.scaleRata, secondArc[0].data.scaleRata)
      mcan.rotate(90 * Math.PI / 180)
      mcan.translate(printWidth / 2, printHidth / 2)
      mcan.rotate(180 * Math.PI / 180)
      console.log('zuoheng')
      mcan.translate(-printWidth / 2, -printHidth / 2)
    } else if (secondArc[0].data.camStatus == 'right') {
      mcan.translate(secondArc[0].data.systemWidthNum, 0)
      mcan.scale(1, secondArc[0].data.scaleRata)
      printWidth = secondArc[0].data.systemWidthNum;
      printHidth = secondArc[0].data.systemWidthNum;
      canvasWidth = printWidth;
      canvasHeight = printWidth * secondArc[0].data.scaleRata;
      mcan.rotate(90 * Math.PI / 180)
      console.log('youheng')
    }
    (function () {
      mcan.clearRect(0, 0, secondArc[0].data.systemWidthNum, secondArc[0].data.systemHeightNum)
      function clear() {
        mcan.drawImage(secondArc[0].data.src, 0, 0, printWidth, printHidth)
        //mcan.drawImage(res.tempImagePath, 0, 0, 150, 100)       
        mcan.restore()
        mcan.font = "11px 宋体";
        mcan.strokeStyle = '#fff';
        mcan.fillStyle = "rgba(252,255,255,1)";
        mcan.fillText(timeFont, 0, 8);
        mcan.fillText(secondArc[0].data.locationAddress, 0, 18);
        mcan.fillText(secondArc[0].data.serviceName, 0, 30); //选择位置 
        mcan.fillText(secondArc[0].data.userName, 80, 30); //选择位置  
        mcan.draw()
        function render() {
          setTimeout(function () {
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: canvasWidth,
              height: canvasHeight,
              fileType: 'jpg',
              canvasId: 'myCanvas',
              success: function (res) {
                console.log(res.tempFilePath)
                var tempFile = res.tempFilePath
                var imageObj = { path: tempFile, imgId: imgId++ }
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success(res) {
                    console.log(res)
                    
                  }
                })
                var thirdArc = [secondArc[0], secondArc[1], tempFile, mcan]//that,which,二次图片路径
                resolve(thirdArc)

              },
              fail: function (res) {
                console.log('失败了')
                console.log(res)
              }
            })
          }, secondArc[0].data.firstLoad)

        }

        render();
      }
      clear();

    })();

  })

}
function loadImg(thirdArc) {
  return new Promise(function (resolve, reject) {
    thirdArc[3].clearRect(0, 0, thirdArc[0].data.systemWidthNum, thirdArc[0].data.systemHeightNum)

    const uploadTask = wx.uploadFile({
      url: test + 'task/base/uploads',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + thirdArc[0].data.sessionId
      },
      filePath: thirdArc[2],
      name: 'image',
      formData: {
        address: '',
        name: '',
        task_name: ''
      },
      success: function (res) {
        console.log(res)
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
          var jj = JSON.parse(jsonStr);
          res.data = jj;
          loadLength++;
          console.log(2)

        }
        if (res.data.status == 1) {
          console.log(res.data.file_name)
          if (thirdArc[1] == 16) {
            thirdArc[0].data.peoAddCarPath.push(res.data.file_name)
            thirdArc[0].data.peoAddCarArr.push({ path: res.data.file_name, imgId: imgId++, tag: res.data.file_name })
          } else if (thirdArc[1] == 17) {
            thirdArc[0].data.frameNumPath.push(res.data.file_name)
            thirdArc[0].data.frameNumArr.push({ path: res.data.file_name, imgId: imgId++, tag: res.data.file_name })
          }
          resolve('ok')

        } else {

        }
      }
    })

  })



}