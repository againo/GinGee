import {Image, Picker, View} from '@tarojs/components'
import './index.scss'
import {AtButton, AtForm, AtInput, AtInputNumber, AtList, AtListItem} from "taro-ui";
import React from "react";
import {goods as tempGoods,src} from '../../tools/templateData'
import {getDataWithNav, getFromLocalStorage, saveToLocalStorage} from "../../tools/storageTool";
import Taro from "@tarojs/taro";
import {nav2url} from "../../tools/navTool";
import {pages} from "../../router/routers";
import dayjs from "dayjs";
import {getCurrentInstance} from "@tarojs/runtime";


export default function Index() {

  const today = dayjs().locale('zh-cn').format('YYYY-MM-DD');

  // const params = getCurrentInstance().router.params; // ok,能获取
  // const goods = getDataWithNav(params)

  const goods = getFromLocalStorage('goodsSubmit') ? getFromLocalStorage('goodsSubmit') : tempGoods

  const [formData, setFormData] = React.useState({
    // 商品条码
    'goods_id': goods.id,
    // 进货价格
    'incoming_price':'',
    // 进货数量
    'incoming_quantity': '',
    // 进货日期
    'incoming_date': today,
    // 生产日期
    'produce_date': ''
  })

  // 处理input
  function handleInputChange(column,value){
    setFormData({
      ...formData,
      [column]: value
    })
  }

  // 提交处理
  function handleSubmit(){
    console.log('submit',formData)
    if(checkForm()){
      saveToLocalStorage('batchSubmit',[formData])
      Taro.showToast({
        title: '提交成功',
        icon: 'success',
      });
    }
    // 跳转回首页
    nav2url(pages.home)
  }

  function checkForm(){
    if (!formData.incoming_quantity) {
      Taro.showToast({
        title: '请填写进货数量',
        icon: 'none',
      });
      return false
    }
    if (!formData.incoming_price) {
      Taro.showToast({
        title: '请填写进货价',
        icon: 'none',
      });
      return false
    }
    if (!formData.produce_date) {
      Taro.showToast({
        title: '请选择生产日期',
        icon: 'none',
      });
      return false
    }
    return true
  }


  return (
      <View>
        <AtList>
          <AtListItem note={<Image src={src} />} ></AtListItem>
          <AtListItem title='商品名称' extraText={goods.name}></AtListItem>
        </AtList>
       <AtForm onSubmit={handleSubmit}>
         <AtInput
           name='incoming_price'
           title='进货价'
           type='digit'
           placeholder='请填写进货价格'
           value={formData.incoming_price}
           onChange={(value) => handleInputChange('incoming_price', value)}
         />
         <AtList>
           <AtListItem title='进货数量' extraText={
             <AtInputNumber type='number' value={formData.incoming_quantity} onChange={(value) => handleInputChange('incoming_quantity', value)} />}
           ></AtListItem>
         </AtList>
         <Picker mode='date' value={formData.incoming_date} onChange={(event) => handleInputChange('incoming_date',event.detail.value)}>
           <AtList>
             <AtListItem title='进货日期' extraText={formData.incoming_date} arrow='right' />
           </AtList>
         </Picker>
         <Picker mode='date' value={formData.produce_date} onChange={(event) => handleInputChange('produce_date',event.detail.value)}>
           <AtList>
             <AtListItem title='生产日期' extraText={formData.produce_date} arrow='right' />
           </AtList>
         </Picker>
         {/*<AtCalendar isVertical /> 说是在小程序正常?h5就不正常?*/}

         <AtButton type='primary' formType='submit'>提交</AtButton>
         <AtButton formType='reset'>取消</AtButton>
        </AtForm>
      </View>
    )
}

