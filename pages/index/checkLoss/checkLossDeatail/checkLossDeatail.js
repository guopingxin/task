// pages/index/claimsDetail/claimsDetail.js
var common = require('../../../../pages/common.js');
var test = getApp().globalData.hostName;
var imgId = 0;
var QQMapWX = require('../../../../qqmap-wx-jssdk');
var lastImg = false;
var dateNow = "2018-05-17";
// 实例化API核心类
var demo = new QQMapWX({
  key: 'OEIBZ-MF2HD-B6U4J-HRVAP-AASNO-CMBEQ' // 必填
});
var lat;
var long;
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
    titleTop: '查勘定损详情',
    feedback: 1,
    feedback_con: '',
    failArr: [
      { id: 1, content: '客户暂不修车', class: 'each_cell', active: false },
      { id: 2, content: '维修时间太长', class: 'each_cell each_cell_right', active: false },
      { id: 3, content: '客户自选其他修理厂', class: 'each_cell', active: false },
      { id: 4, content: '事故垫付金额高', class: 'each_cell each_cell_right', active: false },
      { id: 5, content: '配件无现货', class: 'each_cell', active: false }
    ],
    details: {},
    hasPush: false,
    imagePos: [],
    allDetail: [{
        id: 0,
        kind: 'ckzp',
        pos: 'p1'
      },
      {
        id: 1,
        kind: 'ckzp',
        pos: 'p2'
      },
      {
        id: 2,
        kind: 'ckzp',
        pos: 'p3'
      },
      {
        id: 3,
        kind: 'ckzp',
        pos: 'p4'
      },
      {
        id: 4,
        kind: 'ckzp',
        pos: 'p5'
      },
      {
        id: 5,
        kind: 'ckzp',
        pos: 'p6'
      },
      {
        id: 6,
        kind: 'gydz',
        pos: 'p1'
      },
      {
        id: 7,
        kind: 'gydz',
        pos: 'p2'
      },
      {
        id: 8,
        kind: 'gydz',
        pos: 'p3'
      },
      {
        id: 9,
        kind: 'gydz',
        pos: 'p4'
      },
      {
        id: 10,
        kind: 'gydz',
        pos: 'p5'
      },
      {
        id: 11,
        kind: 'gydz',
        pos: 'p6'
      },
      {
        id: 12,
        kind: 'gydz',
        pos: 'p7'
      },
      {
        id: 13,
        kind: 'gydz',
        pos: 'p8'
      },
      {
        id: 14,
        kind: 'gydz',
        pos: 'p9'
      },
      {
        id: 15,
        kind: 'gydz',
        pos: 'p10'
      },
      {
        id: 16,
        kind: 'zfdz',
        pos: 'p1'
      },
      {
        id: 17,
        kind: 'zfdz',
        pos: 'p2'
      },
    ],
    theKind: '',
    allmg: [],
    result: [],
    isScroll: true,
    locationAddress: '',
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
    listId: '',
    ss: '',
    reason: false,
    steps: [

    ],
    steps1: [

    ],
    moduleArr: [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    tipText: '人车合一',
    allImg: [],
    oprationModal: false,
    modal: false  
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
    } else {
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
        id: that.data.pushDetail.id,
        result: that.data.feedback,
        content: content
      },
      success: function (res) {
        addProgress(that, content)
        
      }
    })
  },
  reasonOpen: function() {
    var j = 0
    var check = 'modal[' + j + ']';
    this.setData({
      [check]: false,
      reason: true
    })

  },
  submitFormId: function(e) {
    console.log(e.detail.formId)
    common.getFormId(e.detail.formId)
  },
  todeletePro: function(e) {
    this.setData({
      deleteModal: true,
      proId: e.currentTarget.dataset
        .num
    })
  },

  cancelC: function() {
    this.setData({
      deleteModal: false
    })
  },
  link: function(e) {
    var phonenumber = e.currentTarget.dataset.num;
    wx.makePhoneCall({
      phoneNumber: phonenumber //仅为示例，并非真实的电话号码
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  tofix: function() {
    wx.navigateTo({
      url: '../fix/fix?listId=' + this.data.listId + '&&module=9&&report_no=' + this.data.detail.report_no,
    })
  },

  onShow() {

    this.data.refreshFlag = wx.getStorageSync('refreshFlag')
    if (this.data.refreshFlag) {
      this.onReady()
     
    } else {

    }
    var freshFlag = wx.getStorageSync('freshFlag')
    if (freshFlag) {
      this.onReady()
    }
    wx.removeStorageSync('refreshFlag')
    wx.removeStorageSync('freshFlag')
  },
  finishPush:function(){
    var that=this
    wx.showLoading({
      title: '处理中...',
    })
    wx.request({
      url: test + 'task/push/finish',
      method: 'GET',
      data: {
        id: that.data.pushDetail.id
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
          that.onReady()
        }

      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })

  },
  getCodeImg: function() {
    var that = this
    var tempCode = 'detail.code';
    var tempImg = 'detail.codeOk'
    var tempHeight = 'detail.codeHeight'

    this.setData({
      [tempCode]: true,
      [tempHeight]: '0px'
    })
    setTimeout(function() {
      that.setData({
        [tempHeight]: '80%',
        [tempImg]: true
      })
    }, 2000)
  },
  closeCodeImg: function() {
    var tempImg = 'detail.codeOk'
    var tempCode = 'detail.code'
    this.setData({
      [tempImg]: false,
      [tempCode]: false
    })
  },
  onLoad: function(options) {

    console.log("options" + JSON.stringify(options));

    var that = this
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
    that.getLocation()
    var systemHeight = wx.getSystemInfoSync().windowHeight
    that.setData({
      hostName: test,
      scrollHeight: (systemHeight - 30) + 'px',
      navHeight: (systemHeight - 80) + 'px'
    })
    this.data.userName = wx.getStorageSync('userName');
    this.data.opratorRank = wx.getStorageSync('rank');
    that.setData({
      opratorRank: that.data.opratorRank
    })
    that.data.caseType = options.type

    if (options.listId) {
      var bean = options.listId;
      this.setData({
        listId: bean
      })
      var tempListId = 'details.listId';
      var tempServiceId = 'details.serviceId';
      var tempModule = 'details.moduNum'
      this.setData({
        [tempServiceId]: wx.getStorageSync('serviceId'),
        [tempModule]: 9,
        [tempListId]: bean
      })
      wx.setStorageSync('specialId', options.listId)
    } else {
      var bean = wx.getStorageSync('specialId')
      this.setData({
        listId: bean
      })
    }

    var listData = []
    listData.push({
      name: '人车合一',
      class: 'listActive',
      dataName: 'ckzp1'
    })
    listData.push({
      name: '车架号',
      class: 'imgListName',
      dataName: 'ckzp2'
    })
    listData.push({
      name: '环境照片',
      class: 'imgListName',
      dataName: 'ckzp3'
    })
    listData.push({
      name: '验车照片',
      class: 'imgListName',
      dataName: 'ckzp4'
    })
    listData.push({
      name: '车损照片',
      class: 'imgListName',
      dataName: 'ckzp5'
    })
    listData.push({
      name: '旧伤照片',
      class: 'imgListName',
      dataName: 'ckzp6'
    })
    listData.push({
      name: '事故证明',
      class: 'imgListName',
      dataName: 'gydz1'
    })
    listData.push({
      name: '索赔申请书',
      class: 'imgListName',
      dataName: 'gydz2'
    })
    listData.push({
      name: '行驶证',
      class: 'imgListName',
      dataName: 'gydz3'
    })
    listData.push({
      name: '驾驶证',
      class: 'imgListName',
      dataName: 'gydz4'
    })
    listData.push({
      name: '查勘报告',
      class: 'imgListName',
      dataName: 'gydz5'
    })
    listData.push({
      name: '个案签报',
      class: 'imgListName',
      dataName: 'gydz6'
    })
    listData.push({
      name: '拒赔材料',
      class: 'imgListName',
      dataName: 'gydz7'
    })
    listData.push({
      name: '从业资格证',
      class: 'imgListName',
      dataName: 'gydz8'
    })
    listData.push({
      name: '法院判决书',
      class: 'imgListName',
      dataName: 'gydz9'
    })
    listData.push({
      name: '调查单证',
      class: 'imgListName',
      dataName: 'gydz10'
    })

    listData.push({
      name: '收款方账户信息',
      class: 'imgListName',
      dataName: 'zfdz1'
    })
    listData.push({
      name: '收款方身份证明',
      class: 'imgListName',
      dataName: 'zfdz2'
    })
    that.setData({
      listArr: listData
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  /**
   * 生命周期函数--监听页面显示
   */
  onReady: function() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.showNavigationBarLoading()
    var that = this;
    imgId = 0;
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
      detail: '',
    })



    this.data.sessionId = wx.getStorageSync('PHPSESSID');
    this.setData({
      userId: wx.getStorageSync('userid')
    })
    var tempUserId = 'details.userId'
    that.setData({
      [tempUserId]: that.data.userId
    })
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;

    wx.request({
      url: test + 'task/survey/info',
      method: 'GET',
      data: {
        id: that.data.listId,
        type: that.data.caseType
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
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
        var moduArr = wx.getStorageSync('module')


        console.log("^^^^^" + JSON.stringify(moduArr));

        for (var i in moduArr) {
          if (moduArr[i] == 2) {
            that.setData({
              hasPush: true
            })
          }
        } 
        if ((that.data.hasPush && res.data.survey.type == 0) || (that.data.hasPush && res.data.survey.type == 1 && (res.data.push ? res.data.push.result == 0:false))) {
          that.setData({
            viewWidth: '60%',
            widthView: '48%',
            btnView: '29%',
            spacing: '3%'
          })
        } else {
          that.setData({
            viewWidth: '40%',
            widthView: '100%',
            btnView: '40%',
            spacing: '20px'
          })
        }
        that.data.businessType = res.data.survey.type
        console.log(that.data.businessType)
        // that.setData({
        //   third: res.data.sanze
        // })
        if (res.data.survey.task_id == that.data.userId) {
          that.setData({
            myClaims: true
          })
        } else {
          console.log('他的')
          that.setData({
            myClaims: false
          })
        }
        console.log("$$$$$$"+JSON.stringify(res.data.survey))


        if (res.data.survey.survey_address){

          // var address=res.data.survey.survey_address.split("-");
          var add = res.data.survey.survey_address

          var address = add.lastIndexOf("\-"); 
          
          add = add.substring(0,address);

          console.log("地址："+add);

          for (var x in res.data.survey){
            if (x == "survey_address"){
              res.data.survey[x] = add;
              }
          }        
        }

        // if (res.data.survey.send_time){
        //   var send_time = res.data.survey.send_time.split("-");
        //   res.data.survey.send_time = send_time[0] +"-" +send_time[1]+"-"+send_time[2]+" "+send_time[3]+":"+send_time[4];
        //   }

        that.data.userName = wx.getStorageSync('userName'),
        that.data.usernumber = wx.getStorageSync('job_no'),

        that.setData({
          schedule: res.data.schedule,
          detail: res.data.survey,
          detailId: res.data.survey.id,
          userName: that.data.userName,
          usernumber: that.data.usernumber
        })
        if (res.data.push) {
          that.data.detail.is_push = 1
          that.setData({
            detail: that.data.detail
          })
          if (res.data.survey.type == 1) {
            that.setData({
              pushDetail: res.data.push,
            })
            getPushServer(that)
          }
        }
        
       
        if (that.data.detail.status == 6) {
          that.setData({
            endCase: true
          })
        }
        if (that.data.detail.task_id) {



          wx.request({
            url: test + 'task/index/taskInfo',
            method: 'GET',
            data: {
              id: that.data.detail.task_id
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cookie': 'PHPSESSID=' + that.data.sessionId
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
              that.setData({
                oprator: res.data.task
              })

            }
          })
        }
        wx.request({
          url: test + 'task/index/systemInsurance',
          method: 'GET',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=' + that.data.sessionId
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
            for (var i in res.data.insurance) {
              if (that.data.detail.insurance_id == res.data.insurance[i].id) {
                that.setData({
                  insuranceCom: res.data.insurance[i]
                })
              }
            }

          }

        })

        if (that.data.detail.service_id) {
          wx.request({
            url: test + 'task/index/service_info',
            method: 'GET',
            data: {
              id: that.data.detail.service_id
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cookie': 'PHPSESSID=' + that.data.sessionId
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
              that.setData({
                serviceInfor: res.data.service
              })
            }
          })
        } else {}
        var aa = [];
        var allotTime;
        var receiveTime;
        var reachTime;
        var caseEndTime;
        if (that.data.schedule.length != 0) {
          for (var i in that.data.schedule) {
            var tempReg = /已分配作业员/
            if (tempReg.test(that.data.schedule[i].title)) {
              var year = that.data.schedule[i].date;
              var regTime = year.replace(/\-/g, "/");
              allotTime = new Date(regTime);
              var month = year.slice(5, 10);
              var time = year.slice(11)
              var allotAgain
              var _has;
              if (allotAgain == true) {
                _has = 'has'
              } else {
                _has = 'nohas'
              }
              aa.unshift({
                timeDiffer: '',
                first: _has,
                color: 'grey',
                current: true,
                month: month,
                time: time,
                done: true,
                pic: [],
                text: that.data.schedule[i].title,
                desc: ''
              })
              that.setData({
                steps1: aa
              })
              allotAgain = true
            }

            if (that.data.schedule[i].title == '已接单') {
              var year = that.data.schedule[i].date;
              var regTime = year.replace(/\-/g, "/");
              receiveTime = new Date(regTime);
              var timedec = (receiveTime - allotTime) / 1000
              var tt = formatSeconds(timedec)

              var month = year.slice(5, 10);
              var time = year.slice(11)
              aa.unshift({
                timeDiffer: tt,
                first: 'has',
                color: 'grey',
                current: true,
                month: month,
                time: time,
                done: true,
                pic: [],
                text: that.data.schedule[i].content + '接单成功',
                desc: ''
              })
              that.setData({
                steps1: aa
              })
            }

            if (that.data.schedule[i].title == '到达现场') {
              that.setData({
                hasReach: true,
                allEnd: true
              })
              var year = that.data.schedule[i].date;
              var regTime = year.replace(/\-/g, "/");
              reachTime = new Date(regTime);
              var timedec = (reachTime - receiveTime) / 1000

              var tt = formatSeconds(timedec)

              var month = year.slice(5, 10);
              var time = year.slice(11)
              aa.unshift({
                timeDiffer: tt,
                first: 'has',
                color: 'grey',
                current: true,
                month: month,
                time: time,
                done: true,
                pic: [],
                text: that.data.schedule[i].content + '到达现场',
                desc: ''
              })
              that.setData({
                steps1: aa
              })
            }

            if (that.data.schedule[i].title == '结案') {
              that.setData({
                allEnd: false,
                endPhoto: true
              })

              var year = that.data.schedule[i].date;
              var regTime = year.replace(/\-/g, "/");
              caseEndTime = new Date(regTime);
              var timedec = (caseEndTime - allotTime) / 1000
              var tt = formatSeconds(timedec)

              var month = year.slice(5, 10);
              var time = year.slice(11)
              aa.unshift({
                timeDiffer: tt,
                first: 'has',
                color: 'blue',
                current: true,
                month: month,
                time: time,
                done: true,
                pic: [],
                text: '案件已结案',
                desc: ''
              })
              that.setData({
                steps1: aa,
              })
            }
            var picTemp1;
            var picTemp2;
            var allTemp;
            var picTemp1Data;
            var resultData;
            if (that.data.schedule[i].picture) {
              if (that.data.schedule[i].picture.ckzp) {
                for (var j in that.data.schedule[i].picture.ckzp.p1) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.ckzp.p1[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.ckzp.p1[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.ckzp.p1[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  console.log(allTemp)
                  that.data.ckzpp1.push({
                    path: allTemp,
                    imgId: imgId
                  })

                  that.setData({
                    ckzpp1: that.data.ckzpp1
                  })

                }

                for (var j in that.data.schedule[i].picture.ckzp.p2) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.ckzp.p2[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.ckzp.p2[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.ckzp.p2[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.ckzpp2.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    ckzpp2: that.data.ckzpp2
                  })
                }
                for (var j in that.data.schedule[i].picture.ckzp.p3) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.ckzp.p3[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.ckzp.p3[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.ckzp.p3[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.ckzpp3.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    ckzpp3: that.data.ckzpp3
                  })
                }
                for (var j in that.data.schedule[i].picture.ckzp.p4) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.ckzp.p4[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.ckzp.p4[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.ckzp.p4[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.ckzpp4.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    ckzpp4: that.data.ckzpp4
                  })
                }
                for (var j in that.data.schedule[i].picture.ckzp.p5) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.ckzp.p5[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.ckzp.p5[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.ckzp.p5[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.ckzpp5.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    ckzpp5: that.data.ckzpp5
                  })
                }
                for (var j in that.data.schedule[i].picture.ckzp.p6) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.ckzp.p6[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.ckzp.p6[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.ckzp.p6[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.ckzpp6.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    ckzpp6: that.data.ckzpp6
                  })
                }
              }
              if (that.data.schedule[i].picture.gydz) {
                for (var j in that.data.schedule[i].picture.gydz.p1) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.gydz.p1[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.gydz.p1[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.gydz.p1[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.gydzp1.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    gydzp1: that.data.gydzp1
                  })
                }
                for (var j in that.data.schedule[i].picture.gydz.p2) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.gydz.p2[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.gydz.p2[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.gydz.p2[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.gydzp2.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    gydzp2: that.data.gydzp2
                  })
                }
                for (var j in that.data.schedule[i].picture.gydz.p3) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.gydz.p3[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.gydz.p3[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.gydz.p3[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.gydzp3.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    gydzp3: that.data.gydzp3
                  })
                }
                for (var j in that.data.schedule[i].picture.gydz.p4) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.gydz.p4[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.gydz.p4[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.gydz.p4[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.gydzp4.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    gydzp4: that.data.gydzp4
                  })
                }
                for (var j in that.data.schedule[i].picture.gydz.p5) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.gydz.p5[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.gydz.p5[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.gydz.p5[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.gydzp5.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    gydzp5: that.data.gydzp5
                  })
                }
                for (var j in that.data.schedule[i].picture.gydz.p6) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.gydz.p6[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.gydz.p6[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.gydz.p6[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.gydzp6.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    gydzp6: that.data.gydzp6
                  })
                }
                for (var j in that.data.schedule[i].picture.gydz.p7) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.gydz.p7[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.gydz.p7[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.gydz.p7[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.gydzp7.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    gydzp7: that.data.gydzp7
                  })
                }
                for (var j in that.data.schedule[i].picture.gydz.p8) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.gydz.p8[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.gydz.p8[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.gydz.p8[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.gydzp8.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    gydzp8: that.data.gydzp8
                  })
                }
                for (var j in that.data.schedule[i].picture.gydz.p9) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.gydz.p9[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.gydz.p9[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.gydz.p9[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.gydzp9.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    gydzp9: that.data.gydzp9
                  })
                }
                for (var j in that.data.schedule[i].picture.gydz.p10) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.gydz.p10[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.gydz.p10[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.gydz.p10[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.gydzp10.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    gydzp10: that.data.gydzp10
                  })
                }
              }
              if (that.data.schedule[i].picture.zfdz) {
                for (var j in that.data.schedule[i].picture.zfdz.p1) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.zfdz.p1[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.zfdz.p1[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.zfdz.p1[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.zfdzp1.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    zfdzp1: that.data.zfdzp1
                  })
                }
                for (var j in that.data.schedule[i].picture.zfdz.p2) {
                  imgId++;
                  that.data.allImg.push({
                    path: that.data.schedule[i].picture.zfdz.p2[j],
                    imgId: imgId
                  })
                  picTemp1 = that.data.schedule[i].picture.zfdz.p2[j].substring(0, 11);
                  picTemp2 = that.data.schedule[i].picture.zfdz.p2[j].substring(11);
                  picTemp1Data = picTemp1.substring(0, 10);
                  resultData = CompareDate(dateNow, picTemp1Data)
                  if (resultData) {
                    allTemp = picTemp1 + 'thumb_' + picTemp2
                  } else {
                    allTemp = picTemp1 + picTemp2
                  }
                  that.data.zfdzp2.push({
                    path: allTemp,
                    imgId: imgId
                  })
                  that.setData({
                    zfdzp2: that.data.zfdzp2
                  })
                }
              }
            }
          }
        }
        var aa1 = [];
        var toTrace;
        for (var n in res.data.push_schedule) {
          if (res.data.push_schedule[n].title == 'risk_report') {
            var temp = res.data.push_schedule[n].picture;
            temp = temp.split(',')
            for (var i in temp) {
              that.data.reportImg.push(test + 'uploads/work/' + temp[i])
            }
            that.setData({
              reportImg: that.data.reportImg
            })
            console.log(that.data.reportImg)
            continue
          } else if (res.data.push_schedule[n].title == 'risk_invoice') {
            var temp = res.data.push_schedule[n].picture;
            temp = temp.split(',')
            for (var i in temp) {
              that.data.invoiceImg.push(test + 'uploads/work/' + temp[i])
            }
            that.setData({
              invoiceImg: that.data.invoiceImg
            })
            console.log(that.data.invoiceImg)
            continue
          }
          toTrace = ''
          if (res.data.push_schedule[n].title == '接车') {
            toTrace = 'jieche'
          }
          if (res.data.push_schedule[n].title == '送车') {
            toTrace = 'songche'
          }
          var reg=/反馈结果/i

          if (res.data.push_schedule[n].title.match(reg)) {
            console.log(1234)
            res.data.push_schedule[n].title = res.data.push_schedule[n].title + '\n' + res.data.push_schedule[n].content
          }

          var last = 'grey';
          if (n == res.data.push_schedule.length - 1) {
            last = 'blue'
          }
          var first = 'has'
          if (n == 0) {
            first = 'nohas'
          }
          var year = res.data.push_schedule[n].date;
          var month = year.slice(5, 10);
          var time = year.slice(11)
          var picStr = '';
          if (res.data.push_schedule[n].picture) {
            picStr = res.data.push_schedule[n].picture;
          }
          aa1.unshift({
            trace: toTrace,
            first: first,
            color: last,
            current: true,
            month: month,
            time: time,
            done: true,
            pic: picStr.split(","),
            text: res.data.push_schedule[n].title,
            desc: res.data.push_schedule[n].date
          })
        }
        that.setData({
          steps: aa1
        })
        console.log(that.data.steps)
        setTimeout(function() {
          that.setData({
            pageReady: true,
          })
          wx.hideLoading()
        }, 1000)
        var ifZero;
        var allHeight = 0;
        var eachHeight;
        var picLength;
        var column;
        var rest;
        var tempTop;
        var tempTopAno;

        picLength = that.data.ckzpp1.length
        column = parseInt(picLength / 3)
        rest = picLength % 3
        if (rest != 0) {
          ifZero = 70
        } else {
          ifZero = 0;
        }
      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })


  },
  toDelete: function() {
    this.setData({
      deleteMODAL: true,
      modal: false
    })
  },
  confirmDelete: function() {
    var that = this
    wx.request({
      url: test + 'task/survey/del_survey?id=' + that.data.listId,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
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
          wx.showToast({
            title: "删除成功"
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)

        } else {
          // 0 未完成 -1 失败 
          if (res.data.status == 0){
            wx.showToast({
              title: res.data.msg
            })

          }else{
            wx.showToast({
              title: res.data.msg
            })
          }
          
        }
      }
    })

    this.setData({
      deleteMODAL: false,
    })
  },

  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  cancelClaim: function() {
    this.setData({
      cancelModal: true,
      modal: false
    })

  },
  cancelDeleteModal: function() {
    this.setData({
      deleteMODAL: false,
    })
  },
  confirmCancel: function() {
    var that = this
    this.setData({
      cancelModal: false
    })
    var that = this
    wx.request({
      url: test + 'task/survey/cancel/id/' + that.data.listId,
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
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
          wx.showToast({
            title: "取消成功",
            duration: 1000
          })
          setTimeout(function() {
            that.onReady()
          }, 1000)
          that.onReady()
        } else {
          wx.showToast({
            title: "取消失败"
          })
        }
      }
    })
  },
  noCancel: function() {
    this.setData({
      cancelModal: false
    })
  },
  toSelectPeople: function() {
    var pageModule = 0
    this.setData({
      modal: false
    })
    wx.navigateTo({
      url: '../../allot/allot?module=' + this.data.detailId + '&moduleis=1',
    })
  },
  cancelAllModal: function() {
    this.setData({
      takeOrimport: false
    })
  },
  reachScene: function() {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    wx.request({
      url: test + 'task/survey/schedule',
      method: 'POST',
      data: {
        ckzp: [],
        gydz: [],
        zfdz: [],
        title: '到达现场',
        content: that.data.userName,
        case_id: that.data.listId,
        pick_path: '',
        give_path: '',
        type: 1
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
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
          that.onReady()
        }

      }
    })
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.data.locationIf = false
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.removeStorage({
      key: 'specialId',
      success: function(res) {},
    })
  },
  stopPage: function() {
    this.setData({
      isScroll: false
    })
  },
  enablePage: function() {
    this.setData({
      isScroll: true
    })
  },
  toAbulm1: function() {
    this.setData({
      takeOrimport: false
    })
    wx.navigateTo({
      url: '../abulmSesect/abulmSesect?addClassifyId=' + this.data.addClassifyId + '&&listId=' + this.data.listId + '&&serviceName=' + this.data.serviceInfor.short_name + '&&caseType' + that.data.caseType
    })
  },
  toAbulm: function() {
    var that = this;
    var end;
    /** 
     wx.redirectTo({
       url: '../abulmSesect/abulmSesect?addClassifyId=' + this.data.addClassifyId + '&&listId=' + this.data.listId + '&&serviceName=' + this.data.serviceInfor.short_name,
     })
     **/
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        for (var j in res.tempFilePaths) {
          that.data.allmg.push(res.tempFilePaths[j])
        }

        for (var i in that.data.allDetail) {
          if (that.data.allDetail[i].id == that.data.addClassifyId) {
            that.data.theKind = that.data.allDetail[i].kind
            that.data.thePos = that.data.allDetail[i].pos
            var temp = parseInt(that.data.allDetail[i].id) + 1
            var lastPic = res.tempFilePaths[res.tempFilePaths.length - 1];
            wx.showLoading({
              title: '上传中...',
              duration: 10000000
            })
            Promise.all(res.tempFilePaths.map(item => wx.uploadFile({
              url: test + 'task/base/uploads',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'PHPSESSID=' + that.data.sessionId
              },
              filePath: item,
              name: 'image',
              formData: {
                address: encodeURI(that.data.locationAddress),
                name: encodeURI(that.data.serviceInfor.short_name),
                task_name: encodeURI(that.data.userName)
              },
              success: res => {
                console.log(res)

                console.log(item)

                var jsonStr = res.data;
                jsonStr = jsonStr.replace(" ", "");
                if (typeof jsonStr != 'object') {
                  jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
                  var jj = JSON.parse(jsonStr);
                  console.log(jj)
                  that.data.result.push(jj.file_name)
                }

                if (item == lastPic) {
                  setTimeout(() => {
                    console.log('最后一张了')
                    wx.hideToast()
                    that.submit()
                  }, 2000)

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
    this.setData({
      takeOrimport: false
    })
  },
  // toAddProgress: function() {
  //   wx.navigateTo({
  //     url: '../../addProgress/addProgress?moduleis=9&&detailId=' + this.data.detailId,
  //   })
  // },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onReady()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新

  },
  changeView: function(e) {
    var that = this;
    this.setData({
      toView: e.currentTarget.dataset.name
    })
    for (var i in that.data.listArr) {
      if (e.currentTarget.dataset.name == that.data.listArr[i].dataName) {
        var backTemp = 'listArr[' + i + '].class'
        that.setData({
          [backTemp]: 'listActive',
          locationArr: i
        })
      } else {
        var backTemp = 'listArr[' + i + '].class'
        that.setData({
          [backTemp]: 'imgListName'
        })
      }
    }
    for (var j in that.data.moduleArr) {
      if (j == that.data.locationArr) {
        var moduleArrTemp = 'moduleArr[' + j + ']'
        that.setData({
          [moduleArrTemp]: true
        })
      } else {
        var moduleArrTemp = 'moduleArr[' + j + ']'
        that.setData({
          [moduleArrTemp]: false
        })
      }
    }
  },
  finish: function() {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    var tempType = that.data.detail.type
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: test + 'task/survey/finish',
      method: 'GET',
      data: {
        id: that.data.listId,
        type: that.data.detail.type
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
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
          that.onReady()

          wx.request({
            url: test + 'task/survey/schedule',
            method: 'POST',
            data: {
              ckzp: [],
              gydz: [],
              zfdz: [],
              title: '结案',
              content: '',
              case_id: that.data.listId,
              pick_path: '',
              give_path: '',
              type: 1
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cookie': 'PHPSESSID=' + that.data.sessionId
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
                that.onReady()
              }

            }
          })
        }

      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },

  orders: function() {
    var that = this
    this.setData({
      addPross: true
    })
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: test + 'task/survey/receive',
      method: 'GET',

      data: {
        id: that.data.listId,
        type: that.data.detail.type
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
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
          console.log(that.data.detail.type)
          var tempType = that.data.detail.type
          that.onReady()
          wx.request({
            url: test + 'task/survey/schedule',
            method: 'POST',
            data: {
              ckzp: [],
              gydz: [],
              zfdz: [],
              title: '已接单',
              content: that.data.userName,
              case_id: that.data.listId,
              pick_path: '',
              give_path: '',
              type: 1
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cookie': 'PHPSESSID=' + that.data.sessionId
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
                that.onReady()
              }

            }
          })

        }

      }
    })
  },
  openModal: function() {
    this.setData({
      modal: true
    })
  },
  closeOprationModal: function(e) {
    this.setData({
      modal: false
    })
  },
  toEdit: function() {
    this.setData({
      modal: false
    })
    wx.navigateTo({
      url: '../editcheckLossDeatail/editcheckLossDeatail?module=' + this.data.detailId,
    })
  },
  toPayPhoto: function() {
    var that = this;


    wx.navigateTo({
      url: '../../addphotoPay/addphotoPay?listId=' + this.data.listId + '&&serviceName=' + that.data.serviceInfor.short_name + '&&caseType=' + that.data.caseType,
    })
    this.setData({
      modal: false
    })
  },
  toDetailgydz: function() {
    var that = this;

    wx.navigateTo({
      url: '../../addphotoPublic/addphotoPublic?listId=' + this.data.listId + '&&serviceName=' + that.data.serviceInfor.short_name + '&&caseType=' + that.data.caseType,
    })
    this.setData({
      modal: false
    })
  },
  cancel1:function(){
    this.setData({
      iffeedback:false
    })
  },
  openFeedback: function () {
    this.setData({
      iffeedback: true
    })
  },
  getLocation: function() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        lat = res.latitude
        long = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {

            that.data.locationAddress = res.result.address
            wx.setStorageSync('location', that.data.locationAddress);

            var localTion = wx.getStorageSync('location');
          },
          fail: function(res) {}

        });
      }
    })
  },
  toDetailPhoto: function() {
    var that = this
    wx.navigateTo({
      url: '../../addphoto/addphoto?listId=' + this.data.listId + '&&serviceName=' + that.data.serviceInfor.short_name,
    })
    this.setData({
      modal: false
    })
  },
  openImg: function(e) {
    wx.setStorageSync('freshFlag', false)
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [e.currentTarget.id] // 需要预览的图片http链接列表
    })

  },
  openImg1: function(e) {
    var picId = e.currentTarget.id;
    var allImgTemp = [];
    for (var j in this.data.allImg) {
      var eachTemp = test + 'uploads/work/' + this.data.allImg[j].path
      allImgTemp.push(eachTemp)

    }
    for (var i in this.data.allImg) {

      if (this.data.allImg[i].imgId == picId) {

        var a = test + 'uploads/work/' + this.data.allImg[i].path;


        wx.previewImage({
          current: a, // 当前显示图片的http链接
          urls: allImgTemp // 需要预览的图片http链接列表
        })
        return
      }
    }
  },
  addPicBtn: function() {
    this.setData({
      addImage: true,
      inDetail: true,
      inDetailEnd: true
    })
  },
  backDetail: function() {
    this.setData({
      addImage: false,
      inDetail: false,
      inDetailEnd: false
    })
  },
  toselectTake: function(e) {
    this.data.addClassifyId = e.currentTarget.id
    this.setData({
      takeOrimport: true
    })
  },
  /**上啦**/
  onReachBottom: function() {

  },
  totake: function(e) {
    var that = this
    var classifyIdTemp = parseInt(this.data.addClassifyId)
    if (classifyIdTemp < 6) {
      wx.navigateTo({
        url: '../../addphoto/addphoto?classifyId=' + this.data.addClassifyId + '&&listId=' + this.data.listId + '&&serviceName=' + this.data.serviceInfor.short_name + '&&caseType=' + that.data.caseType,
      })

    } else if (classifyIdTemp > 5 && classifyIdTemp < 16) {
      wx.navigateTo({
        url: '../../addphotoPublic/addphotoPublic?classifyId=' + this.data.addClassifyId + '&&listId=' + this.data.listId + '&&serviceName=' + this.data.serviceInfor.short_name + '&&caseType=' + that.data.caseType,
      })
    } else if (classifyIdTemp > 15 && classifyIdTemp < 18) {
      wx.navigateTo({
        url: '../../addphotoPay/addphotoPay?classifyId=' + this.data.addClassifyId + '&&listId=' + this.data.listId + '&&serviceName=' + this.data.serviceInfor.short_name + '&&caseType=' + that.data.caseType,
      })
    }

    this.setData({
      takeOrimport: false
    })
  },
  submit: function() {
    var that = this
    var posTemp;
    var Temp = that.data.result
    if (this.data.addClassifyId == 0 || this.data.addClassifyId == 6 || this.data.addClassifyId == 16) {
      posTemp = {
        p1: Temp
      }
    } else if (this.data.addClassifyId == 1 || this.data.addClassifyId == 7 || this.data.addClassifyId == 17) {
      posTemp = {
        p2: Temp
      }
    } else if (this.data.addClassifyId == 2 || this.data.addClassifyId == 8) {
      posTemp = {
        p3: Temp
      }
    } else if (this.data.addClassifyId == 3 || this.data.addClassifyId == 9) {
      posTemp = {
        p4: Temp
      }
    } else if (this.data.addClassifyId == 4 || this.data.addClassifyId == 10) {
      posTemp = {
        p5: Temp
      }
    } else if (this.data.addClassifyId == 5 || this.data.addClassifyId == 11) {
      posTemp = {
        p6: Temp
      }
    } else if (this.data.addClassifyId == 12) {
      posTemp = {
        p7: Temp
      }
    } else if (this.data.addClassifyId == 13) {
      posTemp = {
        p8: Temp
      }
    } else if (this.data.addClassifyId == 14) {
      posTemp = {
        p9: Temp
      }
    } else if (this.data.addClassifyId == 15) {
      posTemp = {
        p10: Temp
      }
    }
    posTemp = JSON.stringify(posTemp)

    if (that.data.theKind == 'ckzp') {
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
          type: 1
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + that.data.sessionId
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
          that.setData({
            result: []
          })
          if (res.data.status == 1) {
            wx.hideToast()
            wx.showToast({
              title: '上传成功',
              duration: 500

            });
            setTimeout(function() {
              that.onReady()
            }, 500)
            return
          } else {
            wx.showToast({
              title: '上传失败',
              duration: 500
            });
            return
          }

        },
        complete: function() {
          // complete
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
    } else if (that.data.theKind == 'gydz') {
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
          type: 1
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + that.data.sessionId
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
          that.setData({
            result: []
          })
          if (res.data.status == 1) {
            wx.showToast({
              title: '上传成功',
              duration: 500

            });
            setTimeout(function() {
              that.onReady()
            }, 500)
            return
          } else {
            wx.showToast({
              title: '上传失败',
              duration: 500
            });
            return
          }

        },
        complete: function() {
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
          type: 1
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + that.data.sessionId
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
          that.setData({
            result: []
          })
          if (res.data.status == 1) {

            wx.showToast({
              title: '上传成功',
              duration: 500

            });
            setTimeout(function() {
              that.onReady()
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
        complete: function() {
          // complete
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
    }
  },
  toAddProgress: function () {
    wx.navigateTo({
      url: '../../addProgress/addProgress?moduleis=2&&detailId=' + this.data.pushDetail.id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

function formatSeconds(value) {
  var theTime = parseInt(value); // 秒 
  var theTime1 = 0; // 分 
  var theTime2 = 0; // 小时 
  // alert(theTime); 
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    // alert(theTime1+"-"+theTime); 
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  var result = "" + parseInt(theTime) + "秒";
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1) + "分" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + "小时" + result;
  }
  return result;
}

function CompareDate(d1, d2) {

  return ((new Date(d1.replace(/-/g, "\/"))) < (new Date(d2.replace(/-/g, "\/"))));
}
function getPushServer(that){
  wx.request({
    url: test + 'task/index/service_info',
    method: 'GET',
    data: {
      id: that.data.pushDetail.push_service_id
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'PHPSESSID=' + that.data.sessionId
    }, // 默认值
    success: function (res) {
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
      console.log(res)
      that.setData({
        pushSetviceInfor: res.data.service
      })
    }
  })


}
function addProgress(that, con) {
  var title = ''
  var user = wx.getStorageSync('userName')
  if (that.data.feedback == 1) {
    title = user+'反馈结果：推修成功'
  } else if (that.data.feedback == 2) {
    title = user +'反馈结果：推修失败'
  } else if (that.data.feedback == 3) {
    title = user + '反馈结果：不确定'
    that.setData({
      feedback: 1,
      ok_btn: false
    })
  }
  wx.request({
    url: test + 'task/push/schedule',
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
    },// 默认值
    data: {
      case_id: that.data.pushDetail.id,
      title: title,
      content: con,
      picture: '',
      type: 2
    },
    success: function (res) {
      wx.showToast({
        title: '反馈成功',
        duration: 500
      })
      that.setData({
        feedback_con: ''
      })

      setTimeout(function () {
        that.setData({
          iffeedback:false
        })
        wx.hideLoading()

        that.onReady()
      }, 500)
    }
  })
}