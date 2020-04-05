// pages/category/index.js
var app = getApp()
const WXAPI = require('apifm-wxapi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.handleItem();
    this.getCatelog();
  },

  getCatelog:function(e){
    WXAPI.goodsCategory().then(res => {
      this.setData({
        cateList:res
      })
    })

  },

  handleGoIndex: function(e) {
    // console.log(e)
    // app.globalData.community_id_for_switch_tab = e.currentTarget.dataset;
    wx.setStorageSync("cate", e.currentTarget.dataset);
    
    wx.switchTab({
    
    url: '/pages/index/index'
    
    })
    
  }
})