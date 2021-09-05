Page({
    /**
     * 页面的初始数据
     */
    data: {
        activeNames: ['1'],
        show: true,
        keyword: '',
        url: "",
        tokenShow: false,
        token: "",
        usage: "",
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
        that.setData({
            tokenShow: false
        });
        wx.showToast({
            title: '正在加载',
            icon: 'loading',
            duration: 2000000
        });
        wx.request({

            url: 'https://yiquan.5191.site/ajax.php',
            method: 'post',
            data: {
                content: that.data.keyword
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                wx.hideToast();
                var arr = Object.keys(res.data.data);
                if(arr.length == 3){
                    that.setData({
                        show: true,
                        url: res.data.data.url,
                        tokenShow: true,
                        token: res.data.data.token,
                        usage: res.data.data.usage,
                    });
                }else{
                    that.setData({
                        show: true,
                        url: res.data.data.url,
                        usage: res.data.data.usage,
                    });
                }
            },
            fail: function (e) {
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