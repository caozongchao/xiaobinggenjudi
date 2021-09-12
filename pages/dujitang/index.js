// index.js
// 获取应用实例
const app = getApp()
Page({
    data: {
        dujitang: ""
    },
    // 事件处理函数
    onLoad() {
        this.request();
    },
    request: function (event) {
        wx.showToast({
            title: '努力加载中',
            icon: 'loading',
            duration: 2000000
        });
        var that = this
        wx.request({
            url: 'https://wm.5191.site/dujitang.php',
            method: 'get',
            dataType: 'json',
            success: function (res) {
                console.log(res.data);
                wx.hideToast();
                if(res.data.code){
                    that.setData({
                        dujitang: res.data.data
                    });
                }else{
                    wx.showToast({
                        title: '网络异常！',
                        duration: 2000
                    });
                }
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
    next: function () {
        this.request();
    }
})