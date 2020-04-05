// pages/login/index.js
var app = getApp()
const WXAPI = require('apifm-wxapi')
Page({

  data: {
  },

  onLoad: function (options) {

  },
  getuserinfo(e){
    // console.log(e);
    // console.log(e.detail.userInfo.nickName);
    if(!e.detail.userInfo){
      return;
    }
    wx.login({
      success: function(res) {
        console.log(res)
        if (res.code) {
          WXAPI.register_complex({ 
            code: res.code,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
          })
          const code = res.code;
          WXAPI.login_wx(code).then(res => {
            if(res.data.token){
              wx.setStorageSync('userToken', {openid:res.data.openid,uid:res.data.uid,token:res.data.token});
              WXAPI.goodsFavList({token:res.data.token}).then(res => {
                // console.log(res.data)
                wx.setStorageSync("collect", res.data);
              })
              WXAPI.shippingCarInfo(res.data.token).then(res => {
                console.log(res)
                if(res.data){
                wx.setStorageSync("cart", res.data.items);
                }
              })
            }
          })
        } else{
          console.log('获取用户登录态失败！' + res.errMsg)
        }
        wx.setStorageSync('userInfo', {detail:e.detail.userInfo,code:res.code})
        wx.navigateBack({
          delta: 1
        })
      }
    });

    // var pages = getCurrentPages();
    // var beforePage = pages[pages.length - 2];
    // beforePage.changeData();
  },
  // //获得收藏列表存储到缓存中
  // getFavList(){
  //   const token = wx.getStorageSync("userToken").token;
  //   WXAPI.goodsFavList({token:token}).then(res => {
  //     // console.log(res.data)
  //     wx.setStorageSync("collect", res.data);
  //   })
  // }

})