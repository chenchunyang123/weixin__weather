// 天气请求函数(城市id，城市名称，this小程序对象)
var weather = function(id, city, traget) {
  // 实况天气
  wx.request({
    url: `https://free-api.heweather.com/s6/weather/now?location=${id}&key=33369e365fe84eb68876f52a2ae51cca`,
    success: res => {
      let result = res.data.HeWeather6[0];
      console.log(res.data.HeWeather6[0])
      traget.setData({
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
    url: `https://free-api.heweather.com/s6/air/now?location=${city}&key=33369e365fe84eb68876f52a2ae51cca`,
    success: res => {
      let result = res.data.HeWeather6[0].air_now_city;
      console.log(result)
      traget.setData({
        qlty: result.qlty
      })
    }
  })
  // 日出日落时间
  wx.request({
    url: `https://free-api.heweather.com/s6/solar/sunrise-sunset?location=${id}&key=33369e365fe84eb68876f52a2ae51cca`,
    success: res => {
      let result = res.data.HeWeather6[0].sunrise_sunset["0"];
      console.log(result)
      traget.setData({
        sr: result.sr,
        ss: result.ss
      })
    }
  })
  // 生活指数
  wx.request({
    url: `https://free-api.heweather.com/s6/weather/lifestyle?location=${id}&key=33369e365fe84eb68876f52a2ae51cca`,
    success: res => {
      let result = res.data.HeWeather6[0].lifestyle;
      console.log(result);
      traget.setData({
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
    url: `https://free-api.heweather.com/s6/weather/forecast?location=${id}&key=33369e365fe84eb68876f52a2ae51cca`,
    success: res => {
      let result = res.data.HeWeather6[0].daily_forecast;
      console.log(result);
      traget.setData({
        future: result
      })
    }
  })
}

// 向外暴露
module.exports = weather;