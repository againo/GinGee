import Taro from "@tarojs/taro";

export function nav2url(uri,renderData){
  console.log('页面跳转')
    Taro.navigateTo({
        url: uri,
        events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            acceptDataFromOpenedPage: function(data) {
                console.log(data)
            },
            someEvent: function(data) {
                console.log(data)
            }
        },
        success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', { data: renderData })
        }
    })
}
