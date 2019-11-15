import {
  readingBehavior
} from '../reading-behavior.js'

// 获取全局唯一背景音乐管理器
let bgMusicManager = wx.getBackgroundAudioManager();

Component({
  /**
   * 使用behavior
   */
  behaviors: [
    readingBehavior
  ],

  /**
   * 组件的属性列表
   */
  properties: {
    musicUrl: String,
    musicTitle: String
  },

  /**
   * 组件的初始数据
   * isPlaying：是否正在播放，默认false
   */
  data: {
    isPlaying: false,
    playSrc: '../../images/reading/music/play.png',
    pauseSrc: '../../images/reading/music/pause.png'
  },

  /**
   * 生命周期函数
   */
  attached: function() {
    // 设置当前页面音乐播放状态
    this._setPlayingStatus();

    // 监听音乐状态
    this._monitorStatus();

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 控制音乐播放暂停
    controlMusic() {
      // 如果没有播放，那么触发播放音乐
      if (!this.data.isPlaying) {
        bgMusicManager.src = this.properties.musicUrl;
        bgMusicManager.title = this.properties.musicTitle;
        // 设置播放状态为 true
        this.setData({
          isPlaying: true
        })
      } else {
        bgMusicManager.pause();
        this.setData({
          isPlaying: false
        });
      }
    },
    
    /**
     *  "私有"方法：获取当前页面中音乐的播放状态
     */
    _setPlayingStatus:function(){
      //音乐暂停或停止
      if(bgMusicManager.paused){ 
        this.setData({
          isPlaying: false
        });
        return; //不向下执行了
      }
      // 如果“正在播放的音乐路径”等于“该期刊的音乐路径”，那么把isPlaying设置为true，证明正在播放的歌曲是该期刊的歌。
      if (bgMusicManager.src == this.properties.musicUrl) {
        this.setData({
          isPlaying: true
        });
      }
    },

    /**
     * "私有"方法：监听(monitor)背景音乐状态，用于控制页面和音乐面板的控制统一性。
     */
    _monitorStatus:function(){
      bgMusicManager.onPlay(() => {
        this._setPlayingStatus();
      });
      bgMusicManager.onPause(() => {
        this._setPlayingStatus();
      });
      bgMusicManager.onStop(() => {
        this._setPlayingStatus();
      });
      bgMusicManager.onEnded(() => {
        this._setPlayingStatus();
      });
    }
  }
})