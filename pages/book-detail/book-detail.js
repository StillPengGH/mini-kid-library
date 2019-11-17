import {
  Book
} from '../../models/book.js';

import {
  Like
} from '../../models/like.js';

// book业务处理类
let bookModel = new Book();
// like业务处理类
let likeModel = new Like();

Page({

  data: {
    detailData: {},
    commentData: [],
    likeData: {},
    isShow: false
  },

  onLoad: function(options) {
    // 开启加载中图标
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    // 获取书籍id
    let bookId = options.bid;
    // 获取书籍详细信息：详情、短评、点赞情况
    let detailPromise = bookModel.getDetailById(bookId); //详情
    let commentPromise = bookModel.getCommentById(bookId); //短评
    let likePromise = bookModel.getLikeById(bookId); //点赞信息

    // 使用Promise.all来执行所有promise对象。
    Promise.all([
      detailPromise,
      commentPromise,
      likePromise
    ]).then((data)=>{
      let pubdate = data[0].pubdate;
      if(pubdate && pubdate.length>8){
        pubdate = pubdate.substring(0,7);
      }
      data[0].pubdate = pubdate;
      this.setData({
        detailData:data[0],
        commentData:data[1].comments,
        likeData:data[2]
      });
      wx.hideLoading();
    });

    // detailPromise.then((data) => {
    //   console.log(data);
    //   this.setData({
    //     detailData: data
    //   })
    // });

    // commentPromise.then((data) => {
    //   console.log(data);
    //   this.setData({
    //     commentData: data.comments
    //   });
    // });

    // likePromise.then((data) => {
    //   console.log(data);
    //   this.setData({
    //     likeData: data
    //   });
    // });
  },

  /**
   * 显示评论
   */
  showRealInput: function() {
    this.setData({
      isShow: true
    });
  },

  /**
   * 关闭评论
   */
  closeRealInput: function() {
    this.setData({
      isShow: false
    })
  },

  /**
   * 增加短评
   */
  addComment: function(event) {
    let content = event.detail.content || event.detail.value;

    if(!content.trim()){
      wx.showToast({
        title: '您没输入任何短评',
        icon: 'none'
      })
      return;
    }
    if(content.length > 12){
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return;
    }
    bookModel.addShortComment(this.data.detailData.id, content).then(data => {
      this.data.commentData.unshift({
        content: content,
        nums: 1
      });
      this.setData({
        isShow: false,
        commentData: this.data.commentData
      });
      wx.showToast({
        title: '+1',
        icon: 'none'
      });
    });
  },

  /**
   * 对书籍点赞
   */
  onLikeEvent:function(event){
    let likeFlg = event.detail.likeFlg;
    // 进行喜欢设置
    likeModel.setLike(likeFlg, this.data.detailData.id, 400);
  }
})