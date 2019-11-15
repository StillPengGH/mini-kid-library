import {
  HTTP
} from '../utils/http-promise.js';

class Reading extends HTTP {
  // 获取最新一期
  getLatest() {
    return this.request({
      url: '/learning/latest'
    });
  }
  
  // 获取前一期期刊
  getBeforeByCurrentIndex(currentIndex, cb) {
    // 查看缓存是否存在前一期期刊，currentIndex为当前期，前一期就是index-1
    let storageData = wx.getStorageSync('index_' + (currentIndex-1));
    if (!storageData){
      this.request({
        url: '/classic/' + currentIndex + '/previous'
      }).then(data=>{
        let index = data.index;
        // 将期刊号放入缓存中
        this._setIndexToStorage(index);
        // 将当前期刊号对应的data也存入缓存
        wx.setStorageSync('index_' + index, data)
        cb(data);
      });
    }else{
      this._setIndexToStorage(storageData.index);
      cb(storageData);
    }
  }

  //获取当后一期期刊
  getLaterByCurrentIndex(currentIndex, cb) {
    // 查看缓存是否存在前一期期刊，currentIndex为当前期，前一期就是index-1
    let storageData = wx.getStorageSync('index_' + (currentIndex + 1));
    if (!storageData){
      this.request({
        url: '/classic/' + currentIndex + '/next'
      }).then(data=>{
        let index = data.index;
        this._setIndexToStorage(index);
        wx.setStorageSync('index_' + index, data)
        cb(data)
      });
    }else{
      this._setIndexToStorage(storageData.index);
      cb(storageData);
    }
  }

  // 判断是否到达了第一期
  isFirst(index) {
    return index == 1 ? true : false;
  }

  // 判断是否到达了最后一期
  isLast(index) {
    let storageIndex = this._getIndexFromStorage();
    return index == storageIndex ? true : false;
  }

  // 获取的喜欢的电影、句子、音乐
  getMyFavor(){
    return this.request({
      url:'/classic/favor'
    })
  }

  getById(id, type) {
    return this.request({
      url: `/classic/${type}/${id}`
    })
  }

  // 向缓存中存入期刊号
  _setIndexToStorage(index) {
    wx.setStorageSync('indexKey', index);
  }

  // 获取缓存中存入的期刊号
  _getIndexFromStorage() {
    return wx.getStorageSync('indexKey');
  }
}

export {
  Reading
}