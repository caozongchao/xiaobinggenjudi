Page({
    /**
     * 页面的初始数据
     */
    data: {
        show: true,
        keyword: "",
        region: "",
        birthday: "",
        gender: "",
        age: "",
        adult: "",
        zodiac: "",
        constellation: "",
    },
    onLoad: function (options) {},
    keyword: function (e) {
        var value = e.detail;
        this.setData({
            keyword: value,
        });
    },  
    search: function (e) {
        var that = this;
        wx.showToast({
            title: '正在加载',
            icon: 'loading',
            duration: 2000000
        });
        wx.request({
            url: 'https://api.guaqb.cn/music/id/card.php?id='+that.data.keyword,
            method: 'get',
            success: function (res) {
                wx.hideToast();
                console.log(res.data);
                that.setData({
                    show: true,
                    region: res.data.region,
                    birthday: res.data.birthday,
                    gender: res.data.gender,
                    age: res.data.age,
                    adult: res.data.adult,
                    zodiac: res.data.zodiac,
                    constellation: res.data.constellation,
                });
            },
            fail: function (e) {
                wx.showToast({
                    title: '网络异常！',
                    duration: 2000
                });
            },
        });
    }
});