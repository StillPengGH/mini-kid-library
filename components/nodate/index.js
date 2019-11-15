// components/nodate/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // observer监听index的值变化，当组件初始化的时候，监听到index由默认值0到8
    // 但是在这里不能setData更新index，因为setData，observer由监听到了index变化，就无限死循环
    // 解决办法在data创建一个临时变量_index,setDate _index是没问题的，存储我们包装好的带0开头的数字01、02、03 ...
    index: {
      type: Number,
      observer: function(newVal, oldVal, changedPath) {
        let packageVal = newVal < 10 ? '0' + newVal : newVal;
        this.setData({
          _index: packageVal
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _index: '',
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', ],
    month: 0,
    year: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  /**
   * 组件的声明周期函数
   */
  lifetimes: {
    // 组件初始化完毕，进入页面节点树时执行
    attached: function() {
      // 获取当前年份、月份
      let date = new Date();
      let year = date.getFullYear();
      let monthIndex = date.getMonth();
      let month = this.data.months[monthIndex];
      this.setData({
        year: year,
        month: month
      });
    }
  }
})