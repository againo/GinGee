// import Taro from '@tarojs/taro'
import {Button, View} from '@tarojs/components'
import './index.scss'
import {AtButton, AtModal, AtModalAction, AtModalHeader, AtSearchBar} from "taro-ui";
import React from "react";
import Taro from "@tarojs/taro";
import {scanCode} from "../../tools/scanTool";
import {nav2url} from "../../tools/navTool";
import SearchBar from "../../components/SearchBar";
import {goods,detailFormData} from "../../tools/templateData"


// 导航路径
const uris = {
  // 进货
  incoming: '/pages/incoming/index',
  // 出货
  outgoing: '/pages/outgoing/index',
  // 商品详情（带按钮）
  searchDetail: '/pages/search/detail',
  // 查询列表
  searchList: '/pages/search/list',
  // 询价详情（商品信息）
  askDetail: '/pages/askDetail/index',
  // 添加商品（弹窗，保持当前页面的逻辑）
  // 开单
}

// 数据层映射
const urisObj = {
  incoming: {},
  searchList: {},
  searchDetail: {},
  askDetail: {},
}


/**
 * 扫码逻辑
 * 扫码结果： {
 *   result： '结果值',
 *   charSet: '字符集',
 *   errMsg: '错误信息',
 *   scanType: '扫码方式'
 * }
 */




function handleScanCode(byScan){
  if(byScan.errMsg != 'scanCode:ok'){
    alert('未能识别商品')
    return false
  }
  // 判断是什么码：以6打头的字符串（社会商品注册条形码）
  if(!(byScan.charSet == 'ISO8859-1' && byScan.result.startsWith('6'))){
    alert('扫码结果有误，请使用对应按钮')
    return false
  }
  return true
}

// 根据条形码查询商品信息
function findGoodsByCode(code){
  // http 调用接口查询
  const goods = {
    errMsg: 'ok'
  }
  if(getGoodsRes?.errMsg != 'ok'){
    // 新增商品（询问弹窗 + 新增弹窗）
  }
  return goods
}

function askPrice(){
  /*console.log('询价扫码')
  const byScan = scanCode()
  if (!handleScanCode(byScan)) {
    return
  }
  // typeScript 书写规范？
  // 获取商品信息
  const getGoodsRes = findGoodsByCode(byScan.result)*/
  // 先获取商品信息 再询价 这个操作冗余，应该设置错误码，根据错误码选择操作（方向）
  // const askDetail = {}
  // 渲染页面
  const params = {
    data: detailFormData,
    dataKey: 'goods'
  }
  nav2url(uris.askDetail, params)
  // Taro.navigateTo(uris.askDetail)
  /*Taro.navigateTo({
    url: '/pages/askDetail/index'
  })*/
}

function incoming(){
  console.log('进货扫码')
  const byScan = scanCode()
  if (!handleScanCode(byScan)) {
    return
  }
  const getGoodsRes = findGoodsByCode(byScan.result)
  // 渲染页面
  nav2url(uris.incoming,getGoodsRes)
}

function outgoing(){
  console.log('售货扫码')
  const byScan = scanCode()
  if (!handleScanCode(byScan)) {
    return
  }
  const getGoodsRes = findGoodsByCode(byScan.result)
  // 渲染页面
  nav2url(uris.outgoing,getGoodsRes)
}

function makeOrder(){
  console.log('开单扫码')

}

function searchList(value){
  console.log('查询列表')
}


export default function Index() {

  // 使用useCallBack自定义hook
  // 使用taro自带的hook方法，而不是使用taro的hook
  const [isOpened,setIsOpened] = React.useState(false)

  function monitankuang(){
    setIsOpened(!isOpened)
  }


  function ClickMe() {
    console.log('click me')
  }

  /**
   * 我的思路
   * 1. 建立大块的布局
   * 2. 把内容填充进去，处理内外边距、颜色
   */

  /**
   * 遇到的问题
   * 1. position独立于弹性布局，不会占用文档位置
   * 2. fixed直接也会互相叠加，在flex布局下，会被普通的布局块
   * 3. 如果是两块不同的画布，就会互相叠加影响，但是中间放置一个div，又占用了一个fiex画布的位置
   */


  // 5行排版按钮
  return (
    // <View className='at-row at-row__direction--column at-row__justify--between'>
    <View style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',

      alignItems: 'stretch',
      justifyContent: 'space-evenly',
    }}
    >

      <SearchBar>{/*页面跳转*/}</SearchBar>
      <AtButton type='primary' onClick={askPrice}>询价</AtButton>
      <AtButton type='primary' onClick={monitankuang}>开单</AtButton>
      <AtButton type='primary'>进货</AtButton>
      <AtButton type='primary'>售货</AtButton>
      {/*模态框*/}
      <AtModal isOpened={isOpened}>
        <AtModalHeader>是否添加新商品</AtModalHeader>
        <AtModalAction> <Button onClick={monitankuang}>取消</Button> <Button>确定</Button> </AtModalAction>
      </AtModal>
    </View>
    // </View>
  )
}
