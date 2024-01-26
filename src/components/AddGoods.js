import Taro from '@tarojs/taro';
import {AtForm, AtInput, AtButton, AtCheckbox, AtList, AtListItem, AtFloatLayout, AtCard, AtIcon, AtTag} from 'taro-ui';
import {useState} from "react";
import {Picker, Text, View} from "@tarojs/components";
import {shelfLifeRange,typeOptions} from "../tools/dictoryTool";
import {arrayToObject} from "../tools/objUtil";
import {saveToLocalStorage} from "../tools/storageTool";
// react的组件可以不通过function，直接定义实体
const AddGoodsForm = ({form={}}) => {
  const [formData, setFormData] = useState(form ? form : {
    name: '',
    specification: '',
    produce_place: '',
    produce_company: '',
    sale_company: '',
    market_time: '',
    ingredient: '',
    nutrient: '',
    shelf_life: '',
    shelf_life_unit: '',
    type: [],
    imglist: [],
    brand: '',
    code: ''
  });

  // 入口的地方把所有字典异步加载完成（到缓存中）

  // type 变量
  const [isTypeOptionOpen,setIsTypeOptionOpen] = useState(false); // 控制弹窗的变量

  const options = typeOptions;
  const optionsShow = arrayToObject(options, 'value', 'label');



  /* todo 编辑商品
    1.入口
    2.获取表单数据
    3.handleSubmit的地方处理 or 后端只提供一个接口进行处理？
   */



  // 表单处理绑定函数的写法
  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleShelfLife = (value,unit) => {
      if(unit == '天')
        value = value += unit
      else if(unit == '月')
        value = value*=30 + '天'
      else if(unit == '年')
        value = value*=365 + '天'
      else
        return
      handleInputChange('shelf_life', value)
  }

  // 处理下拉多选多值
  const handleTypeChange = (option) => {
    setFormData({
      ...formData,
      type: option,
    });
  };

  const handleSubmit = () => {
    // 处理表单提交逻辑
    console.log('Form Data:', formData);
    // saveToLocalStorage('goodsSubmit', formData)

    // 在这里进行表单校验
    if(checkForm()){
      // 保存数据
      saveToLocalStorage('goodsSubmit', formData)
      Taro.showToast({
          title: '提交成功',
          icon: 'none',
      });
    }
    // 跳转到添加批次

  };

  // 表单校验
  function checkForm(){
      if (!formData.name) {
          Taro.showToast({
              title: '请填写商品名称',
              icon: 'none',
          });
          return false
      }
      if (!formData.specification) {
          Taro.showToast({
              title: '请填写规格',
              icon: 'none',
          });
          return false
      }
      if (!formData.shelf_life) {
          Taro.showToast({
              title: '请填写保质期',
              icon: 'none',
          });
          return false
      }
      if (!formData.type) {
          Taro.showToast({
              title: '请选择分类',
              icon: 'none',
          });
          return false
      }
      return true
  }

  return (
    <AtForm onSubmit={handleSubmit}>
      {/*商品名称*/}
      <AtInput
        name='name'
        title='商品名称'
        type='text'
        placeholder='请填写商品全称（如 特仑苏 旺仔牛奶 怡宝纯净水）'
        value={formData.name}
        onChange={(value) => handleInputChange('name', value)}
      />
      {/*<AtInput*/}
      {/*  name='password'*/}
      {/*  title='密码'*/}
      {/*  type='text'*/}
      {/*  placeholder='请输入密码'*/}
      {/*  value={formData.password}*/}
      {/*  onChange={(value) => handleInputChange('password', value)}*/}
      {/*/>*/}
      {/*上传图片*/}
      {/*类型 下拉多选 浮动弹窗 + 多选框*/}
      <AtList>
          <AtListItem title='请选择商品分类' note={formData.type?.length > 0 ? formData.type.map((value) => (
              <AtTag>{optionsShow[value]}</AtTag>
          )) : null} extraText='todo：大类数值' onClick={() => setIsTypeOptionOpen(!isTypeOptionOpen)}
          />
      </AtList>
      <AtFloatLayout title='选择商品分类' isOpened={isTypeOptionOpen} onClose={() => setIsTypeOptionOpen(false)} scrollY>
        <AtCheckbox options={options} selectedList={formData.type} onChange={(option) => {handleTypeChange(option)}} />
      </AtFloatLayout>
      {/*规格 单位下拉选*/}
        <AtInput
          name='specification'
          title='规格'
          type='text'
          placeholder='请填写商品规格（如 245ml × 24罐）'
          value={formData.specification}
          onChange={(value) => handleInputChange('specification', value)}
        />
      {/*<Picker mode='selector' range={options}>
          <AtList>
              <AtListItem title='请选择商品分类' extraText='for example' />
          </AtList>
      </Picker>*/}
      {/*保质期 单位下拉选*/}
        <View className='at-row'>
            <AtInput
              className='at-col at-col-9'
              name='shelf_life'
              title='保质期'
              type='number'
              placeholder='请填写保质期'
              value={formData.shelf_life}
              onChange={(value) => handleInputChange('shelf_life',value)}
            />
            {/*value是指定初始化时选择第几个*/}
          <Picker className='at-col at-col-3' mode='selector' range={shelfLifeRange} value={2} onChange={(value) => handleInputChange('shelf_life_unit',shelfLifeRange[value.detail.value])}>
              <Text>{formData.shelf_life_unit}</Text>
              <AtIcon value='chevron-down' size='30' color='#F00'></AtIcon>
              {/*默认显示天，border显示*/}
          </Picker>
        </View>
      {/*配料表*/}
        <AtInput
          name='ingredient'
          title='配料表'
          type='text'
          placeholder='请填写配料表'
          value={formData.ingredient}
          onChange={(value) => handleInputChange('ingredient', value)}
        />
      {/*营养成分*/}
        <AtInput
          name='nutrient'
          title='营养成分'
          type='text'
          placeholder='请填写营养成分'
          value={formData.nutrient}
          onChange={(value) => handleInputChange('nutrient', value)}
        />
      {/*品牌*/}
        <AtInput
          name='brand'
          title='品牌'
          type='text'
          placeholder='请填写品牌'
          value={formData.brand}
          onChange={(value) => handleInputChange('brand', value)}
        />
      {/*产地*/}
        <AtInput
          name='produce_place'
          title='产地'
          type='text'
          placeholder='请填写产地'
          value={formData.produce_place}
          onChange={(value) => handleInputChange('produce_place', value)}
        />
      {/*生产公司*/}
        <AtInput
          name='produce_company'
          title='生产公司'
          type='text'
          placeholder='请填写生产公司'
          value={formData.produce_company}
          onChange={(value) => handleInputChange('produce_company', value)}
        />
      {/*销售公司*/}
        <AtInput
          name='sale_company'
          title='销售公司'
          type='text'
          placeholder='请填写销售公司'
          value={formData.sale_company}
          onChange={(value) => handleInputChange('sale_company', value)}
        />
      {/*上市时间*/}
        <Picker mode='date' value={formData.market_time} onChange={(event) => handleInputChange('market_time',event.detail.value)}>
            <AtList>
                <AtListItem title='上市时间' extraText={formData.market_time} />
            </AtList>
        </Picker>
      {/*其它参数表*/}
      <AtButton type='primary' formType='submit'>提交</AtButton>
    </AtForm>
  );
};

// 做校验
// 规格值处理

export default AddGoodsForm;
