// pages/category.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsCount: 40,
        img: '',
        base64Img: ''
    },
    // 上传图片
    chooseImg: function(e) {
        const that = this
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                console.log(res)
                const tempFilePaths = res.tempFilePaths
                wx.getImageInfo({
                    src: tempFilePaths[0],
                    success: (res) => {
                        console.log(res)
                            //获得exif中的orientation信息   
                        if (res.orientation == "up") {
                            that.setData({
                                img: tempFilePaths[0],
                            })
                        } else {
                            let canvasContext = wx.createCanvasContext('canvas')
                            console.log(res.orientation)
                            switch (res.orientation) {
                                case ("down"):
                                    var width = res.width;
                                    var height = res.height
                                        //需要旋转180度
                                    that.setData({
                                        imageWidth: width,
                                        imageHeight: height,
                                    })
                                    canvasContext.translate(width / 2, height / 2)
                                    canvasContext.rotate(180 * Math.PI / 180)
                                    canvasContext.drawImage(tempFilePaths[0], -width / 2, -height / 2, width, height);
                                    break;
                                case ("left"):
                                    var width = res.width;
                                    var height = res.height;
                                    canvasContext.translate(height / 2, width / 2)
                                    that.setData({
                                            imageWidth: height,
                                            imageHeight: width,
                                        })
                                        //顺时针旋转270度
                                    canvasContext.rotate(270 * Math.PI / 180)
                                    canvasContext.drawImage(tempFilePaths[0], -width / 2, -height / 2, width, height);
                                    break;
                                case ("right"):
                                    var width = res.width;
                                    var height = res.height;
                                    that.setData({
                                        imageWidth: height,
                                        imageHeight: width,
                                    })
                                    canvasContext.translate(height / 2, width / 2)
                                        //顺时针旋转90度
                                    canvasContext.rotate(90 * Math.PI / 180)
                                    canvasContext.drawImage(tempFilePaths[0], -width / 2, -height / 2, width, height);
                                    break;
                            }
                            canvasContext.draw()
                            that.drawImage()
                        }
                    }
                })
            }
        });
    },

    drawImage: function(path) {
        var that = this;
        setTimeout(() => {
            // 将生成的canvas图片，转为真实图片
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                canvasId: 'canvas',
                success(res) {
                    let shareImg = res.tempFilePath;
                    that.setData({
                        img: res.tempFilePath,
                    })
                    that.urlTobase64(res.tempFilePath)
                },
                fail: function(res) {}
            })
        }, 2000)
    },

    urlTobase64(imgPath) { //读取图片的base64文件内容
        var that = this;
        wx.getFileSystemManager().readFile({
            filePath: imgPath, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => {
                    console.log('data:image/png;base64,' + res.data);
                    that.base64Img = res.data;
                } //成功的回调
        })
    },
    previewImg: function(e) {
        //获取当前图片的下标
        var index = e.currentTarget.dataset.index;
        //所有图片
        var imgs = this.data.imgs;
        wx.previewImage({
            //当前显示图片
            current: imgs[index],
            //所有图片
            urls: imgs
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})