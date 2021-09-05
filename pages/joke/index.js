// index.js
// 获取应用实例
const app = getApp()
Page({
    data: {
        jokes: []
    },
    // 事件处理函数
    onLoad() {
        this.getJoke();
    },
    getJoke: function (event) {
        wx.showToast({
            title: '努力加载中',
            icon: 'loading',
            duration: 2000000
        });
        var that = this
        wx.request({
            url: 'https://www.mxnzp.com/api/jokes/list/random?app_id=hm9m8hlruiphfmmm&app_secret=bTdpTDNxUlBxVFZCdTZ5aGY3UTZWQT09',
            method: 'get',
            dataType: 'json',
            success: function (res) {
                console.log(res.data);
                wx.hideToast();
                that.setData({
                    jokes: res.data.data
                });
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
    onPullDownRefresh: function () {
        this.getJoke();
        wx.stopPullDownRefresh();
    }
})