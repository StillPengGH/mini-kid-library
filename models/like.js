import {
  HTTP
} from '../utils/http-promise.js';

class Like extends HTTP {
  // 设置是否喜欢
  setLike(likeFlg, libId, categroy) {
    let url = likeFlg == 'like' ? '/like' : '/like/cancel';
    this.request({
      url: url,
      method: "POST",
      data: {
        lib_id: libId,
        type: categroy
      }
    })
  }

  // 获取点赞信息
  getLikeInfo(libId, category, cb) {
    return this.request({
      url: `/learning/${category}/${libId}/like`
    })
  }
}

export {
  Like
}