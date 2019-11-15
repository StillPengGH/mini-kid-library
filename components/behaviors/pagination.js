const paginationBev = Behavior({
  data: {
    books: [],
    total: null,
    noneResult: false,
    isLoadingData: false
  },
  methods: {
    /**
     * 给books赋值
     */
    setBooksData(books) {
      const tempBooks = this.data.books.concat(books);
      this.setData({
        books: tempBooks
      })
    },

    /**
     * 设置搜索书籍books的总条数
     */
    setBooksTotal(total) {
      this.data.total = total;
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },

    /**
     * 获取查询起始位置start
     */
    getStart() {
      return this.data.books.length;
    },

    /**
     * 是否还有更多
     */
    hasMore() {
      if (this.data.books.length >= this.data.total) {
        return false;
      } else {
        return true;
      }
    },

    /**
     * 上锁，即正在加载数据，不能再次执行同样的操作
     */
    locked() {
      this.setData({
        isLoadingData: true
      })
    },

    /**
     * 解锁，即请求数据处理完毕
     */
    unLocked() {
      this.setData({
        isLoadingData: false
      })
    },

    /**
     * 判断是否被锁
     */
    isLocked() {
      return this.data.isLoadingData ? true : false;
    },

    /**
     * 初始化数据
     */
    initialize() {
      this.setData({
        books: [],
        noneResult: false
      })
    }
  }
});

export {
  paginationBev
}