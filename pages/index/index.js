//Page Object
var app = getApp()
const WXAPI = require('apifm-wxapi')
Page({
  data: {
    goodList: []
  },
  //options(Object)
  onLoad: function(options){
    // WXAPI.goodsCategory({key:"value"}).then(res => {

    //   console.log('请在控制台看打印出来的数据：', res)

    // })
    // WXAPI.goods({}).then(res => {
    //   console.log(res)
		// })
    this.getGoodList();
  },
  onShow: function () {

    this.getGoodList();
  },
  // onTabItemTap(item) {
  //   // 可以在此做自己需求的逻辑操作，如点击出现弹窗等
  //   this.getGoodList();
  // },

  getGoodList(){
    var community_id = wx.getStorageSync("cate");
    if(community_id){
      WXAPI.goods({categoryId:community_id.index}).then(res => {
        console.log(res)
        this.setData({goodList:res})
      })

      wx.removeStorageSync("cate");
    }else{
      WXAPI.goods({}).then(res => {
        console.log(res)
        this.setData({goodList:res})
      })
    }

  },

  handleTodetail:function(e){
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
        url: '/pages/goodInfo/goodInfo?goods_id='+goods_id
      });
    }
  }

});