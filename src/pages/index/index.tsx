// import Taro from '@tarojs/taro'
import {Button, View} from '@tarojs/components'
import './index.scss'
import {AtButton, AtModal, AtModalAction, AtModalHeader, AtSearchBar} from "taro-ui";
import React from "react";
import Taro from "@tarojs/taro";
import {scanCode} from "../../tools/scanTool";
import {nav2url} from "../../tools/navTool";
import SearchBar from "../../components/SearchBar";
import {goods as tempGoods,detailFormData} from "../../tools/templateData"
import {isNotEmpty} from "../../tools/objUtil";
import {pages} from '../../router/routers'
import {getFromLocalStorage} from "../../tools/storageTool";

// 数据层映射
/*const abc = {
  incoming: {},
  searchList: {},
  searchDetail: {},
  askDetail: {},
}*/


/**
 * 扫码逻辑
 * 扫码结果： {
 *   result： '结果值',
 *   charSet: '字符集',
 *   errMsg: '错误信息',
 *   scanType: '扫码方式'
 * }
 */

export default function Index() {


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
        // 切换放到stores中
        // http 调用接口查询
        // const goods = tempGoods
        const goods = getFromLocalStorage("goodsSubmit")
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
        const data = findGoodsByCode('')
        console.log('nowbatch',getFromLocalStorage('batchSubmit'))
        data.nowBatch = getFromLocalStorage('batchSubmit')
        const params = {
            data: data ? data : detailFormData,
            dataKey: 'askDetail'
        }
        nav2url(pages.askDetail, params)
    }

    function incoming(){
        /*console.log('进货扫码')
        const byScan = scanCode()
        if (!handleScanCode(byScan)) {
          return
        }
        const getGoodsRes = findGoodsByCode(byScan.result)*/
        // 渲染页面
        const myCode = '12314555,商品码'
        const goods = isGoodsExist(myCode)
        const params = {
            data: goods,
            dataKey: 'goodsForIncoming'
        }
        nav2url(pages.incoming,params)
    }

    function outgoing(){
        console.log('售货扫码')
        const byScan = scanCode()
        if (!handleScanCode(byScan)) {
            return
        }
        const getGoodsRes = findGoodsByCode(byScan.result)
        // 渲染页面
        nav2url(pages.outgoing,getGoodsRes)
    }

    function makeOrder(){
        console.log('开单扫码')
    }

    function searchList(value){
        console.log('查询列表')
    }

  // 使用useCallBack自定义hook
  // 使用taro自带的hook方法，而不是使用taro的hook
  const [isOpened,setIsOpened] = React.useState(false)
  const [goodCode, setGoodCode] = React.useState('')

  function closeModal(){
    setIsOpened(!isOpened)
  }

  // 判断商品是否存在，不存在时跳转到新增商品页面
  function isGoodsExist(myCode) {
    const goodsByCode = findGoodsByCode(myCode);
    console.log('goods',goodsByCode)
    if(!isNotEmpty(goodsByCode)){
      // 弹窗到新增页面
      setIsOpened(true)
      return
    }
    return goodsByCode
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
      <AtButton type='primary' onClick={makeOrder}>开单</AtButton>
      <AtButton type='primary' onClick={incoming}>进货</AtButton>
      <AtButton type='primary' onClick={outgoing}>售货</AtButton>
      {/*模态框*/}
      <AtModal isOpened={isOpened}>
        <AtModalHeader>是否添加新商品</AtModalHeader>
        <AtModalAction> <Button onClick={closeModal}>取消</Button> <Button onClick={() =>
          nav2url(pages.addGoods, {code: goodCode})}
        >确定</Button> </AtModalAction>
      </AtModal>
    </View>
    // </View>
  )
}
