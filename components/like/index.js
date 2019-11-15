// components/like/index.js
Component({
  /**
   * 组件的属性列表
   * 因为count和isLike要在外部使用和控制，所以要放在properties内
   */
  properties: {
    count: {
      type: Number, //属性的类型：String、Number、Boolean、Object、Array
      value: 0 //默认值
    },
    isLike: {
      type: Boolean,
      value: false
    },
    readOnly: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeSrc: '../images/like/like.png',
    noLikeSrc: '../images/like/no_like.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {
      // 如果只读的话，不能进行点击操作
      if (this.properties.readOnly) {
        return;
      }

      // 获取properties里的属性
      let count = this.properties.count;
      let isLike = this.properties.isLike;

      count = isLike ? count - 1 : count + 1;
      this.setData({
        count: count,
        isLike: !isLike
      });

      /**
       * 自定义事件，触发事件 this.triggerEvent
       * 三个参数：
       *  |--string:事件名称
       *  |--{}:detail对象
       *  |--{}:事件选项，通常不用设置
       */
      let likeFlg = this.properties.isLike ? 'like' : 'noLike'
      this.triggerEvent('likeEvent', {
        likeFlg: likeFlg
      }, {})
    }
  }
})