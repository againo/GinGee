import {View, Image, ScrollView, Text} from "@tarojs/components";
import {useEffect} from "react";
import Taro from "@tarojs/taro";
import './css/ThunbGoodsCard.scss'

const src = 'https://img2.baidu.com/it/u=1939201416,2149832028&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=426'

function MyComponent({ headers, listData }) {
  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query.select('.card').boundingClientRect();
    query.exec((res) => {
      const rect = res[0];
      console.log(rect);
    });
  }, []);

  headers = {
    name: '商品名称',
    description: '描述1',
    specification: '规格',
    price: '价格'
  }

  // const columns = Object.keys(headers); //两个map的数据索引


  listData = [
    {
      img: src,
      name: 'name1',
      description: 'description1',
      specification: 'specification1',
      price: '1.4'
    },
    {
      img: src,
      name: 'name2',
      description: 'description2',
      specification: 'specification2',
      price: '1.6'
    },
    {
      img: src,
      name: 'name3',
      description: 'description3',
      specification: 'specification3',
      price: '1.7'
    }
  ]

    //todo 点击列表展示详情

  return (
    <View>
      <Image src={src} />
      {listData.map((item) => (
          <View className='image-with-list'>
            <View className='image-container'>
              <Image src={item.img} />
            </View>
            <ScrollView className='list' scrollY>
              {Object.keys(headers).map((key) => (
                  <View className='list-item'>
                    <Text>{headers[key]}</Text>
                    <Text className='list-item-value-color'>{item[key]}</Text>
                  </View>
                ))}
            </ScrollView>
          </View>
        ))}
    </View>
  );
}
export default MyComponent;
