/**
 * 1.自定义配置文件：
 *  |--api_base_url：api基地址
 *  |--appKey：调用api需要的appKey
 * 2.为什么用const：常量，不可以被改变
 *  |--外部不可以改变config
 *  |--外部可以改变config.appKey
 *  |--原因：直接改变config是改变了config的内存地址，而改变config.appKey没有改变内存地址。
 */
const config = {
  api_base_url: 'http://localhost:3000/v1'
  //api_base_url: 'http://bl.7yue.pro/v1',
  //appkey: 'EHhelWnn5TWfSnSu'
}

// 测试方法
// function testFn(){
//   console.log('测试方法');
// }

/**
 * 把定义的常量、变量、方法导出
 * 扩展：也可以给导出的常量、变量、方法起别名。方法如下：
 * export {config as myConfig,textFn as myFn}
 * 在别的页面中引入的时候：也可以在引入的时候通过as起别名
 * import {myconfig,myFn} from '../config.js'
 */
// export {config,textFn};
export {
  config
}