Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
    isLike: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去详情页
    goToBookDetail: function() {
      wx.navigateTo({
        url: '/pages/book-detail/book-detail?bid=' + this.properties.book.id
      })
    }
  }
})