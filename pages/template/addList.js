function addSubmit(that, e, userIdArc, session_id, moduName, noCar, address, carType, notice) {
  if (e.detail.value.trueName == '') {
    that.setData({
      nameErr: true
    })
    return
  }
  console.log(e.detail.value.trueMobile)
  var reg = /^1[3456789]\d{9}$/;
  if (reg.test(e.detail.value.trueMobile)) {
  } else {
    that.setData({
      mobileErr: true
    })
    return
  }
  if (!noCar) {
    var reCar = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[\s]?[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/
    if (reCar.test(e.detail.value.trueCar)) {
      console.log('ok')
    } else {
      that.setData({
        carNoErr: true
      })
      return
    }
  }
  if (carType) {
    if (!that.data.carData.dataId||e.detail.value.carType == '' ) {
      console.log('mmp')
      that.setData({
        carTypeErr: true
      })
      return
    }
  }
  if (address) {
    console.log(8+e.detail.value.address == '')
    if (e.detail.value.address == '') {
      that.setData({
        addressErr: true
      })
      console.log(that.data.addressErr)
      return
    }
  } 
  if (notice) {
    if (that.data.imgPath == '') {
      that.setData({
        noticeErr: true
      })
      return
    }
  }
  that.setData({
    allOver: true
  })
  var test = getApp().globalData.hostName;
  that.data.userId = wx.getStorageSync('userid');
  console.log(e.detail.value);
  wx.showNavigationBarLoading() //在标题栏中显示加载
  wx.request({
    url: test + 'task/' + moduName + '/add',
    method: 'POST',
    data: {
      name: e.detail.value.trueName,
      recognizee: e.detail.value.trueName,
      owner_name: e.detail.value.trueName,
      mobile: e.detail.value.trueMobile,
      car_no: e.detail.value.trueCar,
      service_id: that.data.carData.seriesId,
      car_type: e.detail.value.carType,
      remark: e.detail.value.secondinfor,
      type: e.detail.value.radio,
      address: e.detail.value.address,
      shuttle: e.detail.value.radio,
      notice: that.data.imgPath,
      insurance_id: that.data.insuranceId,
      brand_id: that.data.carData.dataId,
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
      console.log(res)
      if(res.data.status==1){
        wx.showToast({
          title: '添加成功',
          duration: 500
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 500)
      }
      
      
    },
    complete: function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }
  })
}
function cancelRed(that, e) {
  if (e.currentTarget.id == 'trueName') {
    that.setData({
      nameErr: false
    })
  } else if (e.currentTarget.id == 'trueMobile') {
    that.setData({
      mobileErr: false
    })
  } else if (e.currentTarget.id == 'trueCar') {
    that.setData({
      carNoErr: false
    })
  } else if (e.currentTarget.id == 'address') {
    that.setData({
      addressErr: false
    })
  } else if (e.currentTarget.id == 'carType') {
    that.setData({
      carTypeErr: false
    })
  } else if (e.currentTarget.id == 'deaddress') {
    that.setData({
      deaddressErr: false
    })
  }
}
module.exports = {
  addSubmit: addSubmit,
  cancelRed: cancelRed
}