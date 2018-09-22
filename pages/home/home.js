// pages/home/home.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagetitle: "主页",
    current: '0',
    locationview: false,
    items: [
      {
        title: "good1",
        desc: "你大爷",
        price: "2.00",
        img: "/asset/imgs/1.jpg"
      },
      {
        title: "good1",
        desc: "你妹的",
        price: "2.00",
        img: "/asset/imgs/2.jpg"
      }, {
        title: "good2",
        desc: "你大爷",
        price: "2.00",
        img: "/asset/imgs/1.jpg"
      }, {
        title: "good1",
        desc: "你妹的",
        price: "2.00",
        img: "/asset/imgs/2.jpg"
      }, {
        title: "good2",
        desc: "你大爷",
        price: "2.00",
        img: "/asset/imgs/2.jpg"
      }, {
        title: "good1",
        desc: "你妹的",
        price: "2.00",
        img: "/asset/imgs/1.jpg"
      }, {
        title: "good2",
        desc: "你大爷",
        price: "2.00",
        img: "/asset/imgs/2.jpg"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: this.data.pagetitle
    })
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

  },
  locationicon(){
    console.log("location");
    this.setData({
      locationview: true
    });
  },
  handleClose1() {
    this.setData({
      locationview: false
    });
  },
  onSearch(){
    console.log("onsearch");
  },
  onTabsItemTap(e){
    console.log(e);
    var item = e.currentTarget.dataset.item; 
    var title = e.currentTarget.dataset.item.title;
    var desc = e.currentTarget.dataset.item.desc;
    var price = e.currentTarget.dataset.item.price;
    var img = e.currentTarget.dataset.item.img;
    wx.navigateTo({
      //特殊符号可能需要转码
      url: '/pages/item/item?detail='+ JSON.stringify(item),
      success:function(res){

      },
      fail: function(){

      },
      complete:function(){

      }
    })
  },

  postclick() {
      wx.navigateTo({
        url: '/pages/post/post',
      })

  },

  handleChange({ detail }) {
    if (detail.key == 0) {
      this.setData({
        pagetitle: "主页",
        current: detail.key
      });
      }
    else if(detail.key==1){
      this.setData({
        pagetitle: "个人中心",
        current: detail.key
      });
    }
    //标题
    wx.setNavigationBarTitle({
      title: this.data.pagetitle
    })

  }

})