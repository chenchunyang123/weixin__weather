let weather = require('./weather.js');
let util = require('./util.js');

// 获取位置天气的整个函数
let location = function(target) {
  wx.getLocation({
    type: 'gcj02',
    success: res => {
      let latitude = res.latitude;
      let longitude = res.longitude;
      // 成功获取位置后发送请求
      wx.request({
        url: `https://search.heweather.com/find?location=${longitude},${latitude}&key=33369e365fe84eb68876f52a2ae51cca`,
        success: res => {
          console.log(res.data.HeWeather6["0"].basic["0"])
          // 城市代码
          let id = res.data.HeWeather6["0"].basic["0"].cid;
          // 母城市
          let city = res.data.HeWeather6["0"].basic["0"].parent_city;
          // 子地区
          let location = res.data.HeWeather6["0"].basic["0"].location;
          // set到地址显示
          target.setData({
            city,
            location,
            complete: 'true'
          })
          // 三天的时间计算
          let time = util.formatDate(new Date());
          let date = util.getDates(7, time);
          console.log(date.slice(0, 3))
          target.setData({
            date: date.slice(0, 3)
          })
          // 获取各种天气参数
          weather(id, city, target);
          // 加载完关闭loading
          wx.hideLoading();
        }
      })
    },
    fail: res => {
      console.log('获取位置失败');
      // 加载失败了先关闭loading，再显示提示
      wx.hideLoading();
      target.setData({
        complete: ''
      })
    }
  })
}

module.exports = location;