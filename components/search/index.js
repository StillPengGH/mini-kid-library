import {
  Keyword
} from '../../models/keyword.js';

import {
  Book
} from '../../models/book.js';

import {
  paginationBev
} from '../behaviors/pagination.js'

let keywordModel = new Keyword();
let bookModel = new Book();

Component({
  behaviors: [
    paginationBev
  ],
  properties: {
    isReachBottom: {
      type: String,
      observer: '_loadMore'
    }
  },
  data: {
    isSearching: false,
    searchVal: '',
    historyWords: [],
    hotWords: [],
    loadingCenter: false,
    loadingBottom: false
  },

  /**
   * 组件生命周期函数
   */
  attached: function() {
    // 设置历史搜索关键字
    this.setData({
      historyWords: keywordModel.getKeywords()
    });

    // 设置热门搜索关键字
    keywordModel.getHotKeywords().then(data => {
      this.setData({
        hotWords: data.hot
      })
    })
  },

  methods: {
    /**
     * 加载更多图书信息
     */
    _loadMore: function() {
      if (this.isLocked()) { //判断是否“上锁”
        return;
      }

      if (!this.data.searchVal) { // 如果没有关键字，终止加载数据，禁止发送http请求
        return;
      }

      if (this.hasMore()) { // 判断是否还有更多
        this._showLoadingBottom(); // 开启加载更多loading图标
        this.locked(); // 加锁，证明正在加载数据中...
        bookModel.getBooksByKeyword(this.data.searchVal, 1, this.getStart()).then(data => {
          this.setBooksData(data.books); //给books赋值
          this._hideLoadingBottom(); // 关闭底部加载更多图标
          this.unLocked(); //解锁
        }, () => {
          this._hideLoadingBottom(); 
          this.unLocked(); //请求失败的时候，也要解锁
        })
      }
    },

    /**
     * 点击搜索
     */
    searchBooks: function(event) {
      if (this.isLocked()) { // 判断是否“上锁”，即点击搜索判断是否有搜索正在进行,有的话什么终止执行
        return;
      }

      this._showLoadingCenter(); // 开启加载中图标

      // 获取搜索关键字，1.value来自input输入框 2.content来自点击标签
      let keyword = event.detail.value || event.detail.content;

      if (!keyword.trim()) { // 如果关键字为空，不发送http请求数据，
        this._hideLoadingCenter(); // 关掉加载中图标
        return;
      }

      // 执行http请求前，把搜索关键字(keyword)“放入”input搜索框内(searchVal)
      // 隐藏搜索页面，显示搜索结果页，即设置isSearching为true
      this.setData({
        searchVal: keyword,
        isSearching: true
      });

      this.locked(); //上锁，为了防止用于段时间多次敲击“确认”，发起多次http请求。
      bookModel.getBooksByKeyword(keyword, 1, 0)
        .then(data => { //发起http请求。参数：关键字、是否要完成信息（这里不需要完整的）、从第几条开始。
          this.initialize(); //赋值前先初始化数据，清空之前books里的数据
          this.setBooksData(data.books); // 给books赋值
          this.setBooksTotal(data.total); // 设置数据总条数
          this._hideLoadingCenter(); //关闭中间加载中图标
          this.unLocked(); //解锁
          keywordModel.setKeywordToStorage(keyword); // 最后将当前的搜索关键字存入缓存中
        }, () => {
          this._hideLoadingCenter();
          this.unLocked();
        });
    },

    /**
     * 自定义取消事件
     */
    onCancel: function() {
      this.initialize();
      this.setData({
        isSearch: false,
        isLoadingData: false,
        loadingCenter: false,
        loadingBottom: false
      });
      this.triggerEvent('cancelEvent', {}, {});
    },

    /**
     * 清空input内容：将input框内容清空，并设置isSearching等于false，回到搜索页面。
     */
    clearInputVal: function() {
      this.initialize();
      this.setData({
        searchVal: '',
        isSearching: false,
        isLoadingData: false,
        loadingCenter: false,
        loadingBottom: false
      })
    },

    /**
     * 显示加载中图标（中间）
     */
    _showLoadingCenter: function() {
      this.setData({
        loadingCenter: true
      })
    },

    /**
     * 隐藏加载中图标（中间）
     */
    _hideLoadingCenter: function() {
      this.setData({
        loadingCenter: false
      })
    },

    /**
     * 显示加载中图标（底部）
     */
    _showLoadingBottom: function() {
      this.setData({
        loadingBottom: true
      })
    },

    /**
     * 隐藏加载中图标（底部）
     */
    _hideLoadingBottom: function() {
      this.setData({
        loadingBottom: false
      })
    }
  }
})