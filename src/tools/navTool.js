import Taro from "@tarojs/taro";
import {isNotEmpty} from "./objUtil";
import {saveToLocalStorage} from "./storageTool";

export function nav2url(uri,params = {}){
// 使用localstorage来实现参数传递  dataKey
// 使用url实现参数传递 需要编码和解码
  console.log('start nav: ',params)
  let url = uri;
  if(isNotEmpty(params)){
    if(isNotEmpty(params.data)){
      url += ('?dataKey=' + params.dataKey)
      saveToLocalStorage(params.dataKey, params.data)
    }
    for(let key in params){
      if(key == 'dataKey' || key == 'data')
        continue
      if(isNotEmpty(params[key])){
        url += ('&' + key + '=' + params[key])
      }
    }
  }
  console.log('url',url)
  Taro.navigateTo({
    url: url,
    success: function (res) {
      console.log('success: ',res)
    },
    fail: function (res){
      console.log('fail: ', res)
    }
  })
}

/*
export function nav2url(uri,renderData){

  console.log('页面跳转')
    Taro.navigateTo({
      url: uri + '?id=1',
      events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function(data) {
              console.log(data)
          },
          someEvent: function(data) {
              console.log(data)
          },
      },
      success: function (res) {
          console.log('success: ',res)
      },
      fail: function (res){
          console.log('fail: ', res)
      }
    })
  }
*/

