'use strict';

Page({
    data: {
        inputext: null,
        allSize: 250,
        allR: 210,
        allG: 140,
        allB: 70,
        time: 8,
        show: true,
    },
    showChange: function showChange() {
        this.setData({
            show: !this.data.show
        });
    },
    inputfinish: function inputfinish(e) {
        var t = e.detail.value;
        if (t.length <= 0) {
            return;
        }

        this.setData({
            inputext: t
        });
    },
    sliderchange: function sliderchange(e) {
        if (e.currentTarget.dataset.type === 'size') {
            this.setData({
                allSize: e.detail.value
            });
            return;
        } else if (e.currentTarget.dataset.type === 'r') {
            this.setData({
                allR: e.detail.value
            });
            return;
        } else if (e.currentTarget.dataset.type === 'g') {
            this.setData({
                allG: e.detail.value
            });
            return;
        } else if (e.currentTarget.dataset.type === 'b') {
            this.setData({
                allB: e.detail.value
            });
            return;
        } else if (e.currentTarget.dataset.type === 'time') {
            this.setData({
                time: e.detail.value
            });
            return;
        }
        this.setData({
            content: this.data.content
        });
    },

    onLoad: function onLoad() {
    },

    onShareAppMessage: function onShareAppMessage() {
        return {
            title: '手持弹幕神器，为你打CALL',
            path: '/pages/danmu/index'
        };
    }
});