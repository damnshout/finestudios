// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo:userInfo
    })
  },
  onShow: function(){
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo:userInfo
    })
  },
  changeData: function () {
    console.log("refresh")
    this.onLoad();//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
    
    },
  
  handleGofav: function(e) {
    this.loginFirst(e,'/pages/fav/fav')
  },
  handleGobill: function(e) {
    this.loginFirst(e,'/pages/bill/bill')

    // // console.log(e)
    // // app.globalData.community_id_for_switch_tab = e.currentTarget.dataset;
    // wx.navigateTo({
    //   url: '/pages/bill/bill'
    // })
  },
  handleGoadd: function(e) {
    this.loginFirst(e,'/pages/address/address')

    // // console.log(e)
    // // app.globalData.community_id_for_switch_tab = e.currentTarget.dataset;
    // wx.navigateTo({
    //   url: '/pages/address/address'
    // })
  },
  handleGologin: function(e) {
    this.loginFirst(e,'/pages/login/login')

    // // console.log(e)
    // // app.globalData.community_id_for_switch_tab = e.currentTarget.dataset;
    // wx.navigateTo({
    //   url: '/pages/login/login'
    // })
  },
  loginFirst(e,url_address){
    const userInfo = wx.getStorageInfoSync("userInfo");
    // console.log(userInfo)
    const goods_id = e.currentTarget.dataset.index;
    if(!userInfo.keys.length){
      // console.log("in")
      wx.navigateTo({
        url: '/pages/login/login'
      });
    }else{
      wx.navigateTo({
        url: url_address
      })
    }
  }

})