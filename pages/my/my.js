import {
  Book
} from '../../models/book.js';

import {
  promisec
} from '../../utils/util.js';

import {
  Reading
} from '../../models/reading.js'

let bookModel = new Book();
let readingModel = new Reading();

Page({

  /**
   * 页面的初始数据
   * 1.userInfo:用户信息
   * 2.authorized:是否已经授权
   */
  data: {
    userInfo: null,
    authorized: false,
    bookCount: 0,
    favors: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.userAuthorized(); //判断用户授权
    // this.userAuthorized2();
    this.userAuthorized3();
  },

  onShow:function(){
    this.getMyFavor(); //获取我喜欢的电影、句子、音乐
    this.getLikeBookNum(); //获取喜欢书籍数量
  },

  /**
   * 获取用户信息
   */
  onGetUserInfo(event) {
    let userInfo = event.detail.userInfo;
    // 如果能获取到用户信息，证明已经授权
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      });
    }
  },

  /**
   * 获取喜欢书籍数量
   */
  getLikeBookNum() {
    bookModel.getLikeNum().then(data => {
      this.setData({
        bookCount: data.count
      })
    })
  },

  /**
   * 判断用户是否授权（callback方式）
   */
  userAuthorized() {
    wx.getSetting({
      success: res => {
        // 判断是否授权
        if (res.authSetting['scope.userInfo']) {
          // 获取用户信息
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              });
            }
          })
        }
      }
    })
  },

  /**
   * 判断用户是否授权（promise方式）
   */
  userAuthorized2() {
    promisec(wx.getSetting)().then(res => {
      if (res.authSetting['scope.userInfo']) {
        promisec(wx.getUserInfo)();
      }
      return false;
    }).then(data => {
      if (!data) return;
      this.setData({
        authorized: true,
        userInfo: data.userInfo
      });
    })
  },

  /**
   * 判断用户是否授权（async，await）
   */
  async userAuthorized3() {
    const res = await promisec(wx.getSetting)();
    if (res.authSetting['scope.userInfo']) {
      const data = await promisec(wx.getUserInfo)();
      const userInfo = data.userInfo;
      this.setData({
        authorized: true,
        userInfo
      });
    }
  },

  /**
   * 获取喜欢的电影、句子、音乐
   */
  getMyFavor() {
    readingModel.getMyFavor().then(data=>{
      this.setData({
        favors: data
      })
    })
  },

  /**
   * 去喜欢详情页
   */
  goToFavorDetail(event) {
    const id = event.detail.id;
    const type = event.detail.type;
    wx.navigateTo({
      url: `/pages/reading-detail/reading-detail?id=${id}&type=${type}`
    })
  },

  /**
   * 去学习页面
   */
  goToStudy(){
    wx.navigateTo({
      url: '/pages/study/study'
    })
  },

  /**
  * 去关于我们
  */
  goToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  }
})