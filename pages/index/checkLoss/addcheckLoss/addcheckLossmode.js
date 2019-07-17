var test = getApp().globalData.hostName;


class addcheckLoss {

  constructor(){
    
  };

  addCheckinfo(insuranceId, report_no, type, remark, task_type, survey_date, send_user, report_date, send_date, survey_address, are, send_time, case_type, policy_no, ins_org, car_no, callback){

    console.log("*****************");
 
  var sessionId = wx.getStorageSync('PHPSESSID');
  console.log("rrr" + sessionId);

    wx.request({
      url: test + 'task/survey/add',
      method: 'POST',
      data: {

        insurance_id: insuranceId, //保险公司id
        report_no: report_no, //报案号
        car_no: car_no, //车牌
        send_user: send_user, //派工人
        type: type,  //类型 （0：查勘，1：三责，2：标的）
        remark: remark,  //备注
        survey_date: survey_date,
        task_type: task_type,
        send_date: send_date,
        survey_address: survey_address,
        ins_org: ins_org,
        policy_no: policy_no,
        send_time: send_time,
        case_type: case_type,
        are: are,
        report_date: report_date
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + sessionId
      },
      
      success:function(res){        
        callback && callback(res);
      },
      fail:function(res){
        callback && callback(res);
      }, 
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }

    })
  }

  reqAddress(callback){
    
    var sessionId = wx.getStorageSync('PHPSESSID');

    wx.request({
      url: test + 'task/index/systemInsurance',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + sessionId
      }, // 默认值
      success:function(res){
        callback && callback(res);
      },
      fail:function(res){
        callback && callback(res);
      }
    })
  }

}

export {addcheckLoss}