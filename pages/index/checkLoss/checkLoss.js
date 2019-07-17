var common = require('../../../pages/common.js')
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
    titleTop: '任务流列表',
    classif:1,
    check_show:true,
    all:'all',
    each:'each',
    listBtrr:[],
    listAtrr_show:true,
    active_tit: 'check',
    noactive_tit: 'loss',
    iconTask: 'zan-icon zan-icon-records',
    theModule: '所有业务',
    toright: false,
    toLeft: true,
    taskId: '',
    lastX: 0,          //滑动开始x轴位置
    lastY: 0,          //滑动开始y轴位置
    text: "没有滑动",
    currentGesture: 0, //标识手势
    listAtrr: [],
    keywords: '',
    page: 1,
    lists:[],
    totallist: []
    
  },
  backPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  check: function (e) {
    console.log(e.currentTarget.id)
    this.setData({
      classif: e.currentTarget.id
    })
    // this.setData({
    //   check_show:true,
    //   all: 'all',
    //   each: 'each'
    // })
  },
  submitFormId: function (e) {
    console.log("%%%WW$%%"+e.detail.formId)
    common.getFormId(e.detail.formId)
  },
  loss: function () {
    this.setData({
      check_show: false,
      all: 'each',
      each: 'all'
    })
   
  },
  toAll:function(){
    console.log('ddd')
    this.setData({
      classif:1,
      mine_or_all:false,
      listAtrr: [],
      mine:false,
      listBtrr: [],
      keywords: '',
      page: 1,
      taskId: this.data.userId,
      active_tit: 'check',
      noactive_tit: 'loss',
    })
    this.onShow()
  },
  toEach:function(){
    this.setData({
      mine: true,
      classif: 1,
      mine_or_all: true,
      active_tit: 'loss',
      noactive_tit: 'check',
      listAtrr: [],
      listBtrr: [],
      keywords: '',
      page: 1,
      taskId: ''
    })
    this.onShow()
  },
  cancelSearch: function () {
    this.setData({
      keywords: '',
      page: 1,
      task_id: '',
      keyWordsTemp: '',
      listAtrr: [],
      cancelSearchIcon: false,
    })
    this.onShow()

  },
  toChoose: function (e) {
    var that = this
    if (e.detail.value == '') {
      return
    }
    that.setData({
      cancelSearchIcon: true,
      listAtrr: [],
      keywords: e.detail.value
    })
    that.onShow()
  },

  toDetail: function (e) {
    console.log(e.currentTarget.dataset.type)
    console.log(JSON.stringify(e));
    var listId = e.currentTarget.id;
    var type = e.currentTarget.dataset.type;
    console.log("dsgsdgsdg"+listId)
    wx.navigateTo({
      url: 'checkLossDeatail/checkLossDeatail?listId=' + listId + "&type=" + type,
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.data.userName = wx.getStorageSync('userName')
    this.setData({
      rank: wx.getStorageSync('rank')
    })
    this.data.userId = wx.getStorageSync('userid')
    this.data.taskId = wx.getStorageSync('userid')
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    

    if (this.data.toNext){
     wx.showLoading({
       title: '加载中...',
     })
    }
    var that = this
    var test = getApp().globalData.hostName;
    console.log(test + 'task/survey/index/page/' + that.data.page + '/keywords/' + that.data.keywords)
    this.data.sessionId = wx.getStorageSync('PHPSESSID')
    this.data.userId = wx.getStorageSync('userid');
    this.data.opratorRank = wx.getStorageSync('rank');
    that.setData({
      opratorRank: that.data.opratorRank
    })
    var userIdArc = this.data.userId;
    var session_id = this.data.sessionId;

    that.data.totallist=[];
    wx.request({
      url: test + 'task/survey/index', 
      method: 'POST',
      data: {
        keywords: that.data.keywords,
        page: that.data.page,
        task_id: that.data.taskId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id
      },// 默认值 
      success: function (res) {
        console.log("hhhh"+JSON.stringify(res))
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
        wx.hideLoading()
        if (res.data.status == 1) {
          wx.hideLoading()

          // 修改加载数据
          
          that.data.totallist = that.data.totallist.concat(res.data.survey);

          console.log("###############" + JSON.stringify(that.data.totallist));

          if (res.data.survey.length != 0) {
            that.setData({
              // allList: res.data.survey
              allList: that.data.totallist
            })
            for (var i in that.data.totallist) {
              if (that.data.totallist[i].type == 0) {
                that.data.listAtrr.push(that.data.totallist[i])
              } else {
                that.data.listBtrr.push(that.data.totallist[i])
              }
            }
            console.log(that.data.listAtrr)
            console.log(that.data.listBtrr)
            that.setData({
              gif: false,
              listAtrr: that.data.listAtrr,
              listBtrr: that.data.listBtrr,
            })
          } else {
            that.setData({
              gif: false,
              moredata: true,
            })
            setTimeout(function () {
              that.setData({
                moredata: false,
              })
            }, 2000)
          }

        } else {
          that.setData({
            gif: false,
            moredata: true,
            listAtrr:[],
            listBtrr:[],
            allList:[]
          })
          setTimeout(function () {
            that.setData({
              moredata: false,
            })
          }, 2000)
        }


      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  toAddAgency: function () { 
    wx.navigateTo({
      url: 'addcheckLoss/addcheckLoss',
    })
  },
  onHide: function () {
    this.data.toNext=true
    this.setData({
      listBtrr: [],
      listAtrr: [],
      keywords: '',
      page: 1
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.data.toNext=false

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page++;
    this.setData({
      gif: true
    })
    console.log(this.data.page)
    this.onShow();
    console.log('上啦啦')
    console.log(this.data.page)
  },
  //滑动移动事件
  handletouchmove: function (event) {
    var that = this;
    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    var tx = currentX - this.data.lastX
    var ty = currentY - this.data.lastY
    var text = ""
    //左右方向滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < -20) {
        text = "向左滑动"
        if (that.data.toright) {
          return
        } else {
          console.log(that.data.userId)
          if (that.data.rank == 1) {
            wx.showLoading({
              title: '加载中...',
            })
            that.setData({
              iconTask: 'zan-icon zan-icon-contact',
              theModule: '我的业务',
              toright: true,
              listAtrr: [],
              keywords: '',
              page: 1,
              toLeft:false,
              taskId: that.data.userId
            })
            that.onShow()
          } else {
            return
          }
        }


      }

      else if (tx > 20){
        text = "向右滑动"
        if (that.data.toLeft) {
          return
        } else {
          console.log(that.data.userId)
          if (that.data.rank == 1) {
            wx.showLoading({
              title: '加载中...',
            })
            that.setData({
              iconTask: 'zan-icon zan-icon-records',
              theModule: '所有业务',
              toright: false,
              toLeft:true,
              listAtrr: [],
              keywords: '',
              page: 1,
              taskId: ''
            })
            that.onShow()
          } else {
            return
          }
        }
      }
      


    }
    //上下方向滑动
    else {
      if (ty < 0)
        text = "向上滑动"
      else if (ty > 0)
        text = "向下滑动"
    }
    console.log(text)

    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
    this.setData({
      text: text,
    });
  },

  //滑动开始事件
  handletouchtart: function (event) {
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },
  //滑动结束事件
  handletouchend: function (event) {
    this.data.currentGesture = 0;
    this.setData({
      text: "没有滑动",
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    
  }
})