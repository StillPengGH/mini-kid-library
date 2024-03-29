import {
  Reading
} from '../../models/reading.js';
import {
  Like
} from '../../models/like.js';

let readingModel = new Reading();
let likeModel = new Like();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFirst: false,
    isLast: true,
    lastIndex: 0,
    latestData: {},
    likeNums: 0,
    likeStatus: false
  },

  onShow: function(options) {
    // 获取最新一期的学习期刊
    readingModel.getLatest().then(data => {
      this.setData({
        latestData: data,
        lastIndex: data.index,
        likeNums: data.like_nums,
        likeStatus: data.like_status
      })
    });
  },

  /**
   * 用来监听点击喜欢/不喜欢
   */
  onLikeEvent: function(event) {
    let likeFlg = event.detail.likeFlg;
    // 进行喜欢设置
    likeModel.setLike(likeFlg, this.data.latestData.id, this.data.latestData.type);
  },

  /**
   * 用来监听右箭头，用来获取前一期学习期刊内容
   */
  getBefore: function(event) {
    // 获取当前页面期刊号
    let currentIndex = this.data.latestData.index;
    // 根据当前期刊号，获取前一期期刊
    readingModel.getBeforeByCurrentIndex(currentIndex, (data) => {
      this._getLikeInfo(data.id, data.type);
      this.setData({
        latestData: data,
        isFirst: readingModel.isFirst(data.index),
        isLast: readingModel.isLast(this.data.lastIndex)
      });
    });
  },

  /**
   * 用来监听左箭头，用来获取后一起期刊内容
   */
  getLater: function(event) {
    // 获取当前页面的latestData中index
    let currentIndex = this.data.latestData.index;
    readingModel.getLaterByCurrentIndex(currentIndex, (data) => {
      this._getLikeInfo(data.id, data.type);
      this.setData({
        latestData: data,
        isFirst: readingModel.isFirst(data.index),
        isLast: readingModel.isLast(this.data.lastIndex)
      });
    });
  },

  /**
   * 获取点赞信息
   */
  _getLikeInfo: function(id, type) {
    likeModel.getLikeInfo(id,type).then(data=>{
      this.setData({
        likeNums: data.like_nums,
        likeStatus: data.like_status
      });
    });
  }
})