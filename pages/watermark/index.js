Page({
    /**
     * 页面的初始数据
     */
    data: {
        activeNames: ['1'],
        keyword: '',
        show: true,
        avatar: "",
        video: "",
        music: "",
    },
    onLoad: function (options) {},
    onChange(event) {
        this.setData({
            activeNames: event.detail,
        });
    },
    keyword: function (e) {
        var value = e.detail;
        this.setData({
            keyword: value,
        });
    },
    search: function (e) {
        var that = this;
        var keyword = that.data.keyword;
        let regex = /http[s]?:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&:\-\+\%]*[/]*/;
        var url = keyword.match(regex)[0];
        wx.showToast({
            title: '正在解析视频',
            icon: 'loading',
            duration: 2000000
        });
        wx.request({
            url: 'https://wm.5191.site/gateway.php',
            method: 'post',
            data: {
                url: url
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                wx.hideToast();
                console.log(res.data);
                if (res.data.code == 200) {
                    that.setData({
                        show: true,
                        avatar: res.data.data.avatar,
                        video: res.data.data.url,
                        // music: res.data.data.music.url,
                    });
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'error',
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
        });
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
});