import {
  Book
} from '../../models/book.js';

import {
  random
} from '../../utils/util.js'

const bookModel = new Book();

Page({

  data: {
    books: [],
    isShowSearch: false,
    isLoadMore: '',
    isRefreshStr: ''
  },

  onShow: function(options) {
    bookModel.getHotBooks().then((data) => {
      this.setData({
        books: data
      })
    });
  },

  /**
   * 显示搜索组件
   */
  showSearch: function() {
    this.setData({
      isShowSearch: true
    })
  },

  /**
   * 隐藏搜索组件
   */
  hideSearch: function() {
    this.setData({
      isShowSearch: false
    })
  },

  /**
   * 监听搜索后结果页的触底刷新
   */
  onReachBottom: function() {
    this.setData({
      isLoadMore: random(16)
    })
  }
})