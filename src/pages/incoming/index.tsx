import {Image, Picker, View} from '@tarojs/components'
import './index.scss'
import {AtButton, AtForm, AtInput, AtInputNumber, AtList, AtListItem} from "taro-ui";
import React from "react";
import {goods,src} from '../../tools/templateData'


export default function Index() {

  const [formData, setFormData] = React.useState({
    // 商品条码
    'goods_id': goods.id,
    // 进货价格
    'incoming_price':'',
    // 进货数量
    'incoming_quantity': '',
    // 进货日期
    'incoming_date': '',
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

