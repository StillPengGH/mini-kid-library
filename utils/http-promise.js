import {
  Base64
} from 'js-base64';
import {
  Token
} from '../models/token.js'
//导入config，用来获取api基地址和appKey
import {
  config
} from '../config.js';

/**
 * 服务器返回错误码文字定义
 */
let customErrors = {
  1: '抱歉，出现了一个未知错误',
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',
  2000: '你已经点过赞了',
  2001: '你还没点过赞',
  3000: '该期内容不存在'
}

/**
 * 封装HTTP请求（使用Promise方式）
 */
class HTTP {
  // 发送网络请求
  request(params) {
    return new Promise((resolve, reject) => {
      this._request(params, resolve, reject);
    });
  }

  // isReFetch代表是否token刚被重新获取
  _request(params, resolve, reject, isRefetch = false) {
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      header: {
        'content-type': 'application/json',
        Authorization: this._encode()
        //'appkey': config.appkey
      },
      method: params.method,
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // statusCode是http的响应码，具体code指代请查看《项目笔记》
        let statusCode = res.statusCode.toString();
        // http状态码2开头响应成功，4,5开头错误
        if (statusCode.startsWith('2')) {
          resolve(res.data);
        } else {
          // 如果返回403，证明禁止访问
          if (statusCode == '403') {
            if(!isRefetch){
              this._refetch(params, resolve, reject);
            }
          } else {
            // 当出现错误的时候，服务器会在res.data中添加一个error_code具体含义见《项目笔记》
            reject();
            let error_code = res.data.error_code;
            this._show_error(error_code);
          }
        }
      },
      fail: function(error) {
        this._show_error(1);
        reject(error);
      }
    })
  }

  // 方法命名前加_代表私有方法，但是es6中没有私有方法一说，所以这里只是来区分是否是私有方法
  _show_error(error_code) {
    wx.showToast({
      title: customErrors[error_code],
      icon: 'none',
      duration: 2000,
    })
  }

  // 对token进行base64编码
  _encode() {
    let token = wx.getStorageSync('token');
    let result = Base64.encode(token + ':');
    return 'Basic ' + result;
  }

  // 当token失效，二次重发
  _refetch(params, resolve, reject) {
    let token = new Token();
    token.getTokenFromServer((token) => {
      this._request(params, resolve, reject, true);
    })
  }
}

export {
  HTTP
}