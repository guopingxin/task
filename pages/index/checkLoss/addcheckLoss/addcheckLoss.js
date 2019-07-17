// pages/index/checkLoss/addcheckLoss/addcheckLoss.js

var utils = require('../../../../utils/util.js');
var test = getApp().globalData.hostName;
var QQMapWX = require('../../../../qqmap-wx-jssdk');

var dateTimePicker = require('../../../../utils/dateTimePicker.js');


var demo = new QQMapWX({
  key: 'OEIBZ-MF2HD-B6U4J-HRVAP-AASNO-CMBEQ' // 必填
});

import {addcheckLoss} from 'addcheckLossmode.js';

var addcheckloss = new addcheckLoss();


const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const mins = []

for (let i = 2000; i<2050; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

for(let i = 1; i<= 24; i++){
  hours.push(i)
}

for(let i = 0; i<60; i++){
  mins.push(i)
}

Page({
  data: {
    back_cell: 'back_cell',
    titTop: '64px',
    paddingTop: '114px',
    title_cell: 'title_cell',
    container: 'container',
    titleTop: '添加任务流',
    third_num: -1,
    money: '',
    arrayObject: [],
    array: [],
    index: 0,
    firstPage: true,
    secondPage: false,
    companyed: '',
    choosedCompany: true,
    chooseCompany: false,
    please: false,
    shortInfor: '',
    ifdamage:true,
    isdamageShow:true,
    caseInfor: [{
      numberId: '',
      carId: '',
      casePerson: '',
      casePhone: ''
    }],
    value: [date.getFullYear()-2000,date.getMonth(),date.getDate()-1],
    years: years,
    months: months,
    days: days,
    year:date.getFullYear(),
    year1: date.getFullYear(),
    month:date.getMonth()+1,
    month1: date.getMonth() + 1,
    day:date.getDate(),
    day1: date.getDate(),
    dateisShow:true,
    task:true,
    background:"white",
    taskmodes: ["请选择任务类型","现场查勘(拍摄标的照片)", "现场查勘(仅有自拍照片)", "现场未勘", "非现场查勘", "协助现场", "协助定损", "标的定损", "三责定损", "已勘销案", "人伤快赔", "物损"],
    taskmodes1: ["请选择任务类型","现场查勘", "非现场查勘", "人伤查勘", "标的定损", "三责定损", "物损"],
    taskmode1:"非现场查勘",
    taskvalue1: 0,
    taskmode:"现场未勘",
    taskvalue: 2,
    jobvalue: [date.getFullYear() - 2000, date.getMonth(), date.getDate() - 1,date.getHours()-1,date.getMinutes()],
    job: true,
    mins:mins,
    hours:hours,
    hour:date.getHours(),
    min:date.getMinutes(),
    periodareas: ["白班","小夜班","大夜班"],
    periods:["7:00-18:00","18:00-21:00","21:00-07:00"],
    periodvalue:[1,1],
    periodarea:"小夜班",
    period:"18:00-21:00",
    periodisShow:true,
    areaisShow:true,
    caseform:true,
    urbanarea:"城区",
    roadsection:"未央路东(北)",
    areavalue:[0,1],

    multiArray: [["选择","城区", "郊县"], ["区域"]],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '选择'
        },
        {
          id: 1,
          name: '城区'
        },
        {
          id: 2,
          name: '郊县'
        }
      ]      
    ],
    multiIndex: [0, 0],

    multiArray1:[["选择","白班","小夜班","大夜班"],["派工时间段"]],
    objectMultiArray1:[
      [
        {
          id: 0,
          name: '选择'
      },
        {
        id:1,
        name:'白班'
      },{
        id: 2,
        name: '小夜班'
      },{
        id:3,
          name:'大夜班'
      }]
    ],
    multiIndex1:[0,0],
    areas:["城区","郊县"],
    roadsections: ["未央路东(南)", "未央路东(北)", "未央路西", "西二环内", "东二环内", "南二环内", "北二环内", "城墙内(东)","城墙内(西)", "西二环外","三桥(南)", "三桥(北)","高新南", "长安韦曲","长安郭社", "长安航天","蓝田", "高陵","周至", "户县","临潼", "阎良"],
    riskisShow:true,
    secondPagedetails:false,
    casemode:"整案损失超5000",
    casemodes: ["请选择案件类型","整案损失5000以内(纯车物)", "整案损失5000以内(纯车物视频定损)", "整案损失超5000","整案损失超5000(视频定损)","含人伤现场查勘","人伤一案到底","已勘销案"],
    casemodevalue:[2],
    itareas:["请选择区域","东郊","西郊","北郊","南郊"],
    itarea1:"西郊",
    itareavalue:[1],
    itareaform:true,
    classify:0,
    paiworer: false,
    anjianhao: false,
    chepaihao: false,
    chengbaojigou: false,
    baodanhao: false,
    beizhu: false,
    startYear: 2010,
    endYear: 2050,
    dateTimeArray1: null,
    index3:0,
    fir_date:true,
    sec_date:true,
    index2:0,
    index4:0
  },

  bindMultiPickerChange:function(e){

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange:function(e){

    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    data.multiIndex[e.detail.column] = e.detail.value;

    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {

          case 0:
            data.multiArray[1] = ["区域"];

            break;

          case 1:
            data.multiArray[1] = ["未央路东(南)", "未央路东(北)", "未央路西", "西二环内", "东二环内", "南二环内", "北二环内", "城墙内(东)", "城墙内(西)", "西二环外", "三桥(南)", "三桥(北)", "高新南"];
            break;
          case 2:
            data.multiArray[1] = ["长安韦曲", "长安郭社", "长安航天", "蓝田", "高陵", "周至", "户县", "临潼", "阎良"];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        
        break;
      
    }

    this.setData(data);

    this.setData({
      areacolor1:"black",
      allOver: false
    })

  },

  bindMultiPickerChange1: function (e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex1: e.detail.value
    })
  },

  bindMultiPickerColumnChange1: function (e) {

    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray1: this.data.multiArray1,
      multiIndex1: this.data.multiIndex1
    };

    data.multiIndex1[e.detail.column] = e.detail.value;

    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex1[0]) {
          case 0:
            data.multiArray1[1] = ["派工时间段"];
            break;
          case 1:
            data.multiArray1[1] = ["07:00-18:00"];
            break;
          case 2:
            data.multiArray1[1] = ["18:00-21:00"];
            break;
          case 3:
            data.multiArray1[1] = ["21:00-07:00"];
            break;
        }
        data.multiIndex1[1] = 0;
        data.multiIndex1[2] = 0;
        break;

    }

    this.setData(data);

    this.setData({

      sendcolor:"black",
      allOver: false

    })

  },

  paiworker:function(){
    this.setData({
      paiworkererror: "black",
      surveyor1:""
    })
  },

  casefocus:function(){

      this.setData({
        baoanerror: "black",
        caseInfor: [{
          numberId: '',
          // carId: this.data.carId
          carId: this.data.caseInfor[0].carId
        }],
        allOver: false
      })
    
  },

  caridfocus:function(){

    this.setData({
      cariderror: "black",
      caseInfor: [{
        numberId: this.data.caseInfor[0].numberId,
        carId: ''      
      }],
      allOver: false
    })
  },


  chuxianfocus:function(){

    this.setData({
      chuxiancolor: "black",
      title:'',
      allOver: false
    })
  },

  chuxianblur: function (e) {

    this.data.title = e.detail.value

    console.log("$$$$###" + this.data.title)
  },

  caseblur:function(e){
    
    this.data.caseInfor[0].numberId = e.detail.value

    console.log("$$$$" + this.data.caseInfor[0].numberId)
  },

  caridblur:function(e){
    this.data.caseInfor[0].carId = e.detail.value
  },

  itareaisShow:function(){

    this.setData({
      itareaform:false,
      background:"#ccc",
      paiworer: true,
      anjianhao: true,
      chepaihao: true,
      chengbaojigou: true,
      baodanhao: true,
      beizhu: true
    })
  },

  itareacancel:function(){

    this.setData({
      itareaform: true,
      background: "white",
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
  },

  itareasure:function(){

    this.setData({
      itareaform: true,
      background: "white",
      itarea1: this.data.itarea1,
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
  },

  bindChangeitarea:function(event){

    const val = event.detail.value;
    // this.data.itarea1 = this.data.itareas[val[0]];
    this.setData({
      index3:val,
      areacolor:"black",
      allOver: false
    })

  },

  caseisShow:function(){

    this.setData({
      caseform: false,
      background: "#ccc",
      paiworer: true,
      anjianhao: true,
      chepaihao: true,
      chengbaojigou: true,
      baodanhao: true,
      beizhu: true
    })
    
  },

  casecancel:function(){

    this.setData({
      caseform: true,
      background: "white",
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
    
  },



  casesure:function(){

  this.setData({
    caseform: true,
    background: "white",
    casemode: this.data.casemode,
    paiworer: false,
    anjianhao: false,
    chepaihao: false,
    chengbaojigou: false,
    baodanhao: false,
    beizhu: false

  })
    
  },

  bindChangecase:function(event){
    const val = event.detail.value;
    
    this.setData({
      index4:val,
      anjiancolor:"black",
      allOver: false
    })
  },


  risk:function(){

    var that = this;

    wx.navigateTo({
      url: '../checkLocation/checkLoation',
    })
   
 },

  areaisShow:function(){

    this.setData({
      areaisShow:false,
      background:"#ccc",
      paiworer: true,
      anjianhao: true,
      chepaihao: true,
      chengbaojigou: true,
      baodanhao: true,
      beizhu: true
    })
  },

  areacancel:function(){
    this.setData({
      areaisShow: true,
      background: "white",
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
  },

  periodisShow:function(){

    this.setData({
      periodisShow: false,
      background: "#ccc",
      paiworer: true,
      anjianhao: true,
      chepaihao: true,
      chengbaojigou: true,
      baodanhao: true,
      beizhu: true
    })
  },

  periodcancel:function(){

    this.setData({
      periodisShow: true,
      background: "white",
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
  },


  jobtimeisShow:function(){

    this.setData({
      job: false,
      background: "#ccc",
      paiworer: true,
      anjianhao: true,
      chepaihao: true,
      chengbaojigou: true,
      baodanhao: true,
      beizhu: true
    })
  },

  jobcancel:function(){

    this.setData({
      job: true,
      background: "white",
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
  },

  dateisShow:function(){
    this.setData({
      dateisShow:false,
      background:"#ccc",
      paiworer: true,
      anjianhao: true,
      chepaihao: true,
      chengbaojigou: true,
      baodanhao: true,
      beizhu: true
    })
  },

  taskisShow:function(){
    this.setData({
      task: false,
      background: "#ccc",
      paiworer: true,
      anjianhao: true,
      chepaihao: true,
      chengbaojigou: true,
      baodanhao: true,
      beizhu: true
    })
  },

  taskcancel:function(){
    this.setData({
      task:true,
      background: "white",
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
  },

  timecancel:function(){

    this.setData({
      dateisShow: true,
      background: "white",
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
  },

  decrease_third: function () {
    if (this.data.third_num == 10) {
      this.setData({
        third_num: -1
      })
    } else if (this.data.third_num == -1) {
      return
    } else {
      this.data.third_num++
      this.setData({
        third_num: this.data.third_num
      })
    }
  },

  addThird: function () {
    console.log(999)
    if (this.data.third_num == -1) {
      this.setData({
        third_num: 10
      })
    } else if (this.data.third_num == 1) {
      console.log(this.data.third_num)
      return
    } else {
      this.data.third_num--
      this.setData({
        third_num: this.data.third_num
      })
    }
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },


  _onload:function(){

    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {

        that.data.latitude = res.latitude; //纬度
        that.data.longitude = res.longitude; //经度

        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {

            console.log("ddd" + JSON.stringify(res));

            wx.setStorageSync('location', res.result.address);
            var localTion = wx.getStorageSync('location');
            that.data.locationAdress = localTion;

            //要截取字段的字符串
            console.log("&&&&" + localTion.substring(0, 30));

            that.setData({
              title: localTion.substring(0, 30)
            })
            console.log(that.data.locationAdress)
          },
          fail: function (res) {
            console.log(res);
          },

        });

      },
    })
  },

  _time:function(){

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    })


  },

  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },

  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr
    });
  },

  onLoad:function(options){

    var that = this;
    that.data.sessionId = wx.getStorageSync('PHPSESSID')
    that.data.serviceId = parseInt(wx.getStorageSync('serviceId')) 
    if (that.data.serviceId==3813){
      that.setData({
        hasMoney:true
      })
    }

    that._onload();
    that._time();

    var iphoneReg = /iPhone X/
    if (getApp().globalData.mobileType.match(iphoneReg)) {
      that.setData({
        paddingTop: '140px',
        back_cell: 'back_cellX',
        title_cell: 'title_cellX',
        titTop: '90px',
        container: 'containerX',
      })
    }
    
    // wx.getSystemInfo({
      
    //   success: function(res) {
    //     console.log(res.windowWidth);
    //     if (res.windowWidth >= 375 && res.windowHeight>=812){
    //       that.setData({
    //         hightvalue:"30%"
    //       })
    //     }else{
    //       that.setData({
    //         hightvalue: "36%"
    //       })
    //     }
    //   },
    // })

    // addcheckloss.reqAddress((res)=>{
    // });

  },
  writing: function() {
    this.setData({
      tip: false
    })
  },

  radioChage1:function(e){

    var that = this

    if(e.detail.value == 1){

      that.data.classify = 2;
    }else{
      that.data.classify = 1;
    }

    console.log("type"+that.data.classify);
  },

  radioChage: function(e) {
    console.log(e.detail.value)
  
    if (e.detail.value == 1) {
      this.setData({
        isdamageShow: false,
        classify:1,
        ifdamage:true
      })
    } else {

      this.data.classify = 0;
      this.setData({
        isdamageShow: true
      })
    }

    console.log("tt"+this.data.classify);
  },
  tosecondPagere: function() {

    var that = this
    that.data.userName = wx.getStorageSync('userName'),
    that.data.usernumber = wx.getStorageSync('job_no'),

    this.setData({
      secondPage: true,
      firstPage: false
    })




    //获取系统所有保险公司
    wx.request({
      url: test + 'task/index/systemInsurance',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      success: function(res) {

        console.log("%%"+JSON.stringify(res))

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
            arrayObject: res.data.insurance,
            array: []
          })
          for (var i in that.data.arrayObject) {
            that.data.array.push(that.data.arrayObject[i].name)
          }

          console.log("$$$##" + JSON.stringify(that.data.arrayObject))
          console.log("$$$"+JSON.stringify(that.data.array))

          that.data.insuranceId = that.data.arrayObject[0].id;

          that.setData({
            index1: 0,
            array: that.data.array,
            insuranceId: that.data.arrayObject[0].id,
            istaskvalue:false,
            pingandate:true,
            taipingdate:true,
            taipingcase:true,
            pinganarea:true,
            pinganperiod:true,
            itarea:false,
            itWarranty: false,
            itagency: false,
            numberplate:false,
            jobnumber: true,
            riskdamage:true,
            sendworkers:false,
            sendtime:false,
            //侦察员name
            surveyor: that.data.userName,
            usernumber:that.data.usernumber,
            surveyor1: that.data.userName,
          })
        }
      }
    })
  },

  bindChangedate:function(event){

    console.log(JSON.stringify(event));
    const val = event.detail.value;
    // this.data.year = this.data.years[val[0]];
    // this.data.month = this.data.months[val[1]];
    // this.data.day = this.data.days[val[2]];
    this.setData({
      fir_date:false,
      date: val
    })
  },

  bindChangedate1: function (event) {

    console.log(JSON.stringify(event));
    const val = event.detail.value;
    
    this.setData({
      sec_date: false,
      date1: val
    })
  },


  bindChangetask:function(event){

    console.log("3333"+JSON.stringify(event));
    const val = event.detail.value;
    // this.data.taskmode = this.data.taskmodes[val[0]];
    this.setData({
      index2:val,
      taskcolor:"black",
      allOver:false
    })

  },

  bindChangetask1: function (event) {

    console.log(JSON.stringify(event));
    const val = event.detail.value;
    // this.data.taskmode1 = this.data.taskmodes1[val[0]];
    this.setData({
      taskvalue1: val,
      taskcolor: "black",
      allOver: false
    })
  },

  bindChangetime:function(event){

    const val = event.detail.value;
    this.data.year1 = this.data.years[val[0]];
    this.data.month1 = this.data.months[val[1]];
    this.data.day1 = this.data.days[val[2]];
    this.data.hour = this.data.hours[val[3]];
    this.data.min = this.data.mins[val[4]];

  },

  bindChangearea:function(event){

    const val = event.detail.value;
    this.data.urbanarea = this.data.areas[val[0]];
    this.data.roadsection = this.data.roadsections[val[1]]
  },

  bindChangeperiod:function(event){

    const val = event.detail.value;
    this.data.periodarea = this.data.periodareas[val[0]];
    this.data.period = this.data.periods[val[1]];
  },

  periodsure:function(){

    this.setData({
      periodarea: this.data.periodarea,
      period: this.data.period,
      periodisShow: true,
      background: "white",
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
      
    })
  },

  areasure:function(){
    this.setData({
      areaisShow: true,
      background: "white",
      urbanarea: this.data.urbanarea,
      roadsection:this.data.roadsection,
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
  },

  jobsure:function(){
    this.setData({

      job: true,
      background: "white",
      year1: this.data.year1,
      month1: this.data.month1,
      day1:this.data.day1,
      hour:this.data.hour,
      min:this.data.min,
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
  },

  tasksure:function(){

    this.setData({
      task: true,
      background: "white",
      taskmode: this.data.taskmode,
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
  },

  tasksure1: function () {

    this.setData({
      task: true,
      background: "white",
      taskmode1: this.data.taskmode1,
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
  },

  timesure:function(){

    this.setData({
      dateisShow: true,
      background: "white",
      year: this.data.year,
      month: this.data.month,
      day: this.data.day,
      paiworer: false,
      anjianhao: false,
      chepaihao: false,
      chengbaojigou: false,
      baodanhao: false,
      beizhu: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  toAllotP: function() {
    wx.navigateTo({
      url: '../../allot/allot?special=100&&module=' + this.data.detailId + '&moduleis=9',
    })
  },
  back: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  submitCheck: function(e) {

    console.log();

    var that = this     
    console.log(e);

    var temp_third = [];
    if (that.data.third_num == -1) {
      
    } else {

      if (e.detail.value.car1 || e.detail.value.mobile1) {
        temp_third.push({ phone: e.detail.value.mobile1, car_no: e.detail.value.car1 })
      }
      if (e.detail.value.car2 || e.detail.value.mobile2) {
        temp_third.push({ phone: e.detail.value.mobile2, car_no: e.detail.value.car2 })
      }
      if (e.detail.value.car3 || e.detail.value.mobile3) {
        temp_third.push({ phone: e.detail.value.mobile3, car_no: e.detail.value.car3 })
      }
      if (e.detail.value.car4 || e.detail.value.mobile4) {
        temp_third.push({ phone: e.detail.value.mobile4, car_no: e.detail.value.car4 })
      }
      if (e.detail.value.car5 || e.detail.value.mobile5) {
        temp_third.push({ phone: e.detail.value.mobile5, car_no: e.detail.value.car5 })
      }
      if (e.detail.value.car6 || e.detail.value.mobile6) {
        temp_third.push({ phone: e.detail.value.mobile6, car_no: e.detail.value.car6 })
      }
      if (e.detail.value.car7 || e.detail.value.mobile7) {
        temp_third.push({ phone: e.detail.value.mobile7, car_no: e.detail.value.car7 })
      }
      if (e.detail.value.car8 || e.detail.value.mobile8) {
        temp_third.push({ phone: e.detail.value.mobile8, car_no: e.detail.value.car8 })
      }
      if (e.detail.value.car9 || e.detail.value.mobile9) {
        temp_third.push({ phone: e.detail.value.mobile9, car_no: e.detail.value.car9 })
      }
      if (e.detail.value.car10 || e.detail.value.mobile10) {
        temp_third.push({ phone: e.detail.value.mobile10, car_no: e.detail.value.car10 })
      }
      console.log(temp_third)


      temp_third = JSON.stringify(temp_third);

    }

    
    var that = this;

    // if (e.detail.value.casePerson == '') {
    //   that.setData({
    //     casePersonErr: true
    //   })
    //   return
    // }



    // if (e.detail.value.caseMobile == '') {
    //   that.setData({
    //     caseMobileErr: true
    //   })
    //   return
    // }
    // var reg = /^1[3456789]\d{9}$/;
    // if (reg.test(e.detail.value.caseMobile)) {
    //   console.log('ok')
    // } else {
    //   that.setData({
    //     caseMobileErr: true
    //   })
    //   return
    // }
    var moneyTemp=0
    if (this.data.serviceId == 3813){
      if (e.detail.value.money == ''){
          that.setData({
            moneyErr:true
          })
          return
      }else{
        if (e.detail.value.money<1000){
          that.setData({
            moneyErr: true
          })
          return
        }else{
          moneyTemp = e.detail.value.money
        }
      }
    }else{
      moneyTemp=0
    }
  
    that.setData({
      allOver: true
    })
    console.log(that.data.insuranceId)

    var test = getApp().globalData.hostName;
   
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = that.data.userId;
    var session_id = that.data.sessionId;
    
    
    wx.showNavigationBarLoading() //在标题栏中显示加载


    var insurance_id = that.data.insuranceId; //保险公司id

    console.log("^^^^^^^^^^^^^^^^^^^^^" + insurance_id);

    var report_no = e.detail.value.report_no; //报案号
    
    // var type = e.detail.value.classify;  //类型 （0：查勘，1：三责，2：标的）
    var type = that.data.classify; 
    var remark = that.data.shortInfor1 ? that.data.shortInfor1 : '';  //备注
    // var sanze = temp_third;  //三者信息
    var task_type;
    var survey_date;
    var report_date;
    var send_date;
    var survey_address;
    var are;
    var send_time;
    var case_type;
    var send_user;
    var policy_no;
    var ins_org;
    var car_no;

    if (insurance_id == 3){ 


      if (e.detail.value.report_no == '' || e.detail.value.report_no == '!案件号不能为空')      {

        that.setData({
          baoanerror: "red",
          caseInfor: [{
            numberId: '!案件号不能为空'
          }]
        })
        return
      }
      if (e.detail.value.carId == "" ||  e.detail.value.carId == "!车牌号不能为空"){
        that.setData({
          caseInfor: [{
            carId: '!车牌号不能为空',
            numberId: e.detail.value.report_no
          }],
          cariderror:"red"
        })
        return
      }

      if (that.data.taskmodes[that.data.index2] == "请选择任务类型") {
        that.setData({
          taskcolor: "red"
        })
        return

      } else if (e.detail.value.chuxian == "" || e.detail.value.chuxian == '!出险地点不能为空') {
        that.setData({
          chuxiancolor: "red",
          title:"!出险地点不能为空"
        })
        return

      } else if (that.data.multiArray[0][that.data.multiIndex[0]] == "选择"){

        that.setData({
          // caseInfor: [{
          //   carId: '!任务类型不能为空',
          //   numberId: e.detail.value.report_no
          // }],
          areacolor1: "red"
        })
        return
      } else if (that.data.multiArray1[0][that.data.multiIndex1[0]] == "选择"){

        that.setData({
          sendcolor: "red"
        })
        return
      }
      
      //任务类型
      task_type = that.data.taskmodes[that.data.index2];
      
      if (that.data.fir_date){
        survey_date = that.data.year + "-" + that.data.month + "-" + that.data.day; //查勘日期
      }else{
        survey_date = that.data.date; //查勘日期
      } 
      report_date = ""; //报案时间

    var year = that.data.dateTimeArray1[0][that.data.dateTime1[0]];
    var month = that.data.dateTimeArray1[1][that.data.dateTime1[1]];
    var day = that.data.dateTimeArray1[2][that.data.dateTime1[2]];
    var hour = that.data.dateTimeArray1[3][that.data.dateTime1[3]];
    var min = that.data.dateTimeArray1[4][that.data.dateTime1[4]];
    
      send_time = year + "-" + month + "-" + day + " " + hour + ":" + min; //派工时间
      survey_address = that.data.title + "-" + that.data.longitude + "," + that.data.latitude ;  //出险/定损地点  

      are = that.data.multiArray[0][that.data.multiIndex[0]] + " " + that.data.multiArray[1][that.data.multiIndex[1]]; //区域

      send_date = that.data.multiArray1[0][that.data.multiIndex1[0]] + " " + that.data.multiArray1[1][that.data.multiIndex1[1]]; //派工时间段
       case_type="";   //案件类型
       send_user = "";  //派工人
       policy_no =""; //保单号
       ins_org = ""; //承保机构
       car_no = e.detail.value.carId; //车牌号
 
    } else if (insurance_id == 8){

      console.log("###########");

      if (e.detail.value.report_no == '' || e.detail.value.report_no == '!案件号不能为空') {

        that.setData({
          baoanerror: "red",
          caseInfor: [{
            numberId: '!案件号不能为空'
          }]
        })
        return
      }
      if (e.detail.value.carId == "" || e.detail.value.carId == "!车牌号不能为空") {
        that.setData({
          caseInfor: [{
            carId: '!车牌号不能为空',
            numberId: e.detail.value.report_no
          }],
          cariderror: "red"
        })
        return
      } else if (that.data.taskmodes1[that.data.taskvalue1] == "请选择任务类型"){

        that.setData({
          taskvalue1: that.data.taskvalue1,
          taskcolor: "red"
        })

        return
      } else if (e.detail.value.chuxian == "" || e.detail.value.chuxian == '!出险地点不能为空') {
        that.setData({
          chuxiancolor: "red",
          title: "!出险地点不能为空"
        })
        return

      }else if (that.data.casemodes[that.data.index4] == "请选择案件类型"){

        that.setData({
          // index3: that.data.index3,
          anjiancolor: "red"
        })

        return
      }
      

      console.log("$$$$$$$$$$$$$$");
        //任务类型
       task_type = that.data.taskmodes1[that.data.taskvalue1];
       //报案时间
       if (that.data.sec_date){
        report_date = that.data.year + "-" + that.data.month + "-" + that.data.day;
       }else{
        report_date = that.data.date1
       }
       
       survey_date = "";
       survey_address = that.data.title + "-" + that.data.longitude + "," + that.data.latitude;  //出险/定损地点 
       send_date = "";
       are ="";
       send_time="";
       //案件类型
       case_type = that.data.casemodes[that.data.index4]; 
       send_user="";
       policy_no = ""; //保单号
       ins_org = ""; //承保机构
       car_no = e.detail.value.carId; //车牌号

    }else{

      console.log("^&***"+e.detail.value.sendusername);
      if (e.detail.value.sendusername == "" || e.detail.value.sendusername == '!派工人不能为空') {
        that.setData({
          surveyor1: "!派工人不能为空",
          paiworkererror: "red"
        })
        return
      }

      if (e.detail.value.report_no == '' || e.detail.value.report_no == '!案件号不能为空') {
        
        that.setData({
          baoanerror:"red",
          caseInfor: [{
            numberId: '!案件号不能为空'
          }]
        })
        return
      } else if (e.detail.value.carId == "" || e.detail.value.carId == "!车牌号不能为空") {
        that.setData({
          caseInfor: [{
            carId: '!车牌号不能为空',
            numberId: e.detail.value.report_no
          }],
          cariderror: "red"
        })
        return
      }else if (that.data.taskmodes1[that.data.taskvalue1] == "请选择任务类型") {

        that.setData({
          taskvalue1: that.data.taskvalue1,
          taskcolor: "red"
        })

        return

      } else if (that.data.itareas[that.data.index3] == "请选择区域"){

        that.setData({
          index3: that.data.index3,
          areacolor: "red"
        })

        return

      } 

       task_type = that.data.taskmodes1[that.data.taskvalue1];
       send_user = e.detail.value.sendusername;

       //区域
       are = that.data.itareas[that.data.index3];

       policy_no = e.detail.value.warrantyId;
       ins_org = e.detail.value.agencyId;
       car_no = e.detail.value.carId; //车牌号
       report_date ="";
       case_type ="";
      var year = that.data.dateTimeArray1[0][that.data.dateTime1[0]];
      var month = that.data.dateTimeArray1[1][that.data.dateTime1[1]];
      var day = that.data.dateTimeArray1[2][that.data.dateTime1[2]];
      var hour = that.data.dateTimeArray1[3][that.data.dateTime1[3]];
      var min = that.data.dateTimeArray1[4][that.data.dateTime1[4]];

       send_time = year + "-" + month + "-" + day + " " + hour + ":" + min; //派工时间
       send_date = "";
       survey_address="";
      survey_date=""
    }

    addcheckloss.addCheckinfo(insurance_id, report_no, type, remark, task_type, survey_date, send_user, report_date, send_date, survey_address, are, send_time, case_type, policy_no, ins_org, car_no,(res)=>{

      console.log("^&^^^" + JSON.stringify(res))
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
          title: "添加成功",
          duration: 500
        })

        wx.redirectTo({
          url: '../checkLossDeatail/checkLossDeatail?listId=' + res.data.id,
        })
      } else if (res.data.status == -1){

        wx.showModal({
          title: '该案件已存在',
          content: '',
        })
        that.setData({
          allOver: false
        })

       
      } else if (res.data.status == -2){

        that.setData({
          allOver: false
        })
        wx.showToast({
          title: "没有权限"
        })
      }else if(res.data.status == -3){
       
        that.setData({
          allOver: false
        })
        wx.showToast({
          title: "金豆余额不足"
        })
      } else if (res.data.status == -4){
        that.setData({
          allOver: false
        })
        wx.showToast({
          title: "添加失败"
        })
      } else if (res.data.status == -5){
        that.setData({
          allOver: false
        })
        wx.showToast({
          title: "操作超时"
        })
      } else if (res.data.status == 0){
        that.setData({
          allOver: false
        })
        wx.showToast({
          title: "用户没登录"
        })
      }

    });


    // wx.request({
    //   url: test + 'task/survey/add',
    //   method: 'POST',
    //   data: {

    //     insurance_id: that.data.insuranceId, //保险公司id
    //     report_no: e.detail.value.report_no, //报案号
    //     car_no: e.detail.value.carId, //车牌
    //     send_user:e.detail.value.sendusername, //派工人
    //     type: e.detail.value.classify,  //类型 （0：查勘，1：三责，2：标的）
    //     // recognizee: e.detail.value.casePerson, 车主姓名
    //     // mobile: e.detail.value.caseMobile,
    //     remark: that.data.shortInfor1 ? that.data.shortInfor1:'',  //备注
    //     // money: moneyTemp, //预估金额
    //     sanze: temp_third,   //三者信息
        
    //   },
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Cookie': 'PHPSESSID=' + this.data.sessionId
    //   },
    //   success: function(res) {
    //     console.log("^&^^^" + JSON.stringify(res))
    //     var dataType = typeof res.data
    //     console.log(dataType)
    //     if (dataType == 'string') {
    //       var jsonStr = res.data;
    //       jsonStr = jsonStr.replace(" ", "");
    //       var temp
    //       if (typeof jsonStr != 'object') {
    //         jsonStr = jsonStr.replace(/\ufeff/g, ""); //重点
    //         temp = JSON.parse(jsonStr);
    //         res.data = temp;
    //       }
    //     }

    //     if (res.data.status == 1) {
    //       wx.showToast({
    //         title: "添加成功",
    //         duration: 500
    //       })
    //       wx.redirectTo({
    //        url: '../checkLossDeatail/checkLossDeatail?listId=' + res.data.id,
    //      })
    //     } else if (res.data.msg == '金豆余额不足') {
    //       wx.showModal({
    //         title: '金豆余额不足',
    //         content: '',
    //       })
    //       that.setData({
    //         allOver: false
    //       })
    //     } else if (res.data.msg == '该案件已添加,请勿重复添加') {
    //       wx.showModal({
    //         title: '该案件已添加,请勿重复添加',
    //         content: '',
    //       })
    //       that.setData({
    //         allOver: false
    //       })
    //     } else {
    //       that.setData({
    //         allOver: false
    //       })
    //       wx.showToast({
    //         title: "添加失败"
    //       })
    //     }


    //   },
    //   complete: function() {
    //     // complete
    //     wx.hideNavigationBarLoading() //完成停止加载
    //     wx.stopPullDownRefresh() //停止下拉刷新
    //   }
    // })



  },

  cancelRed: function(e) {
    var that = this;
    console.log("ffff"+JSON.stringify(e));
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
    } else if (e.currentTarget.id == 'money') {
      that.setData({
        moneyErr: false
      })
    }
  },
  bindPickerChange: function(e) {
    var that = this
    for (var i in that.data.arrayObject) {
      if (that.data.arrayObject[i].name == that.data.array[e.detail.value]) {
        that.setData({
          insuranceId: that.data.arrayObject[i].id
        })
      }
    }
    console.log("^^^^"+JSON.stringify(that.data.insuranceId))

    // that.data.insuranceId = that.data.arrayObject[i].id;

    if (that.data.insuranceId == 3){  //平安

      console.log("#####");
      that.setData({
        index1: e.detail.value,
        istaskvalue: true,
        pingandate:false,
        taipingdate: true,
        taipingcase: true,
        itarea:true,
        itWarranty: true,
        itagency: true,
        numberplate:false,
        jobnumber: false,
        riskdamage: false,
        sendworkers:true,
        pinganarea: false,
        pinganperiod: false,
        sendtime:false,
        caseInfor: [{
          numberId: '',
          carId: '',
          casePerson: '',
          casePhone: ''
        }]

      })
    }else if(that.data.insuranceId == 8){  //太平
      that.setData({
        index1: e.detail.value,
        istaskvalue: false,
        pingandate:true,
        taipingdate:false,
        taipingcase:false,
        itarea:true,
        itWarranty: true,
        itagency: true,
        numberplate: false,
        jobnumber: false,
        riskdamage: false,
        sendworkers:true,
        pinganarea: true,
        pinganperiod: true,
        sendtime:true,
        caseInfor: [{
          numberId: '',
          carId: '',
          casePerson: '',
          casePhone: ''
        }]
      })

    }else{

      that.setData({
        index1: e.detail.value,
        istaskvalue: false,
        pingandate:true,
        taipingdate: true,
        taipingcase: true,
        itarea:false,
        itWarranty:false,
        itagency:false,
        numberplate: false,
        jobnumber: true, 
        riskdamage: true,
        sendworkers:false,
        pinganarea: true,
        pinganperiod: true,
        sendtime:false,
        caseInfor: [{
          numberId: '',
          carId: '',
          casePerson: '',
          casePhone: ''
        }]
      })
    }


    

  },
  onShow: function() {
    var that = this
    
    var latitude = that.data.latitude;
    var longitude = that.data.longitude;
    var title = that.data.title;

    console.log("EEEEEEEE" + latitude + longitude + title)

    if (typeof (title) != 'undefined'){

      that.setData({
        title:title.substring(0,16),
        chuxiancolor:'black'
      })
    }

    if (parseInt(that.data.month)<10){
      that.setData({
        month:"0"+that.data.month
      })
    }

    if (parseInt(that.data.day) < 10){
      that.setData({
        day: "0" + that.data.day
      })
    }
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onShow()
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
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

  },

  beizhu:function(){
    this.setData({
      focus:true
    })
  },

  analyze: function(e) {
    var that = this;

    that.data.userName = wx.getStorageSync('userName'),
    that.data.usernumber = wx.getStorageSync('job_no'),

    console.log("####"+JSON.stringify(e));
    if (e.detail.value.infor == '') {
      that.setData({
        tip: true
      })
      return
    }
    that.setData({
      shortInfor1: e.detail.value.infor,
      surveyor: that.data.userName,
      surveyor1: that.data.userName,
      usernumber: that.data.usernumber
    })

    e.detail.value.infor += '【永安保险】'


    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;


    wx.request({
      url: test + 'task/index/systemInsurance',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      success: function(res) {
        console.log("%%%%%%%%%%%%%%%"+res)
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
            arrayObject: res.data.insurance,
            array: []
          })


          for (var i in that.data.arrayObject) {
            that.data.array.push(that.data.arrayObject[i].name)
          }

          that.setData({
            array: that.data.array
          })


          console.log("***++"+e.detail.value.infor);
          //正则匹配 含有【】
          var regg = /【[\u4e00-\u9fa5]{2,}】/
          if (e.detail.value.infor.match(regg)) {
            var companySpecial = e.detail.value.infor.match(regg)[0]    // 获取一个【】元素       
            var companyNameReg = /[\u4e00-\u9fa5]{2,}/

            console.log("%%%%%" + companySpecial+companySpecial.match(companyNameReg)[0]);
            if (companySpecial.match(companyNameReg)[0]) {

              console.log("*****&&&&&&");
              var shortInforData = e.detail.value.infor
              console.log(companySpecial.match(companyNameReg)[0])
              that.setData({
                companyed: companySpecial.match(companyNameReg)[0],

              })
              if (that.data.companyed == '平安产险') {
                that.data.companyed = '中国平安'
              }

              console.log(that.data.arrayObject)
              for (var j in that.data.arrayObject) {
                console.log(j)
                if (that.data.arrayObject[j].name == that.data.companyed) {
                  var aa = that.data.arrayObject[j].id
                  console.log(aa)
                  that.setData({
                    insuranceId: aa
                  })
                  console.log(that.data.insuranceId)
                  if (that.data.insuranceId == "3"){

                    that.setData({
                      istaskvalue: true,
                      pingandate: false,
                      taipingdate: true,
                      taipingcase: true,
                      itarea: true,
                      itWarranty: true,
                      itagency: true,
                      numberplate: false,
                      jobnumber: false,
                      riskdamage: false,
                      sendworkers: true,
                      pinganarea: false,
                      pinganperiod: false,
                      sendtime: false
                    })

                  } else if (that.data.insuranceId == "8"){

                    that.setData({
                      istaskvalue: false,
                      pingandate: true,
                      taipingdate: false,
                      taipingcase: false,
                      itarea: true,
                      itWarranty: true,
                      itagency: true,
                      numberplate: false,
                      jobnumber: false,
                      riskdamage: false,
                      sendworkers: true,
                      pinganarea: true,
                      pinganperiod: true,
                      sendtime: true
                    })

                  }else{
                    
                    that.setData({
                      istaskvalue: false,
                      pingandate: true,
                      taipingdate: true,
                      taipingcase: true,
                      itarea: false,
                      itWarranty: false,
                      itagency: false,
                      numberplate: false,
                      jobnumber: true,
                      riskdamage: true,
                      sendworkers: false,
                      pinganarea: true,
                      pinganperiod: true,
                      sendtime: false
                    })
                  }
                  console.log("^^^^^^" + that.data.array);
                  for (var t in that.data.array) {
                    if (that.data.array[t] == that.data.companyed) {
                      console.log(that.data.array[t])
                      console.log(t)
                      that.setData({
                        index1: t
                      })
                      console.log(that.data.index1)
                    }
                  }
                }
              }
              console.log('kkkk')
              console.log(that.data.companyed)

              var lossreg = /查勘/;
              var ifdamage1 = /标的/;
              var ifdamage2 = /三责/;

              if (shortInforData.match(ifdamage1)) {

                that.setData({
                  ifLoss: true,
                  ifdamage: false,
                  isdamageShow: false
                })
              } else if (shortInforData.match(lossreg)) {
                that.setData({
                  ifLoss: false,
                  isdamageShow: true
                })
              } else if (shortInforData.match(ifdamage2)) {
                that.setData({
                  ifLoss: true,
                  ifdamage: true,
                  isdamageShow: false
                })
              }

            } else {
              that.setData({
                companyed: '其他',
                shortInfor1: shortInforData,
              })
            }
          } else {
            console.log('解析不出来保险公司名字')
            var shortInforData = e.detail.value.infor
            that.setData({
              shortInfor1: shortInforData,
            })

          }
          console.log(that.data.arrayObject)
          console.log(that.data.array)

          // var carPatt = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/i;

          var carPatt = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/i;
          if (that.data.companyed == '鼎和保险') {
            var patt1 = /报案号(\d+).(\d+)/i;
            if (shortInforData.match(patt1)) {
              console.log("()()()"+shortInforData.match(patt1))
              var caseCont = shortInforData.match(patt1);

              console.log(caseCont);
              var pattNum = /(\d+).(\d+)/
              if (caseCont[0].match(pattNum)) {
                var caseNum = caseCont[0].match(pattNum);
                console.log(caseNum[0]);
              } else {
                var caseNum = []
                caseNum[0] = ''
                console.log(caseNum[0])
              }
            } else {
              var caseNum = [];
              caseNum[0] = ''
              console.log(caseNum[0])
            }
            if (shortInforData.match(carPatt)) {
              var carCont = shortInforData.match(carPatt);
              console.log(carCont)
              var carNum = []
              carNum[0] = carCont[0]
            } else {
              var carNum = []
              carNum[0] = ''
              console.log('匹配不到鼎和保险的车牌号')
            }

            var pPatt = /被保险人[\u4e00-\u9fa5]{2,}/i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              console.log('保险人测试')
              console.log(pCont)
              var temp = pCont[0].slice(4)
              console.log(temp)
              var trueName = []
              trueName[0] = temp
            } else {
              var trueName = []
              trueName[0] = ''
              console.log('匹配不到鼎和保险的被保险人')
            }

            var mobileReg = /联系人[\u4e00-\u9fa5]{2,}1[345789]\d{9}/
            if (shortInforData.match(mobileReg)) {
              console.log('电话测试')
              var temp = shortInforData.match(mobileReg)
              var tempReg = /1[345789]\d{9}/
              if (temp[0].match(tempReg)) {
                var mobile = temp[0].match(tempReg)
              } else {
                var mobile = []
                mobile[0] = ''
                console.log('匹配不到鼎和保险的报案电话')
              }
            } else {
              var mobile = []
              mobile[0] = ''
              console.log('匹配不到鼎和保险的报案电话')
            }

          } else if (that.data.companyed == '中华保险') {
            var patt1 = /报案号\d+/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              var pattNum = /\d+/
              if (caseCont[0].match(pattNum)) {
                var caseNum = caseCont[0].match(pattNum);
                console.log(caseNum[0]);
              } else {
                var caseNum = []
                caseNum[0] = ''
                console.log('匹配不到中华保险的报案号')
              }
            } else {
              var caseNum = []
              caseNum[0] = ''
              console.log('匹配不到中华保险的报案号')
            }



            if (shortInforData.match(carPatt)) {
              var carNum = shortInforData.match(carPatt);
              console.log(carNum[0])

            } else {
              var carNum = []
              carNum[0] = ''
              console.log('匹配不到中华保险的车牌号')
            }
            var pPatt = /[\u4e00-\u9fa5]{2,}\d{11}/i;
            if (shortInforData.match(pPatt)) {
              var peopleTemp = shortInforData.match(pPatt)
              var peopleNameReg = /[\u4e00-\u9fa5]+/
              if (peopleTemp[0].match(peopleNameReg)) {
                var trueName = peopleTemp[0].match(peopleNameReg)
                console.log(trueName)
              } else {
                var trueName = [];
                trueName[0] = '';
              }

            } else {
              var trueName = [];
              trueName[0] = '';
            }
            var mobileReg = /\d{11}/
            if (shortInforData.match(mobileReg)) {
              console.log('电话测试')
              console.log(shortInforData.match(mobileReg))
              var mobile1 = shortInforData.match(mobileReg)
              var mobileReg1 = /\d{11}/
              if (mobile1[0].match(mobileReg1)) {
                var mobile = mobile1[0].match(mobileReg1)
              } else {
                var mobile = [];
                mobile[0] = ''
              }
            } else {
              var mobile = [];
              mobile[0] = ''
            }


            that.setData({
              index: 1
            })
          } else if (that.data.companyed == '渤海财险') {
            that.data.companyed = '渤海'
            that.setData({
              companyed: '渤海'
            })
            var patt1 = /报案号.\d+/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              var pattNum = /\d+/
              if (caseCont[0].match(pattNum)) {
                var caseNum = caseCont[0].match(pattNum);
                console.log(caseNum[0]);
              } else {
                var caseNum = []
                caseNum[0] = '';
                console.log('匹配不到渤海财险的报案号')
              }
            } else {
              var caseNum = []
              caseNum[0] = '';
              console.log('匹配不到渤海财险的报案号')
            }



            if (shortInforData.match(carPatt)) {
              var carNum = shortInforData.match(carPatt);
              console.log(carNum[0])

            } else {
              var carNum = []
              carNum[0] = ''
              console.log('匹配不到渤海的车牌号')
            }

            var pPatt = /被保人[\u4e00-\u9fa5]+/i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              console.log('测试')
              var test = pCont[0].slice(3)
              console.log(test)

              //被保人XXX
              var trueName = []
              trueName[0] = test
            } else {
              var trueName = []
              trueName[0] = ''
              console.log('匹配不到渤海财险的被保人')
            }
            var mobileReg = /.\b(\d{11}).\b/
            if (shortInforData.match(mobileReg)) {
              console.log('电话测试')
              console.log(shortInforData.match(mobileReg))
              var temp = shortInforData.match(mobileReg)
              console.log(temp[0])
              var tempReg = /\d{11}/
              if (temp[0].match(tempReg)) {
                console.log('第二次测试')
                console.log(temp[0].match(tempReg))
                var mobile = temp[0].match(tempReg)

              } else {
                var mobile = [];
                mobile[0] = ''
              }

            } else {
              var mobile = [];
              mobile[0] = ''
            }

          } else if (that.data.companyed == '中煤保险') {

            var patt1 = /报案号.\d+/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              var pattNum = /\d+/
              if (caseCont[0].match(pattNum)) {
                var caseNum = caseCont[0].match(pattNum);
              } else {
                var caseNum = []
                caseNum[0] = ''
                console.log('匹配不到中煤保险的报案号')
              }
            } else {
              var caseNum = []
              caseNum[0] = ''
              console.log('匹配不到中煤保险的报案号')
            }
            if (shortInforData.match(carPatt)) {
              var carCont = shortInforData.match(carPatt);
              console.log(carCont)
              var carNum = []
              carNum[0] = carCont[0]
            } else {
              var carNum = []
              carNum[0] = ''
              console.log('匹配不到中煤保险的车牌号')
            }
            var pPatt = /被保险人.[\u4e00-\u9fa5]+/i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              console.log(pCont)
              var pfPatt = /.[\u4e00-\u9fa5]+$/
              if (pCont[0].match(pfPatt)) {
                var personNum = pCont[0].match(pfPatt);
                var truePat = /[\u4e00-\u9fa5]+/;
                if (personNum[0].match(truePat)) {
                  var trueName = personNum[0].match(truePat)
                } else {
                  var trueName = []
                  trueName[0] = ''
                  console.log('匹配不到中煤保险的被保险人')
                }
              } else {
                var trueName = []
                trueName[0] = ''
                console.log('匹配不到中煤保险的被保险人')
              }
            } else {
              var trueName = []
              trueName[0] = ''
              console.log('匹配不到中煤保险的被保险人')
            }
            var mobilePatt = /报案电话.\d+/i;
            if (shortInforData.match(mobilePatt)) {
              var mobileCont = shortInforData.match(mobilePatt);
              console.log(mobileCont)
              var mpbilePattc = /\d+/
              if (mobileCont[0].match(mpbilePattc)) {
                var mobile = mobileCont[0].match(mpbilePattc);
                console.log(mobile[0]);
              } else {
                var mobile = []
                mobile[0] = ''
                console.log('匹配不到中煤保险的报案电话')
              }
            } else {
              var mobile = []
              mobile[0] = ''
              console.log('匹配不到中煤保险的报案电话')
            }


          } else if (that.data.companyed == '中国太平') {

            var patt1 = /.支付宝.\d+.\d+/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              console.log(caseCont)
              var caseNum = []
              caseNum[0] = caseCont[0].slice(5)
              console.log(caseNum[0])

            } else {
              var caseNum = []
              caseNum[0] = ''
              console.log('匹配不到中国太平的报案号')
            }
            

            if (shortInforData.match(carPatt)) {
              var carCont = shortInforData.match(carPatt);
              console.log(carCont)
              var carNum = []
              carNum[0] = carCont[0]
            } else {
              var carNum = []
              carNum[0] = ''
              console.log('匹配不到中国太平的车牌号')
            }

            var pPatt = /一般客户.[\u4e00-\u9fa5]+./i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              console.log(pCont)
              pCont[0] = pCont[0].slice(5)
              var chinesePat = /[\u4e00-\u9fa5]+/
              if (pCont[0].match(chinesePat)) {
                var trueName = []
                trueName[0] = pCont[0].match(chinesePat)[0]
              } else {
                var trueName = []
                trueName[0] = ''
                console.log('匹配不到中国太平的被保险人')
              }

            } else {
              var trueName = []
              trueName[0] = ''
              console.log('匹配不到中国太平的被保险人')
            }


            var mobilePatt = /1[3|4|5|8][0-9]\d{4,8}/i;
            if (shortInforData.match(mobilePatt)) {
              var mobileCont = shortInforData.match(mobilePatt);
              console.log(mobileCont)
              var mpbilePattc = /\d+/
              if (mobileCont[0].match(mpbilePattc)) {
                var mobile = mobileCont[0].match(mpbilePattc);
                console.log(mobile[0]);
              } else {
                var mobile = []
                mobile[0] = ''
                console.log('匹配不到中国太平的报案电话')
              }
            } else {
              var mobile = []
              mobile[0] = ''
              console.log('匹配不到中国太平的报案电话')
            }

            var address = /陕西.[\u4e00-\u9fa5\\-\a-zA-Z0-9]+/i;
            if (shortInforData.match(address)) {
              var caseCont = shortInforData.match(address);
              console.log("$$$$$$$$" + caseCont + caseCont[0]);
              // var addr = caseCont[0].substring(5);
              console.log(addr);
              that.setData({
                title: caseCont
              })

            } else {

              console.log('匹配不到太平的出险地址')
            }

          } else if (that.data.companyed == '中国平安' || that.data.companyed == '平安产险') {

            console.log("*******************");
            that.data.companyed = '中国平安'
            shortInforData = shortInforData.replace('【中国平安】', '')
            console.log("%%%%%"+shortInforData[0] +"____"+shortInforData)
            if (shortInforData[0] == '直') {
              console.log(shortInforData[0])
              var patt1 = /%(\w+)-(\w+)/i;
              if (shortInforData.match(patt1)) {
                console.log(shortInforData.match(patt1))
                var caseNum = shortInforData.match(patt1);
                caseNum[0] = caseNum[0].slice(1)
              } else {
                var caseNum = [];
                caseNum[0] = ''
                console.log(caseNum[0])
              }

              var pPatt = /被.[\u4e00-\u9fa5]{2,3}/i;
              if (shortInforData.match(pPatt)) {
                var pCont = shortInforData.match(pPatt);
                console.log('oooo')
                console.log(pCont[0])
                var trueNameTemp = pCont[0].slice(2)
                console.log(trueNameTemp)
                var trueName = []
                trueName[0] = trueNameTemp
              } else {
                var trueName = []
                trueName[0] = ''
                console.log('匹配不到中煤保险的被保险人')
              }
              var reCar = /.[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}.[出险地点|派工地点]/
              if (shortInforData.match(reCar)) {
                var pCont = shortInforData.match(reCar);
                console.log(pCont[0])
                var car_reg2 = /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}/
                if (pCont[0].match(car_reg2)) {
                  var carNum = pCont[0].match(car_reg2);
                  console.log(carNum[0])
                } else {
                  var carNum = []
                  carNum[0] = ''
                }

              } else {
                console.log('ddd')
                var reCar = /.[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}..出险地点/
                if (shortInforData.match(reCar)) {
                  var temp1 = shortInforData.match(reCar)[0].slice(1, 4)

                  var carNum = []
                  carNum[0] = temp1
                } else {
                  var carNum = []
                  carNum[0] = ''
                }
              }

              var address = /出险地点.[\u4e00-\u9fa5\\-]+/i; 
              if (shortInforData.match(address)) {
                var caseCont = shortInforData.match(address);
                console.log("$$$$$$$$"+caseCont+caseCont[0]);
                var addr = caseCont[0].substring(5);
                console.log(addr);
                that.setData({
                  title: addr.substring(0, 30)
                })
                
              } else {

                console.log('匹配不到平安的出险地址')
              }

            } else if (shortInforData[0] == '三') {

              console.log("3333333333333");
              var address = /陕西省.[\u4e00-\u9fa5\\-\a-zA-Z0-9]+/i;

              console.log(shortInforData.match(address));

              if (shortInforData.match(address)) {
                var add = shortInforData.match(address);
                console.log();
                that.setData({
                  title: add[0].substring(0, 30)
                })
              } else {

                console.log("没有解析出地理位置");
              }
              
              var patt1 = /报案号(\d+)/i;
              if (shortInforData.match(patt1)) {
                console.log(shortInforData.match(patt1))
                var caseNum = shortInforData.match(patt1);
                caseNum[0] = caseNum[0].slice(3)
                console.log(caseNum[0])
              } else {
                var caseNum = [];
                caseNum[0] = ''
                console.log(caseNum[0])
              }

              var pPatt = /联系人.[\u4e00-\u9fa5]{2,3}/i;
              if (shortInforData.match(pPatt)) {
                var pCont = shortInforData.match(pPatt);
                console.log(pCont[0])
                var trueNameTemp = pCont[0].slice(4)
                console.log(trueNameTemp)
                var trueName = []
                trueName[0] = trueNameTemp
              } else {
                var trueName = []
                trueName[0] = ''
                console.log('匹配不到中煤保险的被保险人')
              }
              var reCar = /车牌(\S*).品牌/
              if (shortInforData.match(reCar)) {
                var carNum = shortInforData.match(reCar)
                carNum[0] = carNum[0].replace('-', '')
                carNum[0] = carNum[0].replace('，品牌', '')
                carNum[0] = carNum[0].slice(2)
                console.log(carNum[0])
              } else {

                var carNum = []
                carNum[0] = ''
              }



            } else if (shortInforData[0] == '返') {


              console.log("5555555555");

              var address = /陕西省.[\u4e00-\u9fa5\\-\a-zA-Z0-9]+/i;

              console.log(shortInforData.match(address));

              if (shortInforData.match(address)) {
                var add = shortInforData.match(address);
                console.log();
                that.setData({
                  title: add[0].substring(0, 30)
                })
              } else {

                console.log("没有解析出地理位置");
              }

              var patt1 = /%(\w+)-(\w+)/i;
              if (shortInforData.match(patt1)) {

                var caseNum = shortInforData.match(patt1);

                caseNum[0] = caseNum[0].replace('%', '')
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }

              var pPatt = /客户[\u4e00-\u9fa5]{2,}./i;
              if (shortInforData.match(pPatt)) {
                var shortInforData1 = shortInforData.replace(/\s*/g, "");
                console.log(shortInforData1)
                var pCont = shortInforData1.match(pPatt);

                var temp = pCont[0].slice(2)
                console.log(temp)
                var chinese = /[\u4e00-\u9fa5]{2,}/
                if (temp.match(chinese)) {
                  console.log('dsd')
                  var trueName = temp.match(chinese)

                } else {
                  var trueName = []
                  trueName[0] = ''
                }

                //console.log(trueName)
              } else {
                var trueName = []
                trueName[0] = ''
              }

              var carPatt1 = /车牌(\S*)品牌/;
              if (shortInforData.match(carPatt1)) {
                var carCont = shortInforData.match(carPatt1);
                carCont[0] = carCont[0].replace('-', '')
                console.log(carCont[0])
                var carPatt2 = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/i;
                if (carCont[0].match(carPatt2)) {
                  var carNum = carCont[0].match(carPatt2)

                } else {
                  var carPatt3 = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}.)/i;
                  if (carCont[0].match(carPatt3)) {
                    var carNum = carCont[0].match(carPatt3)
                  } else {
                    var carNum = []
                    carNum[0] = ''
                  }


                }
              } else {
                var carNum = []
                carNum[0] = ''
              }

            } else if (shortInforData[0] == '送') {

              console.log("4444444444444");

              var address = /陕西省.[\u4e00-\u9fa5\\-\a-zA-Z0-9]+/i;

              console.log(shortInforData.match(address));

              if (shortInforData.match(address)) {
                var add = shortInforData.match(address);
                console.log();
                that.setData({
                  title: add[0].substring(0, 30)
                })
              } else {

                console.log("没有解析出地理位置");
              }

              var patt1 = /%(\w+)-(\w+)/i;
              if (shortInforData.match(patt1)) {

                var caseNum = shortInforData.match(patt1);

                caseNum[0] = caseNum[0].replace('%', '')
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }

              var pPatt = /客户.[\u4e00-\u9fa5]{2,}./i;
              if (shortInforData.match(pPatt)) {
                var shortInforData1 = shortInforData.replace(/\s*/g, "");
                console.log(shortInforData1)
                var pCont = shortInforData1.match(pPatt);

                var temp = pCont[0].slice(3)
                console.log(temp)
                var chinese = /[\u4e00-\u9fa5]{2,}/
                if (temp.match(chinese)) {
                  console.log('dsd')
                  var trueName = temp.match(chinese)

                } else {
                  var trueName = []
                  trueName[0] = ''
                }

                //console.log(trueName)
              } else {
                var trueName = []
                trueName[0] = ''
              }

              var carPatt1 = /车牌(\S*)品牌/;
              if (shortInforData.match(carPatt1)) {
                var carCont = shortInforData.match(carPatt1);
                carCont[0] = carCont[0].replace('-', '')
                console.log(carCont[0])
                var carPatt2 = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/i;
                if (carCont[0].match(carPatt2)) {
                  var carNum = carCont[0].match(carPatt2)

                } else {
                  var carPatt3 = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}.)/i;
                  if (carCont[0].match(carPatt3)) {
                    var carNum = carCont[0].match(carPatt3)
                  } else {
                    var carNum = []
                    carNum[0] = ''
                  }


                }
              } else {
                var carNum = []
                carNum[0] = ''
              }

            } else {

              console.log("66666666666");
              var address = /陕西省.[\u4e00-\u9fa5\\-\a-zA-Z0-9]+/i;

              console.log(shortInforData.match(address));

              if (shortInforData.match(address)){
                var add = shortInforData.match(address);
                console.log();
                that.setData({
                  title: add[0].substring(0,30)
                })
              }else{

                console.log("没有解析出地理位置");
              }

              var patt1 = /%(\w+)-(\w+)/i;
              if (shortInforData.match(patt1)) {

                var caseNum = shortInforData.match(patt1);

                caseNum[0] = caseNum[0].replace('%', '')
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }

              var pPatt = /被保险人(\S*)./i;
              if (shortInforData.match(pPatt)) {
                var shortInforData1 = shortInforData.replace(/\s*/g, "");
                console.log(shortInforData1)
                var pCont = shortInforData1.match(pPatt);
                console.log(pCont)
                var trueNameTemp = pCont[0].slice(4)
                console.log(trueNameTemp)
                trueNameTemp = trueNameTemp.replace('价值客户', '')
                trueNameTemp = trueNameTemp.replace('正价值客户', '')
                trueNameTemp = trueNameTemp.replace('综合金融客户', '')
                trueNameTemp = trueNameTemp.replace('VIP', '')
                trueNameTemp = trueNameTemp.replace('信用卡预筛选优质客户', '')
                trueNameTemp = trueNameTemp.replace('黄金', '')
                var regTemp = /[\u4e00-\u9fa5]+/

                var trueNameTemp1 = trueNameTemp.slice(0, 3).match(regTemp)
                if (trueNameTemp.slice(0, 3).match(regTemp)) {
                  var trueName = []
                  trueName[0] = trueNameTemp1[0]
                } else {
                  var trueName = []
                  trueName[0] = trueNameTemp.slice(0, 3)
                }

              } else {
                var trueName = []
                trueName[0] = ''
              }

              shortInforData = shortInforData.replace('-', '')

              console.log("&*&*&*&*&"+shortInforData[0]);

              if (shortInforData[0]=="远"){

                // var carPatt1 = "[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{2}[0-9]{3}[A-HJ-NP-Z0-9挂学警港澳]{1}";

                console.log("%%%%%%%%%%%%%%%" + shortInforData.match(carPatt));

                if (shortInforData.match(carPatt)) {
                  var carCont = shortInforData.match(carPatt);
                  carCont[0] = carCont[0].replace('-', '')
                  var carNum = []
                  carNum[0] = carCont[0]

                } else {
                  var carNum = []
                  carNum[0] = ''
                }

              }else{

                var carWord = /车/;
                if (shortInforData.match(carWord)) {
                  shortInforData = shortInforData.slice(shortInforData.match(carWord).index)
                  var carPatt1 = /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}/i;
                  if (shortInforData.match(carPatt1)) {
                    var carCont = shortInforData.match(carPatt1);
                    carCont[0] = carCont[0].replace('-', '')
                    var carNum = []
                    carNum[0] = carCont[0]

                  } else {
                    var carNum = []
                    carNum[0] = ''
                  }
                } else {
                  var carNum = []
                  carNum[0] = ''
                }

              }

            }

            var mobilePatt = /1[3456789]\d{9}/;
            var mobilePatt1 = /驾.[\u4e00-\u9fa5]{2,3}\d+/;
            var mobilePatt2 = /联系人.[\u4e00-\u9fa5]{2,3}\d+/;
            var mobilePatt3 = /联系人.[\u4e00-\u9fa5]{2,3}.\d+/;
            var mobilePatt4 = /客户联系电话\d+/;
            if (shortInforData.match(mobilePatt2)) {
              var numReg = /[0-9]{1,}/
              if (shortInforData.match(mobilePatt2)[0].match(numReg)) {
                var mobile = shortInforData.match(mobilePatt2)[0].match(numReg)
              } else {
                var mobile = shortInforData.match(mobilePatt)
                mobile[0] = ''
              }
            } else if (shortInforData.match(mobilePatt3)) {
              console.log(shortInforData.match(mobilePatt3))
              var numReg = /[0-9]{1,}/
              if (shortInforData.match(mobilePatt3)[0].match(numReg)) {
                var mobile = shortInforData.match(mobilePatt3)[0].match(numReg)
              } else {
                var mobile = shortInforData.match(mobilePatt)
                mobile[0] = ''
              }

            } else if (shortInforData.match(mobilePatt1)) {
              var numReg = /[0-9]{1,}/
              var temp = shortInforData.match(mobilePatt1)[0]
              if (temp.match(numReg)) {
                var mobile = shortInforData.match(mobilePatt1)[0].match(numReg)
              } else {
                var mobile = [];
                mobile[0] = ''
              }
            } else if (shortInforData.match(mobilePatt)) {
              console.log(shortInforData.match(mobilePatt))
              var mobile = shortInforData.match(mobilePatt)
            } else if (shortInforData.match(mobilePatt4)) {
              console.log(shortInforData.match(mobilePatt4))
              var numReg = /[0-9]{1,}/
              if (shortInforData.match(mobilePatt4)[0].match(numReg)) {
                var mobile = shortInforData.match(mobilePatt4)[0].match(numReg)
              } else {
                var mobile = shortInforData.match(mobilePatt)
                mobile[0] = ''
              }

            } else {
              var mobile = [];
              mobile[0] = ''
            }
          }else if (that.data.companyed == '永安保险') {
            var patt1 = /(\d){13,}/i;
            if (shortInforData.match(patt1)) {
              var patt2 = /(\d+)/i;
              if (shortInforData.match(patt1)[0].match(patt2)) {
                var caseNum = shortInforData.match(patt1)[0].match(patt2)
              } else {
                var caseNum = []
                caseNum[0] = ''
              }
            } else {
              var caseNum = []
              caseNum[0] = ''
            }

            if (shortInforData.match(carPatt)) {
              var carCont = shortInforData.match(carPatt);
              var carNum = []
              carNum[0] = carCont[0]
            } else {
              var carNum = []
              carNum[0] = ''
            }

            var namePhoneReg = /[\u4e00-\u9fa5]{2,}1[345789]\d{9}/
            if (shortInforData.match(namePhoneReg)) {
              var nameReg = /[\u4e00-\u9fa5]{2,}/
              if (shortInforData.match(namePhoneReg)[0].match(nameReg)) {
                var trueName = shortInforData.match(namePhoneReg)[0].match(nameReg)
              } else {
                var trueName = []
                trueName[0] = ''
              }
              var phoneReg = /1[345789]\d{9}/
              if (shortInforData.match(namePhoneReg)[0].match(phoneReg)) {
                var mobile = shortInforData.match(namePhoneReg)[0].match(phoneReg)
              } else {
                var mobile = []
                mobile[0] = ''
              }


            } else {
              var trueName = []
              var mobile = []
              trueName[0] = ''
              mobile[0] = ''
            }
          } else if (that.data.companyed == '中银保险') {
            var lossreg = /定损/
            console.log(shortInforData.match(lossreg))
            if (shortInforData.match(lossreg)) {
              that.setData({
                ifLoss: true
              })
              var patt1 = /(\d+)/i;
              console.log(shortInforData.match(patt1))
              if (shortInforData.match(patt1)) {
                var caseCont = shortInforData.match(patt1);
                var pattNum = /(\d+).(\d+)/
                if (caseCont[0].match(pattNum)) {
                  var caseNum = caseCont[0].match(pattNum);
                } else {
                  var caseNum = []
                  caseNum[0] = ''
                }
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }
              var carPattchina = /牌照./i
              console.log(shortInforData.match(carPattchina))

              if (shortInforData.match(carPattchina)) {
                var temp = shortInforData.slice(shortInforData.match(carPattchina).index + 3, shortInforData.match(carPattchina).index + 10)
                console.log(temp)
                temp = temp.replace('，', '')
                var carNum = []
                if (temp[0] == '新') {
                  carNum[0] = '新车未上牌'
                } else {
                  carNum[0] = temp
                }
              } else {
                var carNum = []
                carNum[0] = ''
              }
              var pPatt = /.[\u4e00-\u9fa5]{2,}.1[345789]\d{9}/i;
              console.log(shortInforData.match(pPatt))
              if (shortInforData.match(pPatt)) {
                var pCont = shortInforData.match(pPatt);
                pCont[0] = pCont[0].replace('，', '')
                var chineReg = /[\u4e00-\u9fa5]{2,}/
                if (pCont[0].match(chineReg)) {
                  console.log(pCont[0].match(chineReg))
                  var trueName = []
                  trueName[0] = pCont[0].match(chineReg)[0]
                } else {
                  var trueName = []
                  trueName[0] = ''
                }

              } else {
                var trueName = []
                trueName[0] = ''
              }

              var mobileReg = /.[\u4e00-\u9fa5]{2,}.1[345789]\d{9}/i;
              console.log(shortInforData.match(mobileReg))
              if (shortInforData.match(mobileReg)) {
                var temp = shortInforData.match(mobileReg)
                var tempReg = /1[345789]\d{9}/
                if (temp[0].match(tempReg)) {
                  var mobile = temp[0].match(tempReg)
                } else {
                  var mobile = []
                  mobile[0] = ''
                }
              } else {
                var mobile = []
                mobile[0] = ''
              }

            } else {
              var patt1 = /报案号.(\d+)/i;
              if (shortInforData.match(patt1)) {
                var caseCont = shortInforData.match(patt1);
                var pattNum = /(\d+).(\d+)/
                if (caseCont[0].match(pattNum)) {
                  var caseNum = caseCont[0].match(pattNum);
                } else {
                  var caseNum = []
                  caseNum[0] = ''
                }
              } else {
                var caseNum = [];
                caseNum[0] = ''
              }
              var carPattchina = /牌照./i
              console.log(shortInforData.match(carPattchina))

              if (shortInforData.match(carPattchina)) {
                var temp = shortInforData.slice(shortInforData.match(carPattchina).index + 3, shortInforData.match(carPattchina).index + 10)
                console.log(temp)
                temp = temp.replace('，', '')
                var carNum = []
                if (temp[0] == '新') {
                  carNum[0] = '新车未上牌'
                } else {
                  carNum[0] = temp
                }
              } else {
                var carNum = []
                carNum[0] = ''
              }
              var pPatt = /被保人.[\u4e00-\u9fa5]{2,}/i;
              if (shortInforData.match(pPatt)) {
                var pCont = shortInforData.match(pPatt);
                var temp = pCont[0].slice(4)
                var trueName = []
                trueName[0] = temp
              } else {
                var trueName = []
                trueName[0] = ''
              }

              var mobileReg = /联系人.[\u4e00-\u9fa5]{2,}.1[345789]\d{9}/
              console.log(shortInforData.match(mobileReg))
              if (shortInforData.match(mobileReg)) {
                var temp = shortInforData.match(mobileReg)
                var tempReg = /1[345789]\d{9}/
                if (temp[0].match(tempReg)) {
                  var mobile = temp[0].match(tempReg)
                } else {
                  var mobile = []
                  mobile[0] = ''
                }
              } else {
                var mobile = []
                mobile[0] = ''
              }

            }

         
        } else if (that.data.companyed == '天安财险') {

          var lossreg = /定损/
          if (shortInforData.match(lossreg)) {
            that.setData({
              ifLoss: true
            })
            var patt1 = /报案号.(\d+)/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              var pattNum = /(\d+).(\d+)/
              if (caseCont[0].match(pattNum)) {
                var caseNum = caseCont[0].match(pattNum);
              } else {
                var caseNum = []
                caseNum[0] = ''
              }
            } else {
              var caseNum = [];
              caseNum[0] = ''
            }
            var carPattchina = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/i;
            if (shortInforData.match(carPattchina)) {
              var carNum = shortInforData.match(carPattchina)
            } else {
              var carNum = []
              carNum[0] = ''
            }
            var pPatt = /被保险人[\u4e00-\u9fa5]{2,}/i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              pCont[0] = pCont[0].slice(4)
              var trueName = []
              trueName[0] = pCont[0]

            } else {
              var trueName = []
              trueName[0] = ''
            }
            var mobileReg = /.[\u4e00-\u9fa5]{2,}.1[345789]\d{9}/i;
            if (shortInforData.match(mobileReg)) {
              var temp = shortInforData.match(mobileReg)
              var tempReg = /1[345789]\d{9}/
              if (temp[0].match(tempReg)) {
                var mobile = temp[0].match(tempReg)
              } else {
                var mobile = []
                mobile[0] = ''
              }
            } else {
              var mobile = []
              mobile[0] = ''
            }

          } else {
            var patt1 = /报案号.(\d+)/i;
            if (shortInforData.match(patt1)) {
              var caseCont = shortInforData.match(patt1);
              var pattNum = /(\d+).(\d+)/
              if (caseCont[0].match(pattNum)) {
                var caseNum = caseCont[0].match(pattNum);
              } else {
                var caseNum = []
                caseNum[0] = ''
              }
            } else {
              var caseNum = [];
              caseNum[0] = ''
            }
            var carPattchina = /([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})/i;
            if (shortInforData.match(carPattchina)) {
              var carNum = shortInforData.match(carPattchina)
            } else {
              var carNum = []
              carNum[0] = ''
            }
            var pPatt = /被保险人[\u4e00-\u9fa5]{2,}/i;
            if (shortInforData.match(pPatt)) {
              var pCont = shortInforData.match(pPatt);
              var temp = pCont[0].slice(4)
              var trueName = []
              trueName[0] = temp
            } else {
              var trueName = []
              trueName[0] = ''
            }

            var mobileReg = /[\u4e00-\u9fa5]{2,}1[345789]\d{9}/i
            if (shortInforData.match(mobileReg)) {
              var temp = shortInforData.match(mobileReg)
              var tempReg = /1[345789]\d{9}/
              if (temp[0].match(tempReg)) {
                var mobile = temp[0].match(tempReg)
              } else {
                var mobile = []
                mobile[0] = ''
              }
            } else {
              var mobile = []
              mobile[0] = ''
            }

          }

        }else {
            that.setData({
              cannot: true,
              hh: true,
              index1: 0,
              istaskvalue: false,
              pingandate: true,
              taipingdate: true,
              taipingcase: true,
              itarea: false,
              itWarranty: false,
              itagency: false,
              numberplate: false,
              jobnumber: true,
              riskdamage: true,
              sendworkers: false,
              pinganarea: true,
              pinganperiod: true,
              sendtime: true
            })
            for (var y in that.data.arrayObject) {
              if (that.data.array[0] == that.data.arrayObject[y].name) {
                that.setData({
                  insuranceId: that.data.arrayObject[y].id
                })
              }
            }
            console.log(that.data.insuranceId)
            var caseNum = []
            var carNum = []
            var trueName = []
            var mobile = []
            caseNum[0] = ''
            carNum[0] = ''
            trueName[0] = ''
            mobile[0] = ''

          }

          var numberIdc = 'caseInfor[' + 0 + '].' + 'numberId';
          var carIdNum = 'caseInfor[' + 0 + '].' + 'carId';
          var personName = 'caseInfor[' + 0 + '].' + 'casePerson';
          var mobileaa = 'caseInfor[' + 0 + '].' + 'casePhone';

          console.log("~~~~" + numberIdc);

          that.setData({
            [numberIdc]: caseNum[0],
            [carIdNum]: carNum[0],
            [personName]: trueName[0],
            [mobileaa]: mobile[0]
          })
          that.setData({
            firstPage: false,
            secondPage: true,

          })

        }
      }
    })

  },
  
})