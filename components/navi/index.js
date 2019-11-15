Component({
  /**
   * 组件的属性列表
   * title:期刊辩题
   * isFirst：是否是第一期
   * isLast：是否是最后一期（即最新一期）
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    isFirst: {
      type: Boolean,
      value: false
    },
    isLast: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc: '../images/navi/arrow_left.png',
    leftDisSrc: '../images/navi/arrow_left_dis.png',
    rightSrc: '../images/navi/arrow_right.png',
    rightDisSrc: '../images/navi/arrow_right_dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 右箭头：获取前一期期刊
    getBeforeReading: function(event) {
      // 没有到达第一期，才激活beforeEvent事件
      if (!this.properties.isFirst){
        this.triggerEvent('beforeEvent', {
          isFirst: this.properties.isFirst
        }, {});
      }
    },

    // 左箭头：获取后一期期刊
    getLaterReading: function(event) {
      // 没有到达最后一期（即最新一期），才激活laterEvent事件
      if(!this.properties.isLast){
        this.triggerEvent('laterEvent', {
          isLast: this.properties.isLast
        }, {});
      } 
    }
  }
})