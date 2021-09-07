// index.js
// 获取应用实例
const app = getApp()
Page({
    data: {
        jokes: []
    },
    // 事件处理函数
    onLoad() {
        this.newJoke();
    },
    newJoke: function (event) {
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
        this.newJoke();
        wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
        this.continueJoke();
    },
    continueJoke: function (event) {
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
                var arr1 = that.data.jokes;
                var arr2 = res.data.data;
                arr1 = arr1.concat(arr2);
                wx.hideToast();
                that.setData({
                    jokes: arr1
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
    textPaste(e) {
        var tempData = e.target.dataset.url
        wx.showToast({
            title: '复制成功',
        })
        wx.setClipboardData({
            data: tempData,
            success: function (res) {
                wx.getClipboardData({ //这个api是把拿到的数据放到电脑系统中的
                    success: function (res) {
                        console.log(res.data) // data
                    }
                })
            }
        })
    },
})