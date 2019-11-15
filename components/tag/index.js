Component({
  // 在组件定义时的选项中启用多slot支持
  options: {
    multipleSlots: true
  },

  // 外部样式类（可多个）
  externalClasses:[
    'bg-color-class',
    'mt-class',
    'tag-class'
  ],

  /**
   * 组件的属性列表
   */
  properties: {
    content: String
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
    addCustomEvent:function(){
      this.triggerEvent('addCommentEvent',{
        content:this.properties.content
      },{});
    }
  }
})