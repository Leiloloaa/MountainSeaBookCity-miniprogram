// pages/cart.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        value1: 1,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleChange1({
            detail
        }) {
            this.setData({
                value1: detail.value
            })
        },
    }
})