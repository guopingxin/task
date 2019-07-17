
var daily = [
    {
        "ref_date": "05.11",
        "session_cnt": 8,
        "visit_pv": 49,
        "visit_uv": 4,
        "visit_uv_new": 25,
        "stay_time_uv": 73.75,
        "stay_time_session": 36.875,
        "visit_depth": 3.25
    },
    {
      "ref_date": "05.12",
        "session_cnt": 10,
        "visit_pv": 81,
        "visit_uv": 8,
        "visit_uv_new": 200,
        "stay_time_uv": 351.25,
        "stay_time_session": 281,
        "visit_depth": 3.5
    },
    {
      "ref_date": "05.13",
        "session_cnt": 17,
        "visit_pv": 58,
        "visit_uv": 10,
        "visit_uv_new": 4,
        "stay_time_uv": 187.3,
        "stay_time_session": 110.1765,
        "visit_depth": 2.4706
    },
    {
      "ref_date": "05.14",
        "session_cnt": 2,
        "visit_pv": 6,
        "visit_uv": 2,
        "visit_uv_new": 25,
        "stay_time_uv": 17.5,
        "stay_time_session": 17.5,
        "visit_depth": 3
    },
    {
      "ref_date": "05.15",
        "session_cnt": 9,
        "visit_pv": 78,
        "visit_uv": 5,
        "visit_uv_new": 400,
        "stay_time_uv": 90.2,
        "stay_time_session": 50.1111,
        "visit_depth": 4.6667
    },
    {
      "ref_date": "05.16",
        "session_cnt": 21,
        "visit_pv": 155,
        "visit_uv": 10,
        "visit_uv_new": 4,
        "stay_time_uv": 173.8,
        "stay_time_session": 82.7619,
        "visit_depth": 3.4286
    },
    {
      "ref_date": "05.17",
        "session_cnt": 17,
        "visit_pv": 118,
        "visit_uv": 11,
        "visit_uv_new": 4,
        "stay_time_uv": 67.7273,
        "stay_time_session": 43.8235,
        "visit_depth": 3.8824
    },
   
   
]
function getOutLine(that){
  return new Promise((resolve, reject) => {
  wx.request({
    url: that.data.hostName + 'task/count/index',
    method: 'GET',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
    },// 默认值
    success: function (res) {
     console.log(res)
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
     resolve(res)
    }
  })
  })
}
function getDeatail(that) {

  return new Promise((resolve, reject) => {
    console.log(that.data.start_time)
    wx.request({
      url: that.data.hostName + 'task/count/info',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + that.data.sessionId
      },// 默认值
      data: {
        count_type: that.data.bussinessClasify,
        start_time: that.data.start_time,
        end_time: that.data.end_time,
        module_num: that.data.moduIndexRequest,
      },
      success: function (res) {
        console.log(res)
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
        if (res.data.status == 1 && that.data.task_search) {
          that.setData({
            short_name: that.data.task_name + ' · ',
            task_search: false,
            dataNull: false,
            canvasNull: 'block'
          })
        }

        resolve(res)
      }
    })
  })
}

module.exports = {
  daily: daily,
  getOutLine: getOutLine,
  getDeatail:getDeatail
}