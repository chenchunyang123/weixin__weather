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
    date: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实况天气
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now?location=北京&key=33369e365fe84eb68876f52a2ae51cca',
      success: res => {
        let result = res.data.HeWeather6[0];
        console.log(res.data.HeWeather6[0])
        this.setData({
          fl: result.now.fl,
          update: result.update.loc,
          cond_txt: result.now.cond_txt,
          wind_dir: result.now.wind_dir,
          wind_spd: result.now.wind_spd,
          vis: result.now.vis,
          tmp: result.now.tmp
        })
      }
    })
    // 空气质量
    wx.request({
      url: 'https://free-api.heweather.com/s6/air/now?location=北京&key=33369e365fe84eb68876f52a2ae51cca',
      success: res => {
        let result = res.data.HeWeather6[0].air_now_city;
        console.log(result)
        this.setData({
          qlty: result.qlty
        })
      }
    })
    // 日出日落时间
    wx.request({
      url: 'https://free-api.heweather.com/s6/solar/sunrise-sunset?location=北京&key=33369e365fe84eb68876f52a2ae51cca',
      success: res => {
        let result = res.data.HeWeather6[0].sunrise_sunset["0"];
        console.log(result)
        this.setData({
          sr: result.sr,
          ss: result.ss
        })
      }
    })
    // 生活指数
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/lifestyle?location=北京&key=33369e365fe84eb68876f52a2ae51cca',
      success: res => {
        let result = res.data.HeWeather6[0].lifestyle;
        console.log(result);
        this.setData({
          comf: result[0].txt,
          cw: result[6].txt,
          drsg: result[1].txt,
          flu: result[2].txt,
          sport: result[3].txt,
          trav: result[4].txt,
          uv: result[5].txt,
          air: result[7].txt
        })
      }
    })
    // 未来三天天气
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/forecast?location=北京&key=33369e365fe84eb68876f52a2ae51cca',
      success: res => {
        let result = res.data.HeWeather6[0].daily_forecast;
        console.log(result);
        this.setData({
          future: result
        })
      }
    })
    // 三天的时间计算
    let util = require('../../utils/util.js');
    let time = util.formatDate(new Date());
    let date = util.getDates(7, time);
      console.log(date.slice(0, 3))
    this.setData({
      date: date.slice(0,3)
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