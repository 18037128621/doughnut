// miniprogram/pages/advance/advance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    title: '',
    content: '',
    user: {},
  },

  /**
   *  获取填写的内容
   */
  getTextAreaContent: function (event) {
    this.data.content = event.detail.value;
  },
 
  /**
   * 发布
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value['input-content'])
    this.data.content = e.detail.value['input-content'];
    console.log("内容--->" + this.data.content.trim());
    // this.data.user = event.detail.userInfo;
    if (this.data.canIUse) {
      if (this.data.title.trim() != '') {
        this.saveDataToServer();
      } else if (this.data.content.trim() != '') {
        this.saveDataToServer();
      } else {
        wx.showToast({
          title: '给我们反馈点意见，让我们一起变得更好~',
        })
      }

    } else {
      this.jugdeUserLogin();
    }
  },
  /**
   * 保存到发布集合中
   */
  saveDataToServer: function (event) {
    var that = this;
    that.showTipAndSwitchTab();
    // const db = wx.cloud.database();
    // const topic = db.collection('topic')
    // db.collection('topic').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     content: that.data.content,
    //     date: new Date(),
    //     images: that.data.images,
    //     user: that.data.user,
    //     isLike: that.data.isLike,
    //   },
    //   success: function (res) {
    //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //     // 清空，然后重定向到首页
    //     console.log("success---->" + res)
    //     // 清空数据
    //     that.data.content = "";
    //     that.data.images = [];

    //     that.setData({
    //       textContent: '',
    //       images: [],
    //     })

    //     that.showTipAndSwitchTab();

    //   },
    //   complete: function (res) {
    //     console.log("complete---->" + res)
    //   }
    // })
  },
  /**
   * 添加成功添加提示，切换页面
   */
  showTipAndSwitchTab: function (event) {
    wx.showToast({
      title: '反馈成功，后台会加急处理的~',
    })
    wx.navigateBack({
      url: '../home/home',
    })
    console.log("============")
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.jugdeUserLogin();
  },
  /**
   * 判断用户是否登录
   */
  jugdeUserLogin: function (event) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {

              that.data.user = res.userInfo;
              console.log(that.data.user)
            }
          })
        }
      }
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

  }
})