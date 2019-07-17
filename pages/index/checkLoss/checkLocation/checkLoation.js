// pages/index/checkLoss/checkLocation/checkLoation.js

var QQMapWX = require('../../../../qqmap-wx-jssdk');

var demo = new QQMapWX({
  key: 'OEIBZ-MF2HD-B6U4J-HRVAP-AASNO-CMBEQ' // 必填
});

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
    titleTop: '定损位置'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this

    wx.getLocation({
      type: 'gcj02',
      success: function (res) {

        const lat = res.latitude; //纬度
        const lng = res.longitude; //经度

        demo.reverseGeocoder({
          location: lat + "," + lng || '',
          get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
          success: function (res) {//成功后的回调
            console.log("%%%%" + JSON.stringify(res));
            var res = res.result;
            var mks = [];

            // 当get_poi为1时，检索当前位置或者location周边poi数据并在地图显示，可根据需求是否使用

            for (var i = 0; i < res.pois.length; i++) {
              mks.push({ // 获取返回结果，放到mks数组中
                title: res.pois[i].title,
                id: res.pois[i].id,
                latitude: res.pois[i].location.lat,
                longitude: res.pois[i].location.lng,
                iconPath: '../../../img/pos.png', //图标路径
                width: 20,
                height: 20
              })
            }


            //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
            // mks.push({ // 获取返回结果，放到mks数组中
            //   title: res.address,
            //   id: 0,
            //   latitude: res.ad_info.location.lat,
            //   longitude: res.ad_info.location.lng,
            //   iconPath: './resources/placeholder.png',//图标路径
            //   width: 20,
            //   height: 20,
            //   callout: { //在markers上展示地址名称，根据需求是否需要
            //     content: res.address,
            //     color: '#000',
            //     display: 'ALWAYS'
            //   }
            // });

            console.log("!!!" + JSON.stringify(mks));
            that.setData({ //设置markers属性和地图位置poi，将结果在地图展示
              markers: mks,
              poi: {
                latitude: res.ad_info.location.lat,
                longitude: res.ad_info.location.lng
              },
              imageurl: 0,

            });
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (res) {
            console.log(res);
          }
        })

      },
    })
  },

  selectlocation:function(option){

    var that = this;

    var locationid = option.target.dataset.licationid;
    var len = this.data.markers.length;


    
    for (var i=0; i < len; i++){

      if (locationid == i){
        that.setData({
          imageurl: locationid,
          locationid:locationid
        })
      }
    }
  },

  checkLocation:function(){

    var that =  this;

    var pages = getCurrentPages(); //获取页面的栈
    var prevPage = pages[pages.length - 2];

    var locationid = that.data.locationid;

    console.log("$$$$" + pages.length + locationid);

    if (typeof (locationid) == 'undefined'){
 
      prevPage.setData({
        //要向上个页面传的参数！
        latitude: that.data.markers[0].latitude,
        longitude: that.data.markers[0].longitude,
        title: that.data.markers[0].title,
        flag:2
      })
    }else{
      prevPage.setData({
        //要向上个页面传的参数！
        latitude: that.data.markers[locationid].latitude,
        longitude: that.data.markers[locationid].longitude,
        title: that.data.markers[locationid].title,
        flag: 2
      })
     
    }

    wx.navigateBack({

      // delta:pages.length-3
      delta:1
    })

    
    
  
  },

  //导航栏返回键
  backPage1:function(){

    wx.navigateBack({
      delta: 1
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})