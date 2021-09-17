// index.js
// 获取应用实例
const app = getApp()
var util = require('../../component/util.js')
Page({
    data: {
        weather: {},
        city: "未知",
        summary: "未知",
    },
    // 事件处理函数
    onLoad() {
        this.onLocalBtnClick();
    },
    toWatermark: function (event) {
        wx.navigateTo({
            url: '/pages/watermark/index',
        })
    },
    toQuan: function (event) {
        wx.navigateTo({
            url: '/pages/quan/index',
        })
    },
    toIdcard: function (event) {
        wx.navigateTo({
            url: '/pages/idcard/index',
        })
    },
    toJoke: function (event) {
        wx.navigateTo({
            url: '/pages/joke/index',
        })
    },
    toDujitang: function (event) {
        wx.navigateTo({
            url: '/pages/dujitang/index',
        })
    },
    toSong: function (event) {
        wx.navigateTo({
            url: '/pages/song/index',
        })
    },
    takeout: function (event) {
        wx.showToast({
            title: '努力加载中',
            icon: 'loading',
            duration: 2000000
        });
        var type
        var appId
        if (event.currentTarget.dataset.sort == 1) {
            type = 'meituan'
            appId = 'wxde8ac0a21135c07d'
        } else if (event.currentTarget.dataset.sort == 2) {
            type = 'eleme'
            appId = 'wxece3a9a4c82f58c9'
        } else if (event.currentTarget.dataset.sort == 4) {
            type = 'meituanshangou'
            appId = 'wxde8ac0a21135c07d'
        }
        var that = this
        wx.request({
            url: 'https://yiquan.5191.site/mini.php',
            method: 'POST',
            data: {
                type: type
            },
            dataType: 'json',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            success: function (res) {
                wx.hideToast();
                wx.navigateToMiniProgram({
                    appId: appId,
                    path: res.data.data,
                    success: function (t) {}
                })
            },
            fail: function (e) {
                wx.hideToast();
                wx.showToast({
                    title: '网络异常！',
                    duration: 2000
                });
            },
        })
    },
    onLocalBtnClick() {
        this.getLocalCityWeacher();
    },
    getLocalCityWeacher() {
        wx.showToast({
            title: '正在获取位置信息',
            icon: 'loading',
            duration: 2000000,
        });
        // 获取当前经纬度
        wx.getLocation({
            success: (res) => {
                this.searchByLocation(res.latitude, res.longitude);
            },
            fail: () => {
                wx.hideToast();
                wx.showModal({
                    title: '定位失败',
                    content: '操作频繁会导致定位失败',
                    showCancel: false,
                });
            }
        });
    },
    searchByLocation(latitude, longitude) {
        wx.showToast({
            title: '正在获取天气',
            icon: 'loading',
            duration: 2000000
        });
        // 通过经纬度获取天气数据
        wx.request({
            url: 'https://devapi.qweather.com/v7/weather/now?key=57bb4486ac284fe4818c841b97c7e78b&location=' + longitude + ',' + latitude,
            // data: {},
            // header: config.request.header,
            success: (res) => {
                // 保存天气数据
                console.log(res.data.fxLink);
                wx.hideToast();
                this.setData({
                    weather: this.processData(latitude, longitude, res.data)
                });
            },
            fail: () => {
                wx.hideToast();
                wx.showModal({
                    title: '网络超时',
                    content: '获取天气数据失败，请重新试一下',
                    showCancel: false
                });
            }
        });
    },
    processData(latitude, longitude, data) {
        const weatherInfo = {};
        // 城市信息
        wx.request({
            url: 'https://geoapi.qweather.com/v2/city/lookup?key=57bb4486ac284fe4818c841b97c7e78b&location=' + longitude + ',' + latitude,
            async: false,
            success: (res) => {
                this.setData({city:res.data.location[0].name});
            }
        });
        wx.request({
            url: 'https://devapi.qweather.com/v7/minutely/5m?key=57bb4486ac284fe4818c841b97c7e78b&location=' + longitude + ',' + latitude,
            async: false,
            success: (res) => {
                this.setData({summary:res.data.summary});
            }
        });
        // 天气信息
        weatherInfo.obsTime = this.gettime(util.formatTime(new Date(data.now.obsTime)));
        weatherInfo.temp = data.now.temp;
        weatherInfo.feelsLike = data.now.feelsLike;
        weatherInfo.icon = '<image src="/statics/weather-icon-S1/color-64/'+data.now.icon+'.png"></image>';
        weatherInfo.text = data.now.text;
        weatherInfo.windDir = data.now.windDir;
        weatherInfo.windScale = data.now.windScale;
        weatherInfo.humidity = data.now.humidity;
        weatherInfo.precip = data.now.precip;
        weatherInfo.vis = data.now.vis;
        console.log(weatherInfo);
        return weatherInfo;
    },
    gettime(data) {
        let value = 
            this.checkTime(data.getHours()) + ':' +
            this.checkTime(data.getMinutes()) + ':' +
            this.checkTime(data.getSeconds());
        return value
    },
    checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i;
    },
})