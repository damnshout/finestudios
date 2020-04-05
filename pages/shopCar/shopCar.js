// pages/shopCar/shopCar.js
var app = getApp()
const WXAPI = require('apifm-wxapi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart : [],
    token: null,
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
    editStauts:true,
    deleteKey:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync("userToken").token;
    this.setData({token})
    this.getCarList();
  },
  onTabItemTap(item) {
    const token = wx.getStorageSync("userToken").token;
    this.setData({token})
    this.getCarList();
  },
  onShow: function(){
    const token = wx.getStorageSync("userToken").token;
    this.setData({token})
    this.getCarList();
  },
  clearall:function(e){
    wx.clearStorageSync();
  },

  getCarList:function(e){
    let cart = wx.getStorageSync("cart");
    this.setData({
      cart
    })
  },

  onPullDownRefresh: function () {
    const token = wx.getStorageSync("userToken").token;
    this.setData({token})
    this.getCarList();
    var my_time = new Date().getTime();

    if(this.data.cart[0]){
      wx.stopPullDownRefresh();
    }
    
  },
  // 商品的选中
  handeItemChange(e) {
    // 1 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组 
    let { cart } = this.data;
    console.log(cart)
    // 3 找到被修改的商品对象
    let index = cart.findIndex(v => v.goodsId === goods_id);
    // 4 选中状态取反
    cart[index].score = !cart[index].score;
    this.setCart(cart);

  },
    // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cart) {
      let allChecked = true;
      // 1 总价格 总数量
      let totalPrice = 0;
      let totalNum = 0;
      cart.forEach(v => {
        if (v.score) {
          totalPrice += v.number * v.price;
          totalNum += v.number;
        } else {
          allChecked = false;
        }
      })
      // 判断数组是否为空
      allChecked = cart.length != 0 ? allChecked : false;
      this.setData({
        cart,
        totalPrice, totalNum, allChecked
      });
      wx.setStorageSync("cart", cart);
    },
    // 商品全选功能
    handleItemAllCheck() {
      // 1 获取data中的数据
      let { cart, allChecked } = this.data;
      // 2 修改值
      allChecked = !allChecked;
      // 3 循环修改cart数组 中的商品选中状态
      cart.forEach(v => v.score = allChecked);
      // 4 把修改后的值 填充回data或者缓存中
      this.setCart(cart);
    },
    // 商品数量的编辑功能
    async handleItemNumEdit(e) {
      // 1 获取传递过来的参数 
      const { operation, id } = e.currentTarget.dataset;
      // 2 获取购物车数组
      let { cart } = this.data;
      // 3 找到需要修改的商品的索引
      const index = cart.findIndex(v => v.goodsId === id);
      // 4 判断是否要执行删除
      if (cart[index].number === 1 && operation === -1) {
        // 4.1 弹窗提示
        let operation = 0
      } else {
        // 4  进行修改数量
        cart[index].number += operation;
        // 5 设置回缓存和data中
        this.setCart(cart);
      }
    },
    // 点击 结算 
    async handlePay(){
      // // 1 判断收货地址
      const {totalNum}=this.data;
      // if(!address.userName){
      //   await showToast({title:"您还没有选择收货地址"});
      //   return;
      // }
      // // 2 判断用户有没有选购商品
      if(totalNum===0){
        wx.showToast({
          title: '您还没选择商品',
          icon: 'none',
          mask: true
        });
        return ;
      }
      // 3 跳转到 支付页面
      wx.navigateTo({
        url: '/pages/bill/bill'
      });
        
    },
    editGoods(){
      let editStauts = !this.data.editStauts
      this.setData({
        editStauts
      })
    },
    handleDelete(){
      let token = this.data.token;
      let deList = [];
      let cart = wx.getStorageSync('cart')|| [];
      for (let i = cart.length - 1 ;i >= 0;i--){
        // console.log(cart[i].score)
        if(cart[i].score == true){
          WXAPI.shippingCarInfoRemoveItem(token, cart[i].key)
          cart.splice(i, 1);
          this.setCart(cart);
          // console.log(i)
          // deList.push(i)
        }
      }
    }
})