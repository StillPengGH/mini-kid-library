import {
  HTTP
} from '../utils/http-promise.js';

class Like extends HTTP {
  // 设置是否喜欢
  setLike(likeFlg, artId, categroy) {
    let url = likeFlg == 'like' ? '/like' : '/like/cancel';
    this.request({
      url: url,
      method: "POST",
      data: {
        art_id: artId,
        type: categroy
      }
    })
  }

  // 获取点赞信息
  getLikeInfo(artId, category, cb) {
    return this.request({
      url: `/classic/${category}/${artId}/favor`
    })
  }
}

export {
  Like
}