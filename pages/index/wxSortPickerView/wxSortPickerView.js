Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:'ckzpp2',
    tipText:'人车合一',
    moduleArr: [false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
var that=this;
   var listData=[]
   listData.push({ name: '查勘照片', class: 'imglistTit', dataName: '' })
   listData.push({ name: '人车合一', class:'listActive',dataName:'ckzp1'})
   listData.push({ name: '车架号', class: 'imgListName', dataName: 'ckzp2' })
   listData.push({ name: '环境照片', class: 'imgListName', dataName: 'ckzp3' })
   listData.push({ name: '验车照片', class: 'imgListName', dataName: 'ckzp4' })
   listData.push({ name: '车损照片', class: 'imgListName', dataName: 'ckzp5' })
   listData.push({ name: '旧伤照片', class: 'imgListName', dataName: 'ckzp6' })
   listData.push({ name: '公用单证', class: 'imglistTit', dataName: '' })
   listData.push({ name: '事故证明', class: 'imgListName', dataName: 'gydz1' })
   listData.push({ name: '索赔申请书', class: 'imgListName', dataName: 'gydz2' })
   listData.push({ name: '行驶证', class: 'imgListName', dataName: 'gydz3' })
   listData.push({ name: '驾驶证', class: 'imgListName', dataName: 'gydz4' })
   listData.push({ name: '查勘报告', class: 'imgListName', dataName: 'gydz5' })
   listData.push({ name: '个案签报', class: 'imgListName', dataName: 'gydz6' })
   listData.push({ name: '拒赔材料', class: 'imgListName', dataName: 'gydz7' })
   listData.push({ name: '从业资格证', class: 'imgListName', dataName: 'gydz8' })
   listData.push({ name: '法院判决书', class: 'imgListName', dataName: 'gydz9' })
   listData.push({ name: '调查单证', class: 'imgListName', dataName: 'gydz10' })
   listData.push({ name: '支付单证', class: 'imglistTit', dataName: '' })
   listData.push({ name: '收款方账户信息', class: 'imgListName', dataName: 'zfdz1' })
   listData.push({ name: '收款方身份证明', class: 'imgListName', dataName: 'zfdz2' })
   that.setData({
     listArr: listData
   })
 
   
  },
  changeView:function(e){
    var that=this;
    console.log(e)
    if (e.currentTarget.dataset.name=='')
    return
    for (var i in that.data.listArr){
      if (e.currentTarget.dataset.name == that.data.listArr[i].dataName){
        var backTemp = 'listArr[' + i +'].class'
        that.setData({
          tipText: that.data.listArr[i].name,
          [backTemp]:'listActive',
          toView: that.data.listArr[i].dataName,
          locationArr:i
        })
      } else if (that.data.listArr[i].dataName==''){
        
      }else{
        var backTemp = 'listArr[' + i + '].class'
        that.setData({
          [backTemp]: 'imgListName'
        })
      }
    }
    console.log(that.data.locationArr)
    for (var j in that.data.moduleArr){
      if (j== that.data.locationArr){
       
        var moduleArrTemp ='moduleArr['+j+']'
        that.setData({
          [moduleArrTemp]:true
        })
        console.log(that.data.moduleArr[j])
      }else{
        var moduleArrTemp = 'moduleArr[' + j + ']'
        that.setData({
          [moduleArrTemp]: false
        })
        console.log(that.data.moduleArr[j])
      }
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
function confirmModule(){

}