// 获取weather函数
var weather = require('../../utils/weather.js');
// 获取地理位置函数
var location = require('../../utils/location.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前体感温度
    fl: '',
    // 当前温度
    tmp: '',
    // 更新时间
    update: '',
    // 当前天气状况
    cond_txt: '',
    // 风向
    wind_dir: '',
    // 风速
    wind_spd: '',
    // 能见度
    vis: '',
    // 空气质量
    qlty: '',
    // 日出时间
    sr: '',
    // 日落时间
    ss: '',
    // 各种指数
    comf: '',
    cw: '',
    drsg: '',
    flu: '',
    sport: '',
    trav: '',
    uv: '',
    air: '',
    // 未来三天预报
    // 第一天
    future: '',
    // 存储日期
    date: '',
    // 地理位置
    city: '',
    location: '',
    // 判断是否渲染主界面
    complete: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '等等我~',
    })
    // 获取地点和天气的函数
    location(this);
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
    // 下拉刷新重新获取天气数据
    if(!this.data.complete) {
      wx.showLoading({
        title: '确认打开了哦~',
      })
    }else {
      wx.showLoading({
        title: '正在刷新~',
      })
    }
    location(this);  
    setTimeout(wx.stopPullDownRefresh, 2000);
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