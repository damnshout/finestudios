// pages/test/test.js
var app = getApp()
const WXAPI = require('apifm-wxapi')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getCode:function(e){
    WXAPI.smsValidateCode({mobile:18664588201})
  }
})