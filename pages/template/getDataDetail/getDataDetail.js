 var test = getApp().globalData.hostName;
function getDetail(that, session_id, listId, moduName, moduNum) {
  wx.request({
    url: test + 'task/' + moduName + '/info/id/' + listId,
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
      console.log(res)
      var aa = []
      var toTrace;
      that.data.scheduleAll = res.data.schedule
      
      for (var n in res.data.schedule) {
        if (res.data.schedule[n].title == 'risk_report'){
          var temp = res.data.schedule[n].picture;
          temp=temp.split(',')
          for(var i in temp){
            that.data.reportImg.push(test + 'uploads/work/' +temp[i])
          }
          that.setData({
            reportImg: that.data.reportImg
          })
          console.log(that.data.reportImg)
          continue
        } else if (res.data.schedule[n].title == 'risk_invoice'){
          var temp = res.data.schedule[n].picture;
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
        if (res.data.schedule[n].title == '接车') {
          toTrace = 'jieche'
        }
        if (res.data.schedule[n].title == '送车') {
          toTrace = 'songche'
        }
        if (moduNum == 11) {
          var reg = /反馈结果/i

          if (res.data.schedule[n].title.match(reg)) {
            res.data.schedule[n].title = res.data.schedule[n].title + '\n' + res.data.schedule[n].content
          }
        }
        var last = 'grey';
        if (n == res.data.schedule.length - 1) {
          last = 'blue'
        }
        var first = 'has'
        if (n == 0) {
          first = 'nohas'
        }
        var year = res.data.schedule[n].date;
        var month = year.slice(5, 10);
        var time = year.slice(11)
        var picStr = '';
        if (res.data.schedule[n].picture){
          picStr = res.data.schedule[n].picture;
        }
        aa.unshift({ trace: toTrace, first: first, color: last, current: true, month: month, time: time, done: true, pic: picStr.split(","), text: res.data.schedule[n].title, desc: res.data.schedule[n].date })
      }
      that.setData({

      })
      var stepTemp = 'detail.step'
      that.setData({
        [stepTemp]: aa,
        steps: aa
      })
      var temp = 'detail.detailNumber';
      var task_id;
      if (moduNum == 1) {

        that.setData({
          detail: res.data.claims,
          detailId: res.data.claims.id,
          [temp]: res.data.claims.claims_no,
        })
        task_id = res.data.claims.task_id
      } else if (moduNum == 2) {

        that.setData({
          detail: res.data.maintain,
          detailId: res.data.maintain.id,
          [temp]: res.data.maintain.maintain_no,
        })
        task_id = res.data.maintain.task_id
      } else if (moduNum == 3) {

        that.setData({
          detail: res.data.yearbook,
          detailId: res.data.yearbook.id,
          [temp]: res.data.yearbook.yearbook_no,
        })
        task_id = res.data.yearbook.task_id
      } else if (moduNum == 4) {

        that.setData({
          detail: res.data.trailer,
          detailId: res.data.trailer.id,
          [temp]: res.data.trailer.trailer_no,
        })
        task_id = res.data.trailer.task_id
      } else if (moduNum == 5) {

        that.setData({
          detail: res.data.rescue,
          detailId: res.data.rescue.id,
          [temp]: res.data.rescue.rescue_no,
        })
        task_id = res.data.rescue.task_id
      } else if (moduNum == 6) {
        that.setData({
          detail: res.data.accident,
          detailId: res.data.accident.id,
          [temp]: res.data.accident.accident_no,
        })
        task_id = res.data.accident.task_id
      } else if (moduNum == 7) {
        that.setData({
          detail: res.data.used,
          detailId: res.data.used.id,
          [temp]: res.data.used.used_no,
        })
        task_id = res.data.used.task_id
      } else if (moduNum == 8) {
        that.setData({
          detail: res.data.sale,
          detailId: res.data.sale.id,
          [temp]: res.data.sale.sale_no,
        })
        task_id = res.data.sale.task_id
      } else if (moduNum == 11) {
        that.setData({
          detail: res.data.push,
          detailId: res.data.push.id,
          [temp]: res.data.push.push_no,
        })
        getBrand(session_id, res.data.push.brand_id,that)
        if (res.data.push.service_id) {
          getService1(session_id, res.data.push.service_id, that)
        }
        if (res.data.push.push_service_id){
          getService(session_id, res.data.push.push_service_id, that)
        }
        if (res.data.push.push_task_id) {
          getOprater(session_id, res.data.push.push_task_id, that)
        }
        if (res.data.push.task_id) {
          getOprater1(session_id, res.data.push.task_id, that)
        }
        task_id = res.data.push.task_id
        if (res.data.push.survey_id > 0) {

          that.data.schedule = res.data.survey_schedule
          getImage(that)
          that.setData({
            is_survey: true,
          })
        }
      } else if (moduNum == 10) {
        that.setData({
          detail: res.data.risk,
          detailId: res.data.risk.id,
          [temp]: res.data.risk.risk_no,
        })
        task_id = res.data.risk.task_id
        wx.request({
          url: test + 'task/index/systemInsurance',
          method: 'GET',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
          },// 默认值
          success: function (res) {
            var dataType = typeof res.data
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
            for (var i in res.data.insurance) {
              if (res.data.insurance[i].id == that.data.detail.insurance_id) {
                var temp = 'detail.insuranName'
                that.setData({
                  [temp]: res.data.insurance[i].name
                })
              }
            }
          }
        })
      }
      if (task_id == that.data.userId) {
        var myClaimsTemp = 'detail.myClaims'
        that.setData({
          [myClaimsTemp]: true
        })
      } else {
        that.setData({
          [myClaimsTemp]: false
        })
      }
      that.data.detail.opratorRank = wx.getStorageSync('rank');
      var tempRank = 'detail.opratorRank'
      that.setData({
        [tempRank]: that.data.detail.opratorRank
      })
      if (that.data.detail.task_id) {
        wx.request({
          url: test + 'task/index/taskInfo',
          method: 'GET',
          header: { 
            'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
          },// 默认值
          data:{
            id: that.data.detail.task_id
          },
          success: function (res) {
            var dataType = typeof res.data
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
                var opratorTemp ='detail.oprator'
                that.setData({
                  [opratorTemp]: res.data.task
                })
             
          
          }
        })
      }

      if (that.data.detail.service_id) {
        wx.request({
          url: test + 'task/index/service_info/id/' + that.data.detail.service_id,
          method: 'GET',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
          },// 默认值
          success: function (res) {
            var dataType = typeof res.data
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
            var serviceTemp ='detail.serviceInfor'
            that.setData({
              [serviceTemp]: res.data.service
            })
            wx.setStorageSync('service', that.data.detail.serviceInfor.short_name)
          }
        })
      } else {
      }
    },
    complete: function () {
      // complete
      wx.hideLoading()
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  })
}
function orders(that,moduName){
  wx.showLoading({
    title: '处理中...',
  })
  wx.request({
    url: test + 'task/' + moduName+'/receive',
    method: 'GET',

    data: {
      id: that.data.listId
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
    },// 默认值
    success: function (res) {
      var dataType = typeof res.data
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
}
function finish(that,moduName){
  wx.showLoading({
    title: '处理中...',
  })
  wx.request({
    url: test + 'task/' + moduName+'/finish',
    method: 'GET',
    data: {
      id: that.data.listId
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
}
function checkPass(that, listId, session_id, moduName) {
  var temp = 'detail.check'
  that.setData({
    [temp]: false
  })
  wx.request({
    url: test + 'task/' + moduName + '/audit',
    method: 'POST',
    data: {
      id: listId,
      status: 2
    },
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
      that.onShow()
    }
  })
}
function unpassReason(e, that, listId, session_id, moduName) {
  var temp = 'detail.check'
  that.setData({
    [temp]: false
  })
  if (e.detail.value.reason == '') {
    temp = 'detail.reasonErr'
    that.setData({
      [temp]: true
    })
    return
  }
  wx.request({
    url: test + 'task/' + moduName + '/audit',
    method: 'POST',
    data: {
      id: listId,
      status: 1,
      cause: e.detail.value.reason
    },
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
      temp = 'detail.reason'
      that.setData({
        [temp]: false
      })
      that.onShow()
    }
  })

}
function confirmCancel(that, listId, session_id, moduName) {
  var temp = 'detail.cancelModal'
  that.setData({
    [temp]: false
  })

  wx.request({
    url: test + 'task/' + moduName + '/cancel/id/' + listId,
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
      if (res.data.status == 1) {
        wx.showToast({
          title: "取消成功"
        })
        that.onShow()
      } else {
        wx.showToast({
          title: "取消失败"
        })
      }
    }
  })
}
function confirmDelete(that, listId, session_id, moduName) {
  console.log(test + 'task/' + moduName + '/delete?id=' + listId)
  wx.request({
    url: test + 'task/' + moduName + '/delete?id=' + listId,
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
      console.log(res)
      if (res.data.status == 1) {
        wx.showToast({
          title: "删除成功"
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)

      } else {
        wx.showToast({
          title: "删除失败"
        })
      }
      var temp = 'detail.deleteMODAL'
      that.setData({
        [temp]: false,
      })
    }
  })


}
module.exports = {
  getDetail: getDetail,
  checkPass: checkPass,
  unpassReason: unpassReason,
  confirmCancel: confirmCancel,
  confirmDelete: confirmDelete,
  orders: orders,
  finish: finish
}
function getBrand(session_id,id,that){
  wx.request({
    url: test + 'task/base/brands',
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
    },// 默认值
    success: function (res) {
      console.log(res)
      for(var i in res.data.brand){
        if (res.data.brand[i].id==id){
          var temp = 'detail.brandName'
          that.setData({
            [temp]: res.data.brand[i].name
          })
        }
        
      }
    }
  })
}
function getService(session_id, id, that){
  wx.request({
    url: test + 'task/index/service_info',
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
    },// 默认值
    data:{
      id:id
    },
    success: function (res) {
      console.log(res)
      if (res.data.service.short_name){
        that.setData({
          push_service: res.data.service.short_name,
          push_service1: res.data.service
        })
      }else{
        that.setData({
          push_service: res.data.service.name,
          push_service1: res.data.service
        })
      }
    
    }
  })
}
function getService1(session_id, id, that) {
  wx.request({
    url: test + 'task/index/service_info',
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
    },// 默认值
    data: {
      id: id
    },
    success: function (res) {
      console.log(res)
      that.setData({
        push_service1: res.data.service
      })
    }
  })
}
function getOprater(session_id, id, that) {
  wx.request({
    url: test + 'task/index/taskInfo',
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
    },// 默认值
    data: {
      id: id
    },
    success: function (res) {
      console.log(res)
      that.setData({
        oprater: res.data.task
      })
    }
  })
}
function getOprater1(session_id, id, that) {
  wx.request({
    url: test + 'task/index/taskInfo',
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
    },// 默认值
    data: {
      id: id
    },
    success: function (res) {
      console.log(res)
      that.setData({
        oprator1: res.data.task
      })
    }
  })
}
function getImage(that) {
  var imgId = 0;
  var dateNow = "2018-05-18";
  for (var i in that.data.schedule) {

    var picTemp1;
    var picTemp2;
    var allTemp;
    var picTemp1Data;
    var resultData;



    if (that.data.schedule[i].picture.ckzp) {

      for (var j in that.data.schedule[i].picture.ckzp.p1) {
        imgId++;

        that.data.allImg.push({ path: that.data.schedule[i].picture.ckzp.p1[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.ckzp.p1[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.ckzp.p1[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.ckzpp1.push({ path: allTemp, imgId: imgId })
        that.setData({
          ckzpp1: that.data.ckzpp1
        })
      }
      for (var j in that.data.schedule[i].picture.ckzp.p2) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.ckzp.p2[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.ckzp.p2[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.ckzp.p2[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.ckzpp2.push({ path: allTemp, imgId: imgId })
        that.setData({
          ckzpp2: that.data.ckzpp2
        })
      }
      for (var j in that.data.schedule[i].picture.ckzp.p3) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.ckzp.p3[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.ckzp.p3[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.ckzp.p3[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.ckzpp3.push({ path: allTemp, imgId: imgId })
        that.setData({
          ckzpp3: that.data.ckzpp3
        })
      }
      for (var j in that.data.schedule[i].picture.ckzp.p4) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.ckzp.p4[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.ckzp.p4[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.ckzp.p4[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.ckzpp4.push({ path: allTemp, imgId: imgId })
        that.setData({
          ckzpp4: that.data.ckzpp4
        })
      }
      for (var j in that.data.schedule[i].picture.ckzp.p5) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.ckzp.p5[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.ckzp.p5[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.ckzp.p5[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.ckzpp5.push({ path: allTemp, imgId: imgId })
        that.setData({
          ckzpp5: that.data.ckzpp5
        })
      }
      for (var j in that.data.schedule[i].picture.ckzp.p6) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.ckzp.p6[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.ckzp.p6[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.ckzp.p6[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.ckzpp6.push({ path: allTemp, imgId: imgId })
        that.setData({
          ckzpp6: that.data.ckzpp6
        })
      }
    }
    if (that.data.schedule[i].picture.gydz) {
      for (var j in that.data.schedule[i].picture.gydz.p1) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.gydz.p1[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.gydz.p1[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.gydz.p1[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.gydzp1.push({ path: allTemp, imgId: imgId })
        that.setData({
          gydzp1: that.data.gydzp1
        })
      }
      for (var j in that.data.schedule[i].picture.gydz.p2) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.gydz.p2[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.gydz.p2[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.gydz.p2[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.gydzp2.push({ path: allTemp, imgId: imgId })
        that.setData({
          gydzp2: that.data.gydzp2
        })
      }
      for (var j in that.data.schedule[i].picture.gydz.p3) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.gydz.p3[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.gydz.p3[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.gydz.p3[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.gydzp3.push({ path: allTemp, imgId: imgId })
        that.setData({
          gydzp3: that.data.gydzp3
        })
      }
      for (var j in that.data.schedule[i].picture.gydz.p4) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.gydz.p4[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.gydz.p4[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.gydz.p4[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.gydzp4.push({ path: allTemp, imgId: imgId })
        that.setData({
          gydzp4: that.data.gydzp4
        })
      }
      for (var j in that.data.schedule[i].picture.gydz.p5) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.gydz.p5[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.gydz.p5[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.gydz.p5[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.gydzp5.push({ path: allTemp, imgId: imgId })
        that.setData({
          gydzp5: that.data.gydzp5
        })
      }
      for (var j in that.data.schedule[i].picture.gydz.p6) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.gydz.p6[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.gydz.p6[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.gydz.p6[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.gydzp6.push({ path: allTemp, imgId: imgId })
        that.setData({
          gydzp6: that.data.gydzp6
        })
      }
      for (var j in that.data.schedule[i].picture.gydz.p7) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.gydz.p7[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.gydz.p7[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.gydz.p7[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.gydzp7.push({ path: allTemp, imgId: imgId })
        that.setData({
          gydzp7: that.data.gydzp7
        })
      }
      for (var j in that.data.schedule[i].picture.gydz.p8) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.gydz.p8[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.gydz.p8[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.gydz.p8[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.gydzp8.push({ path: allTemp, imgId: imgId })
        that.setData({
          gydzp8: that.data.gydzp8
        })
      }
      for (var j in that.data.schedule[i].picture.gydz.p9) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.gydz.p9[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.gydz.p9[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.gydz.p9[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.gydzp9.push({ path: allTemp, imgId: imgId })
        that.setData({
          gydzp9: that.data.gydzp9
        })
      }
      for (var j in that.data.schedule[i].picture.gydz.p10) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.gydz.p10[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.gydz.p10[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.gydz.p10[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.gydzp10.push({ path: allTemp, imgId: imgId })
        that.setData({
          gydzp10: that.data.gydzp10
        })
      }
    }
    if (that.data.schedule[i].picture.zfdz) {
      for (var j in that.data.schedule[i].picture.zfdz.p1) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.zfdz.p1[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.zfdz.p1[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.zfdz.p1[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.zfdzp1.push({ path: allTemp, imgId: imgId })
        that.setData({
          zfdzp1: that.data.zfdzp1
        })
      }
      for (var j in that.data.schedule[i].picture.zfdz.p2) {
        imgId++;
        console.log(imgId)
        that.data.allImg.push({ path: that.data.schedule[i].picture.zfdz.p2[j], imgId: imgId })
        picTemp1 = that.data.schedule[i].picture.zfdz.p2[j].substring(0, 11);
        picTemp2 = that.data.schedule[i].picture.zfdz.p2[j].substring(11);
        picTemp1Data = picTemp1.substring(0, 10);
        resultData = CompareDate(dateNow, picTemp1Data)
        if (resultData) {
          allTemp = picTemp1 + 'thumb_' + picTemp2
        } else {
          allTemp = picTemp1 + picTemp2
        }
        that.data.zfdzp2.push({ path: allTemp, imgId: imgId })
        that.setData({
          zfdzp2: that.data.zfdzp2
        })
      }
    }
  }
}
function CompareDate(d1, d2) {

  return ((new Date(d1.replace(/-/g, "\/"))) < (new Date(d2.replace(/-/g, "\/"))));
} 