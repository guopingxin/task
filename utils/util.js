const date = new Date()


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getaddress(){

  var ss = "";

  wx.getLocation({
    type:"gcj02",
    success: function(res) {
      console.log(JSON.stringify(res));
      const latitude = res.latitude
      const longitude = res.longitude
      wx.openLocation({
        latitude,
        longitude,
        scale: 18,
        success:function(res){
          console.log("##"+JSON.stringify(res));
        }
      })
    },
  })

  return ss;
}
    

module.exports = {
  formatTime: formatTime,
  getaddress: getaddress
}
