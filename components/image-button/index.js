// components/image-button/index.js
Component({
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    openType: String
  },

  data: {

  },

  methods: {
    // 这里获取到了用户信息，要以参数的形式回传回去（回传到父页面）
    onGetUserInfo(event) {
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})