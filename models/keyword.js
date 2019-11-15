import {
  HTTP
} from '../utils/http-promise.js';

class Keyword extends HTTP {
  storageKey = 'keywords';
  maxLength = 10;
  /**
   * 1.将输入的关键字写入缓存
   */
  setKeywordToStorage(keyword){
    let keywords = this.getKeywords();
    // 判断是否已经存在关键在keyword,ES6方法includes
    let isHas = keywords.includes(keyword);
    if(!isHas){
      // 判断是否超出存储最大长度（自定义的长度）
      if (keywords.length>=this.maxLength){
        keywords.pop(); // 删除最后一个
      }
      // 向数组开头加入keyword
      keywords.unshift(keyword);
      wx.setStorageSync(this.storageKey, keywords);
    }
  }
  /**
   * 2.获取缓存总的搜索关键字数组
   */
  getKeywords(){
    let keywords = wx.getStorageSync(this.storageKey);
    if(!keywords){
      return [];
    }
    return keywords;
  }

  /**
   * 3.获取热门搜素关键字
   */
  getHotKeywords(){
    return this.request({
      url:'/book/hot_keyword'
    })
  }
}

export {
  Keyword
}