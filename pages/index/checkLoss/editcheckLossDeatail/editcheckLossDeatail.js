// pages/index/editClaims/editClaims.js
var test = getApp().globalData.hostName;
var dateTimePicker = require('../../../../utils/dateTimePicker.js');

const date = new Date()
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
    listId: '',
    array:[],
    isdamageShow:true,
    caseerror:"black",
    carerror:"black",
    startYear:2010,
    endYear:2050,
    taskmodes: ["现场查勘(拍摄标的照片)", "现场查勘(仅有自拍照片)", "现场未勘", "非现场查勘", "协助现场", "协助定损", "标的定损", "三责定损", "已勘销案", "人伤快赔", "物损"],
    taskmodes1: ["现场查勘", "非现场查勘", "人伤查勘", "标的定损", "三责定损", "物损"],
    dateTimeArray1: null,
    casemodes: ["整案损失5000以内(纯车物)", "整案损失5000以内(纯车物视频定损)", "整案损失超5000", "整案损失超5000(视频定损)", "含人伤现场查勘", "人伤一案到底", "已勘销案"],
    itareas: ["东郊", "西郊", "北郊", "南郊"],
    multiArray: [["城区", "郊县"], ["未央路东(南)", "未央路东(北)", "未央路西", "西二环内", "东二环内", "南二环内", "北二环内", "城墙内(东)", "城墙内(西)", "西二环外", "三桥(南)", "三桥(北)", "高新南"]],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '城区'
        },
        {
          id: 1,
          name: '郊县'
        }
      ]
    ],
    multiIndex: [0, 0],

    multiArray1: [["白班", "小夜班", "大夜班"], ["7:00-18:00"]],
    objectMultiArray1: [
      [{
        id: 0,
        name: '白班'
      }, {
        id: 1,
        name: '小夜班'
      }, {
        id: 2,
        name: '大夜班'
      }]
    ],
    multiIndex1: [0, 0],
    detail:{
      task_type: "",
      survey_address: "",
      report_date: "",
      send_time: "",
      case_type: "",
      are: "",
      send_date: "",
      policy_no: "",
      ins_org: "",
      send_user: "",
      survey_date: "",
      car_no: 111,
    },
    title:"",
    longitude:"",
    latitude:"",
    flag:1
    
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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

    this._time();
  },

  _time: function () {

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    })

  },



  formSubmit: function (e) {



    console.log("&&&&&))()");
    var that = this
    var temp_third = [];
    if (e.detail.value.car1 || e.detail.value.mobile1) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile1, car_no: e.detail.value.car1 })
    }
    if (e.detail.value.car2 || e.detail.value.mobile2) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile2, car_no: e.detail.value.car2 })
    }
    if (e.detail.value.car3 || e.detail.value.mobile3) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile3, car_no: e.detail.value.car3 })
    }
    if (e.detail.value.car4 || e.detail.value.mobile4) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile4, car_no: e.detail.value.car4 })
    }
    if (e.detail.value.car5 || e.detail.value.mobile5) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile5, car_no: e.detail.value.car5 })
    }
    if (e.detail.value.car6 || e.detail.value.mobile6) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile6, car_no: e.detail.value.car6 })
    }
    if (e.detail.value.car7 || e.detail.value.mobile7) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile7, car_no: e.detail.value.car7 })
    }
    if (e.detail.value.car8 || e.detail.value.mobile8) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile8, car_no: e.detail.value.car8 })
    }
    if (e.detail.value.car9 || e.detail.value.mobile9) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile9, car_no: e.detail.value.car9 })
    }
    if (e.detail.value.car10 || e.detail.value.mobile10) {
      temp_third.push({ survey_id: that.data.listId, phone: e.detail.value.mobile10, car_no: e.detail.value.car10 })
    }
    temp_third = JSON.stringify(temp_third);
    console.log(e)
    var that = this;

   
    var insurance_id = that.data.detail.insurance_id; //保险公司id

    console.log("DDDDDDDDDDDDD" + insurance_id);

    if (e.detail.value.report_no == '') {

      console.log("$$$$$$$$$$$$$");

      that.setData({
        caseerror: "red",
        detail: {
          report_no: "!报案号不能为空",
          car_no: that.data.detail.car_no,
          survey_no: that.data.detail.survey_no,
          survey_date: that.data.detail.survey_date,
          task_type: that.data.detail.task_type,
          type: that.data.detail.type,
          report_date: that.data.detail.report_date,
          send_time: that.data.detail.send_time,
          case_type: that.data.detail.case_type,
          are: that.data.detail.are,
          send_date: that.data.detail.send_date,
          policy_no: that.data.detail.policy_no,
          ins_org: that.data.detail.ins_org,
          insurance_id: that.data.detail.insurance_id
        },
        title: that.data.title,
      })
      return

    }

    if (insurance_id == 3 || insurance_id == 8){

      console.log("%%%%%%%%%%%%%" + e.detail.value.riskdamage);
      
       if (e.detail.value.carId ==""){

        that.setData({
          carerror: "red",
          detail: {
            report_no: that.data.detail.report_no, 
            car_no: "!车牌号不能为空",
            survey_no: that.data.detail.survey_no,
            survey_date: that.data.detail.survey_date,
            task_type: that.data.detail.task_type,
            type: that.data.detail.type,
            report_date: that.data.detail.report_date,
            send_time: that.data.detail.send_time,
            case_type: that.data.detail.case_type,
            are: that.data.detail.are,
            send_date: that.data.detail.send_date,
            policy_no: that.data.detail.policy_no,
            ins_org: that.data.detail.ins_org,
            send_user: that.data.detail.send_user,
            insurance_id: that.data.detail.insurance_id
          },
          title: that.data.title,
        })
        return
       } else if (e.detail.value.riskdamage == ""){
         that.setData({
           riskdamageerror: "red",
           detail: {
             report_no: that.data.detail.report_no,
             car_no: that.data.detail.car_no,
             survey_no: that.data.detail.survey_no,
             survey_date: that.data.detail.survey_date,
             task_type: that.data.detail.task_type,
             type: that.data.detail.type,
             report_date: that.data.detail.report_date,
             send_time: that.data.detail.send_time,
             case_type: that.data.detail.case_type,
             are: that.data.detail.are,
             send_date: that.data.detail.send_date,
             policy_no: that.data.detail.policy_no,
             ins_org: that.data.detail.ins_org,
             send_user: that.data.detail.send_user,
             insurance_id: that.data.detail.insurance_id
           },
           title: "!出险/定损地点不能为空",
         })
         return
      }

    } else{

      if (e.detail.value.sendusername == ""){

        that.setData({
          sendworkererror: "red",
          detail: {
            report_no: that.data.detail.report_no,
            car_no: that.data.detail.car_no,
            survey_no: that.data.detail.survey_no,
            survey_date: that.data.detail.survey_date,
            task_type: that.data.detail.task_type,
            type: that.data.detail.type,
            report_date: that.data.detail.report_date,
            send_time: that.data.detail.send_time,
            case_type: that.data.detail.case_type,
            are: that.data.detail.are,
            send_date: that.data.detail.send_date,
            policy_no: that.data.detail.policy_no,
            ins_org: that.data.detail.ins_org,
            send_user:"！派工人不能为空",
            insurance_id: that.data.detail.insurance_id
          },
          title: that.data.title,
        })
        return
        }
    }


    that.setData({
      allOver:true
    })

    console.log(that.data.insuranceId)
    var test = getApp().globalData.hostName;
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = that.data.userId;
    var session_id = that.data.sessionId;
    console.log(e.detail.value);
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: test + 'task/survey/edit',
      method: 'POST',
      data: {
        id: that.data.listId,
        type: that.data.classify,
        insurance_id: that.data.insuranceId,
        report_no: that.data.detail.report_no,
        car_no: that.data.detail.car_no,
        remark: e.detail.value.remark ? e.detail.value.remark:'',
        task_type: that.data.detail.task_type,
        survey_address: that.data.title +"-"+ that.data.longitude +","+that.data.latitude,
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        send_user: that.data.detail.send_user,
        survey_date: that.data.detail.survey_date
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
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
        wx.setStorageSync('refreshFlag', true)
        if(res.data.status==1){

          that.data.flag == 1;

          wx.showToast({
            title: '修改成功',
            duration:500
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },500)
        }
        

      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })

  },
  cancelRed: function (e) {
    var that = this;
    if (e.currentTarget.id == 'casePerson') {
      that.setData({
        casePersonErr: false
      })
    } else if (e.currentTarget.id == 'report_no') {
      that.setData({
        report_noErr: false
      })
    } else if (e.currentTarget.id == 'carId') {
      that.setData({
        carIdErr: false
      })
    } else if (e.currentTarget.id == 'caseMobile') {
      that.setData({
        caseMobileErr: false
      })
    } 

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
    var that = this

    // var latitude = that.data.latitude;
    // var longitude = that.data.longitude;
    // var title = that.data.title;

    that.data.userName = wx.getStorageSync('userName'),
    that.data.usernumber = wx.getStorageSync('job_no'),

    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;
    wx.showNavigationBarLoading() //在标题栏中显示加载


    if(that.data.flag == 1){

      wx.request({
        url: test + 'task/survey/info/id/' + that.data.listId,
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
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
          //案件类型（0：查勘，1：三责，2：标的）
          console.log("$$$" + JSON.stringify(res.data.survey));
          if (res.data.survey.type == 1) {

            that.setData({
              ifdamage: true,
              classify: 1,
              isdamageShow: false
            })
          } else if (res.data.survey.type == 2) {

            that.setData({
              ifdamage: false,
              classify: 2,
              isdamageShow: false
            })
          } else {

            that.data.classify = 0
          }

          console.log("&(&(^&)()" + typeof (that.data.title))

          if (that.data.title != "") {

            console.log("#####################")

            that.setData({
              title: that.data.title,

            })
          } else {

            console.log("*********************")
            if (res.data.survey.survey_address != "") {
              // var address = res.data.survey.survey_address.split("-");
              // that.data.longitude = address[1]; //经度
              // that.data.latitude = address[2] //纬度



              // console.log("########" + address[1] + address[2])

              var add = res.data.survey.survey_address;

              var address1 = add.lastIndexOf("\-");

              var dd = add.substring(address1 + 1, add.length);

              that.data.longitude = dd.split(",")[0];
              that.data.latitude = dd.split(",")[1];

              add = add.substring(0, address1);

              that.setData({
                title: add
              })
            }
          }



          if (res.data.survey.insurance_id == 3) {

            that.setData({

              istaskvalue: true,
              taipingdate: true,
              pingandate: false,
              sendtime: false,
              riskdamage: false,
              taipingcase: true,
              itarea: true,
              pinganarea: false,
              pinganperiod: false,
              itWarranty: true,
              itcarid: false,
              itagency: true,
              sendworkers: true
            })

          } else if (res.data.survey.insurance_id == 8) {

            that.setData({
              istaskvalue: false,
              taipingdate: false,
              pingandate: true,
              sendtime: true,
              riskdamage: false,
              taipingcase: false,
              itarea: true,
              pinganarea: true,
              pinganperiod: true,
              itWarranty: true,
              itcarid: false,
              itagency: true,
              sendworkers: true
            })


          } else {

            that.setData({
              istaskvalue: false,
              taipingdate: true,
              pingandate: true,
              sendtime: false,
              riskdamage: true,
              taipingcase: true,
              itarea: false,
              pinganarea: true,
              pinganperiod: true,
              itWarranty: false,
              itcarid: true,
              itagency: false,
              sendworkers: false
            })

          }

          // third: res.data.sanze,
          that.setData({
            detail: res.data.survey,
            detailId: res.data.survey.id,
            surveyor: that.data.userName,
            usernumber: that.data.usernumber
          })
          console.log("%%%%%%%%%%%" + that.data.detail.insurance_id);
          wx.request({
            url: test + 'task/index/systemInsurance',
            method: 'GET',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
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
              that.setData({
                insurance: res.data.insurance
              })
              console.log(that.data.insurance)
              for (var i in res.data.insurance) {
                that.data.array.push(res.data.insurance[i].name)
              }
              var arrayTemp = that.data.array
              that.setData({
                array: arrayTemp,
                insuranceId: that.data.detail.insurance_id
              })
              console.log(that.data.insuranceId)
              for (var j in that.data.insurance) {
                if (that.data.insurance[j].id == that.data.detail.insurance_id) {
                  for (var m in that.data.array) {
                    if (that.data.insurance[j].name == that.data.array[m]) {

                      that.setData({
                        index1: m,
                        insuranceId: that.data.insurance[j].id
                      })
                    }
                  }
                }
              }
            }

          })

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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },


  bindPickerChange:function(e){
    console.log(e)
    var that = this
    for (var i in that.data.insurance) {
      if (that.data.insurance[i].name == that.data.array[e.detail.value]) {
        that.setData({
          insuranceId: that.data.insurance[i].id
        })
      }
    }
    console.log(that.data.insuranceId)

    that.data.detail.insurance_id = that.data.insuranceId;

    if (that.data.insuranceId == 3){

      that.setData({

        jobnumber:false,
        istaskvalue:true,
        pingandate:false,
        sendtime:false,
        riskdamage:false,
        taipingcase:true,
        itarea:true,
        pinganperiod:false,
        itWarranty:true,
        itcarid:false,
        itagency:true,
        sendworkers:true

      })

    } else if (that.data.insuranceId == 8){

      that.setData({

        jobnumber:false,
        istaskvalue:false,
        pingandate:true,
        sendtime: true,
        riskdamage:false,
        taipingcase: false,
        itarea:true,
        pinganperiod:true,
        itWarranty:true,
        itcarid:false,
        itagency:true,
        sendworkers:true
      })

    }else{

      that.setData({

        jobnumber:true,
        istaskvalue:false,
        pingandate:true,
        sendtime: false,
        riskdamage:true,
        taipingcase: true,
        itarea:false,
        pinganperiod:true,
        itWarranty:true,
        itcarid:true,
        itagency:false,
        sendworkers:false
      })

    }


    that.setData({
      index1: e.detail.value
    })
  },

  radioChage:function(e){
    
    if (e.detail.value == 1) {
      this.setData({
        isdamageShow: false,
        classify: 1
      })
    } else {

      this.data.classify = 0;  //案件类型（0：查勘，1：三责，2：标的）
      this.setData({
        isdamageShow: true
      })
    }
  },

  radioChage1:function(e){

    var that = this;
    if (e.detail.value == 1) {

      that.data.classify = 2;
    } else {

      that.data.classify = 1;
    }
  },

  casefocus:function(e){

    var that = this;
    that.setData({
      caseerror:"black",
      allOver: false,
      detail:{
        report_no:"",
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        survey_date: that.data.detail.survey_date,
        task_type: that.data.detail.task_type,
        type: that.data.detail.type,
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        insurance_id: that.data.detail.insurance_id
      },
      title: that.data.title,
    })
  },

  caseblur:function(e){

    var that = this;
    that.data.detail.report_no = e.detail.value;

  },

  caridfocus:function(){

    var that = this;
    that.setData({
      carerror:"black",
      allOver: false,
      detail: {
        report_no: that.data.detail.report_no,
        car_no: "",
        survey_no: that.data.detail.survey_no,
        survey_date: that.data.detail.survey_date,
        task_type: that.data.detail.task_type,
        type: that.data.detail.type,
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        insurance_id: that.data.detail.insurance_id
      },
      title: that.data.title,
    })
  },

  caridblur:function(e){

    var that = this;
    that.data.detail.car_no = e.detail.value;

  },

  bindChangedate: function (event) {

    console.log(JSON.stringify(event));
    var that= this;
    const val = event.detail.value;
    this.setData({
      detail: {
        survey_date:val,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.detail.task_type,
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        
        insurance_id: that.data.detail.insurance_id
      },
      title: that.data.title,
    })
  },

  bindChangetask: function (event){
    var that=  this;
    const val = event.detail.value;
    this.setData({
      detail: {
        survey_date: that.data.detail.survey_date,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.taskmodes[val],
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        
        insurance_id: that.data.detail.insurance_id
      },
      title: that.data.title,
    })
  },

  bindChangetask1:function(event){
    var that = this;
    const val = event.detail.value;
    this.setData({
      detail: {
        survey_date: that.data.detail.survey_date,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.taskmodes1[val],
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        
        insurance_id: that.data.detail.insurance_id
      },
      title: that.data.title,
    })
  },

  bindChangedate1:function(event){

    var that = this;
    const val = event.detail.value;
    this.setData({
      detail: {
        survey_date: that.data.detail.survey_date,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.detail.task_type,
        report_date:val,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        
        insurance_id: that.data.detail.insurance_id
      },
      title: that.data.title,
    })
  },

  changeDateTime1:function(e){

    this.setData({ dateTime1: e.detail.value });
  },

  changeDateTimeColumn1(e) {
    
    var that = this;

    var arr = that.data.dateTime1, dateArr = that.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    

    var year = that.data.dateTimeArray1[0][that.data.dateTime1[0]];
    var month = that.data.dateTimeArray1[1][that.data.dateTime1[1]];
    var day = that.data.dateTimeArray1[2][that.data.dateTime1[2]];
    var hour = that.data.dateTimeArray1[3][that.data.dateTime1[3]];
    var min = that.data.dateTimeArray1[4][that.data.dateTime1[4]];

    console.log("***" + year + month + day + hour + min + "***");

    that.setData({
      detail:{
        survey_date: that.data.detail.survey_date,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.detail.task_type,
        report_date: that.data.detail.report_date,
        send_time: year + "-" + month + "-" + day + " " + hour + ":" + min,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        
        insurance_id: that.data.detail.insurance_id
      },
      title: that.data.title,
    })
  },

  risk: function () {

    var that = this;

    wx.navigateTo({
      url: '../checkLocation/checkLoation',
    })

  },

  bindChangecase:function(event){

    const val = event.detail.value;
    var that = this;
    that.setData({

      detail:{
        survey_date: that.data.detail.survey_date,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.detail.task_type,
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.casemodes[val],
        are:that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        
        insurance_id: that.data.detail.insurance_id
      },
      title: that.data.title,
    })
  },

  bindChangeitarea:function(event){

    var that = this;
    const val = event.detail.value;
 
    that.setData({

      detail:{
        survey_date: that.data.detail.survey_date,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.detail.task_type,
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are:that.data.itareas[val],
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        
        insurance_id: that.data.detail.insurance_id
      },
      title: that.data.title,
      
    })
  },

  bindMultiPickerChange: function (e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange: function (e) {

    var that= this;
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: that.data.multiArray,
      multiIndex: that.data.multiIndex
    };

    data.multiIndex[e.detail.column] = e.detail.value;

    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ["未央路东(南)", "未央路东(北)", "未央路西", "西二环内", "东二环内", "南二环内", "北二环内", "城墙内(东)", "城墙内(西)", "西二环外", "三桥(南)", "三桥(北)", "高新南"];
            break;
          case 1:
            data.multiArray[1] = ["长安韦曲", "长安郭社", "长安航天", "蓝田", "高陵", "周至", "户县", "临潼", "阎良"];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;


        break;

    }
    
    that.setData(data);

    that.setData({

      detail:{
        survey_date: that.data.detail.survey_date,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.detail.task_type,
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.multiArray[0][that.data.multiIndex[0]] + " " + that.data.multiArray[1][that.data.multiIndex[1]], 
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        
        insurance_id: that.data.detail.insurance_id       
      },
      title: that.data.title,
    })

  },


  bindMultiPickerChange1: function (e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value
    })
  },

  bindMultiPickerColumnChange1: function (e) {

    var that =this;

    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray1: that.data.multiArray1,
      multiIndex1: that.data.multiIndex1
    };

    data.multiIndex1[e.detail.column] = e.detail.value;

    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex1[0]) {
          case 0:
            data.multiArray1[1] = ["07:00-18:00"];
            break;
          case 1:
            data.multiArray1[1] = ["18:00-21:00"];
            break;
          case 2:
            data.multiArray1[1] = ["21:00-07:00"];
            break;
        }
        data.multiIndex1[1] = 0;
        data.multiIndex1[2] = 0;
        break;

    }

    that.setData(data);

    that.setData({

      detail: {
        survey_date: that.data.detail.survey_date,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.detail.task_type,
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.multiArray1[0][that.data.multiIndex1[0]] + " " + that.data.multiArray1[1][that.data.multiIndex1[1]],
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        
        insurance_id: that.data.detail.insurance_id

      },
      title: that.data.title,
    })

  },

  probefocus:function(e){

    var that = this;
    that.setData({
      allOver: false,
      detail: {
        survey_date: that.data.detail.survey_date,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.detail.task_type,
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: "",
        ins_org: that.data.detail.ins_org,
        
        insurance_id: that.data.detail.insurance_id
      },
      title: that.data.title,
    })
  },

  probeblur:function(e){
    var that = this;
    that.data.detail.policy_no = e.detail.value;
  },

  agencyfocus:function(){

    var that = this;
    that.setData({
      allOver: false,
      detail: {
        survey_date: that.data.detail.survey_date,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.detail.task_type,
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: "",
       
        insurance_id: that.data.detail.insurance_id
      },
      title: that.data.title,
    })
  },

  agencyblur:function(e){
    var that = this;
    that.data.detail.ins_org = e.detail.value;
  },

  sendworkerfocus:function(){
    var that = this;
    that.setData({
      sendworkererror:"black",
      allOver: false,
      detail: {
        survey_date: that.data.detail.survey_date,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.detail.task_type,
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        send_user:"",
        
        insurance_id: that.data.detail.insurance_id
      },
      title: that.data.title,
    })
  },

  sendworkerblur:function(e){

    var that = this;
    that.data.detail.send_user = e.detail.value;
  },

  riskdamagefocus:function(){

    var that=this;

    that.setData({
      riskdamageerror: "black",
      allOver: false,
      detail: {
        survey_date: that.data.detail.survey_date,
        car_no: that.data.detail.car_no,
        survey_no: that.data.detail.survey_no,
        report_no: that.data.detail.report_no,
        type: that.data.detail.type,
        task_type: that.data.detail.task_type,
        report_date: that.data.detail.report_date,
        send_time: that.data.detail.send_time,
        case_type: that.data.detail.case_type,
        are: that.data.detail.are,
        send_date: that.data.detail.send_date,
        policy_no: that.data.detail.policy_no,
        ins_org: that.data.detail.ins_org,
        send_user: that.data.detail.send_user,
        insurance_id:that.data.detail.insurance_id
      },
      title: "",
    })
  },

  riskdamageblur:function(e){

    var that = this;
    that.data.title = e.detail.value;
  }

})