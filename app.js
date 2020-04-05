//app.js
const WXAPI = require('apifm-wxapi')
const CONFIG = require('config.js')
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  globalData: {
    token:null,
  },
  onLaunch: function(options){
    WXAPI.init(CONFIG.subDomain) // 从根目录的 config.js 文件中读取
  },
  // relogin(){
  //   while(this.data.token == true){
  //     wx.login({
  //       success: function(res) {
  //         const code = res.code;
  //         WXAPI.login_wx(code).then(res => {
  //           if(res.res.data.token){
  //             wx.setStorageSync('userToken', {openid:res.data.openid,uid:res.data.uid,token:res.data.token});
  //             WXAPI.goodsFavList({token:res.data.token}).then(res => {
  //               // console.log(res.data)
  //               wx.setStorageSync("collect", res.data);
  //             })
  //             WXAPI.shippingCarInfo(res.data.token).then(res => {
  //               console.log(res)
  //               if(res.data){
  //               wx.setStorageSync("cart", res.data.items);
  //               }
  //             })
  //           }

  //         })
  //       }
  //     })
  //   }

  // }

});