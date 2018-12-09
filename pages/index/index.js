// 获取weather函数
var weather = require('../../utils/weather.js');

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
    location: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取位置
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        // 成功获取位置后发送请求
        wx.request({
          url: `https://search.heweather.com/find?location=${longitude},${latitude}&key=33369e365fe84eb68876f52a2ae51cca`,
          success: res => {
            console.log(res.data.HeWeather6["0"].basic["0"])
            // 城市代码
            const id = res.data.HeWeather6["0"].basic["0"].cid;
            // 母城市
            const city = res.data.HeWeather6["0"].basic["0"].parent_city;
            // 子地区
            const location = res.data.HeWeather6["0"].basic["0"].location; 
            // set到地址显示
            this.setData({
              city,
              location
            })    
            // 三天的时间计算
            let util = require('../../utils/util.js');
            let time = util.formatDate(new Date());
            let date = util.getDates(7, time);
              console.log(date.slice(0, 3))
            this.setData({
              date: date.slice(0,3)
            })
            weather(id, city, this);
          }
        })
      },
      fail: res => {
        console.log('获取位置失败');
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 2000
        })
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