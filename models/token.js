import {
  config
} from '../config.js'

class Token {
  constructor() {
    this.tokenUrl = config.api_base_url + '/token';
    this.verifyUrl = config.api_base_url + '/token/verify';
  }

  // 检查token是否过期
  verify() {
    let token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFormServer();
    } else {
      this.verifyTokenFromServer(token);
    }
  }

  // 从服务器获取token
  getTokenFromServer(cb) {
    let that = this;
    // 调用wx.login获取open_id,即res.code,data中type为用户类型
    wx.login({
      success: function(res) {
        wx.request({
          url: that.tokenUrl,
          data: {
            account: res.code,
            type: 100
          },
          method: 'POST',
          success: function(res) {
            wx.setStorageSync('token', res.data.token);
            cb && cb(res.data.token);
          }
        })
      }
    })
  }

  // 检查token，如果过期从服务器重新获取
  verifyTokenFromServer(token) {
    let that = this;
    wx.request({
      url: that.verifyUrl,
      data: {
        token: token
      },
      method: 'POST',
      success: function(res) {
        let isValid = res.data.isValid;
        if(!isValid){
          that.getTokenFormServer();
        }
      }
    })
  }
}

export {
  Token
}