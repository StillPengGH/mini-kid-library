import {
  Reading
} from '../../models/reading.js'
import {
  Like
} from '../../models/like.js'

let readingModel = new Reading();
let likeModel = new Like();

Page({
  properties: {
    id: Number,
    type: Number
  },

  /**
   * 页面的初始数据
   */
  data: {
    latestData: {},
    favNums: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    let type = options.type;
    readingModel.getById(id,type).then(data=>{
      this.setData({
        latestData: data,
        favNums: data.fav_nums,
        likeStatus: data.like_status
      })
    });
  },


  /**
   * 用来监听点击喜欢/不喜欢
   */
  onLikeEvent: function (event) {
    let likeFlg = event.detail.likeFlg;
    console.log(likeFlg);
    console.log(this.data.latestData.id);
    console.log(this.data.latestData.type);
    // 进行喜欢设置
    likeModel.setLike(likeFlg, this.data.latestData.id, this.data.latestData.type);
  },
})