// pages/goodInfo/goodInfo.js
var app =  getApp();
const WXAPI = require("apifm-wxapi");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_detail:{},
    goodsInfo:{},
    tapAdd:null,
    userChosen:{colorid:null,sizeid:null,color:null,size:null,num:null},
    isCollect:false,
    token:null,
    showPop: false,
    animationData: {},
    buttonState:{
      button1:null,
      button2:null
    }   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goods_id = options.goods_id;
    WXAPI.goodsDetail(goods_id).then(res => {
      console.log(res);
      this.setData({
        goods_detail:{swiper_pics:res.data.pics,
                      detail:res.data.content,
                      goodsProperties:res.data.properties,
                      goodsName:res.data.basicInfo.name,
                      originPrices:res.data.basicInfo.originalPrice,
                      characteristic:res.data.basicInfo.characteristic
        },
        goodsInfo:{
          goodsId:res.data.basicInfo.id,
          goodsName:res.data.basicInfo.name,
          pic:res.data.basicInfo.pic
        }
      })
    })
    const token = wx.getStorageSync("userToken").token;  
    this.setData({
      token:token
    })
  },

  handleCartAdd:function(){
    this.setData({
      showPop:true
    })
  },
  confirm_addCart:function(){
    const token = this.data.token;
    var goodsId = this.data.goodsInfo.goodsId;
    var number = this.data.userChosen.num || 1;
    var colorId = this.data.userChosen.colorid;
    var color = this.data.userChosen.color;
    var size = this.data.userChosen.size;
    var sizeId = this.data.userChosen.sizeid;
    // console.log(number)
    var sku = [{
      "optionId": colorId,
      "optionValueId": color
    },{
      "optionId": sizeId,
      "optionValueId": size
    }]
    WXAPI.shippingCarInfoAddItem(token, goodsId, number, sku).then(res => {
      console.log(res)
      wx.showToast({
        title: '加入购物车成功',
        icon: 'success',
        mask: true
      });
      WXAPI.shippingCarInfo(token).then(res => {
        // console.log(res)
        wx.setStorageSync("cart", res.data.items);
      })
      this.hideModal();
    })
    
  },
  //收藏处理功能
  handleCollect(){
    const token = this.data.token.token;
    var goodsId = this.data.goodsInfo.goodsId;
    let isCollect=false;
    // 1 获取缓存中的商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    // 2 判断该商品是否被收藏过
    let index=collect.findIndex(v=>{
      // console.log(v.goodsId)
      return v.goodsId==goodsId});
    // 3 当index！=-1表示 已经收藏过 
    console.log(index)
    if(index!==-1){
      // 能找到 已经收藏过了  在数组中删除该商品
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
      WXAPI.goodsFavPut(token, goodsId).then(res => {
        console.log("取消成功")
      })
        
    }else{
      // 没有收藏过
      collect.push(this.data.goodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
      WXAPI.goodsFavDelete(token, goodsId).then(res => {
        console.log("收藏成功")
      })
    }
    // 4 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5 修改data中的属性  isCollect
    this.setData({
      isCollect
    })
  },
  // 显示底部弹层
  showModal: function() {
    var _this = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      delay: 0
    })
    _this.animation = animation
    animation.translateY(300).step()
    _this.setData({
      animationData: animation.export(),
      showPop: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      _this.setData({
        animationData: animation.export()
      })
    }.bind(_this), 50)
  },
  // 隐藏底部弹层
  hideModal: function() {
    var _this = this;
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    _this.animation = animation
    animation.translateY(300).step()
    _this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      _this.setData({
        animationData: animation.export(),
        showPop: false
      })
    }.bind(this), 200)
  },
  select1_change(e){
    let index = e.currentTarget.dataset.index;
    let button = 'buttonState.button1'
    this.setData({
      [button]:index
    })
    var color = 'userChosen.color'
    var colorId = 'userChosen.colorid'
    this.setData({
      [color]: e.currentTarget.dataset.color,
      [colorId]: e.currentTarget.dataset.colorid
    })
  },
  select2_change(e){
    let index = e.currentTarget.dataset.index;
    let button = 'buttonState.button2'
    this.setData({
      [button]:index
    })
    var size = 'userChosen.size'
    var sizeId = 'userChosen.sizeid'

    this.setData({
      [size]: e.currentTarget.dataset.size,
      [sizeId]: e.currentTarget.dataset.sizeid
    })
  },
  bindnuminput(e){
    // console.log(e.detail.value)
    let num = 'userChosen.num'
    this.setData({
      [num]: e.detail.value,
    })

  }

})