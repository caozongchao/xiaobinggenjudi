'use strict';

Page({
    data: {
        inputext: null,
        content: [],
        allSize: 250,
        allR: 210,
        allG: 140,
        allB: 70,
        time: 8,
        show: true,
    },
    showChange: function () {
        this.setData({
            show: !this.data.show
        });
    },
    keyword: function (e) {
        var value = e.detail;
        var value = e.detail.value;
        if (value.length <= 0) {
            return;
        }
        this.setData({
            inputext: value,
        });
    },
    keywordDelay: function (e) {
        var that = this;
        setTimeout(function () {
            var tArr = that.data.inputext.split('');
            var content = [];
            var en = '';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            var item;
            try {
                for (var _iterator = tArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var v = _step.value;
                    if (/[a-zA-Z]/.test(v)) {
                        en += v;
                        continue;
                    } else {
                        if(en != ''){
                            content.push(en);
                        }
                        content.push(v);
                        en = '';
                    }
                }
                if(en != ''){
                    content.push(en);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            console.log(content);
            that.setData({
                content: content,
            });
            that.showChange();
        }, 1000)
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

    onLoad: function onLoad() {},

    onShareAppMessage: function onShareAppMessage() {
        return {
            title: '手持弹幕神器，为你打CALL',
            path: '/pages/danmu/index'
        };
    }
});