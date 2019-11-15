/**
 * 1.behaviors 用于组件间代码共享特性
 * 2.每一个behavior可以包含一组：
 *    |--属性：properties
 *    |--数据：data
 *    |--生命周期函数：attached、detached...
 *    |--方法
 * 3.组件引用他的时候，他的属性、数据和方法会被合并到组件中，生命周期函数也会在对应的实际被调用。
 * 4.每个组件可以引用多个bahavior
 */

// 创建一个behavior，用于共享电影、音乐、诗句的共享特性
const readingBehavior = Behavior({
  properties: {
    imgSrc: String,
    content: String,
    hidden: Boolean
  },
  data: {
    // 数据
  },
  methods: {
    // 方法
  },
  attached: function() {
    // 生命周期函数
  }
})

export {
  readingBehavior
}