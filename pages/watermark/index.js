Page({
    /**
     * 页面的初始数据
     */
    data: {
        activeNames: ['1'],
        keyword: '',
        show: true,
        video: "",
        value: "",
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
                        video: res.data.data.url,
                        value: "点击下载",
                        // avatar: res.data.data.avatar,
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
    handleDownload(e) {
        let link = e.currentTarget.dataset.url;
        if(!link){
            return false;
        }
        setTimeout(function () {
            wx.showToast({
                title: '下载中',
                icon: 'loading',
                duration: 9999999,
                mask: true
            })
        }, 0);
        let finalUrl = 'https://wm.5191.site/d.php?url='+encodeURIComponent(link);
        console.log(finalUrl);
        let fileName = new Date().valueOf();
        // 此处监听进度条 downloadTask 
        const downloadTask = wx.downloadFile({
            url: finalUrl,
            filePath: wx.env.USER_DATA_PATH + '/' + fileName + '.mp4',
            success: res => {
                console.log(res);
                let filePath = res.filePath;
                wx.saveVideoToPhotosAlbum({
                    filePath,
                    success: file => {
                        setTimeout(function () {
                            wx.showToast({
                                title: '保存成功',
                                icon: 'success',
                                duration: 1500,
                                mask: true
                            })
                        }, 0) //延迟时间
                        let fileMgr = wx.getFileSystemManager();
                        fileMgr.unlink({
                            filePath: wx.env.USER_DATA_PATH + '/' + fileName + '.mp4',
                            success: function (r) {

                            },
                        })
                    },
                    fail: err => {
                        wx.hideLoading()
                        console.log(err)
                        if (err.errMsg === 'saveVideoToPhotosAlbum:fail auth deny') {
                            setTimeout(function () {
                                wx.showModal({
                                    title: '提示',
                                    content: '需要您授权保存相册',
                                    showCancel: false,
                                    success: data => {
                                        wx.openSetting({
                                            success(settingdata) {
                                                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                                    setTimeout(function () {
                                                        wx.showModal({
                                                            title: '提示',
                                                            content: '获取权限成功,再次点击下载即可保存',
                                                            showCancel: false,
                                                        })
                                                        wx.hideLoading()
                                                    }, 0)
                                                } else {
                                                    setTimeout(function () {
                                                        wx.showModal({
                                                            title: '提示',
                                                            content: '获取权限失败，将无法保存到相册哦~',
                                                            showCancel: false,
                                                        })
                                                    }, 0)
                                                }
                                            },
                                        })
                                    }
                                })
                            }, 0)
                        }
                    }
                })
            }
        });
        downloadTask.onProgressUpdate((res) => {
            setTimeout(function () {
                wx.showToast({
                    title: res.progress.toString()+'%',
                    icon: 'loading',
                    duration: 9999999,
                    mask: true
                })
            }, 0);
            // console.log('下载进度', res.progress);
        });
    }
});