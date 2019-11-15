import {
  HTTP
} from '../utils/http-promise.js';

/**
 * Book相关的业务逻辑处理
 */
class Book extends HTTP {
  // 1.获取热门书籍（列表）
  getHotBooks() {
    return this.request({
      url: '/book/hot_list'
    });
  }

  // 2.根据id获取书籍详细信息
  getDetailById(bookId) {
    return this.request({
      url: `/book/${bookId}/detail`
    });
  }

  // 3.根据id获取书籍短评信息
  getCommentById(bookId) {
    return this.request({
      url: `/book/${bookId}/short_comment`
    });
  }

  // 4.根据id获取书籍的点赞信息
  getLikeById(bookId) {
    return this.request({
      url: `/book/${bookId}/favor`
    });
  }

  // 5.增加短评(书籍id、评论内容)
  addShortComment(bookId, content) {
    return this.request({
      url: '/book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bookId,
        content: content
      }
    });
  }

  // 6.根据关键字获取图书列表
  getBooksByKeyword(keyword, summary, start) {
    return this.request({
      url: '/book/search',
      method: 'GET',
      data: {
        start,
        summary,
        q: keyword
      }
    });
  }

  // 7.获取喜欢书籍数量
  getLikeNum(){
    return this.request({
      url:'/book/favor/count'
    })
  }
}

export {
  Book
}