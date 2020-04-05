// pages/fav/fav.js
var app =  getApp();
const WXAPI = require("apifm-wxapi")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.favlist()
  },
  favlist:function(){
    this.setData({
      favlist:wx.getStorageSync("collect")
    })
  }
})