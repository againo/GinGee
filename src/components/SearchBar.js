// import Taro from '@tarojs/taro' //官方Bug，引用这个之后就是重复引用，所以这个组件要放到本页面吗？没法成为公共组件
import React, {useEffect, useState} from 'react'
import { AtSearchBar } from 'taro-ui'
import Taro from "@tarojs/taro";

// class Index extends React.Component {
/*class Index extends React.Component {
  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }
  onChange (value) {
    this.setState({
      value: value
    })
  }
  onActionClick () {
    console.log('开始搜索')
  }
  render () {
    return (
      <AtSearchBar
        actionName='搜一下'
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onActionClick={this.onActionClick.bind(this)}
      />
    )
  }
}*/

function MyComponent(){
  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query.select('.search').boundingClientRect();
    query.exec((res) => {
      const rect = res[0];
      console.log(rect);
    });
  }, []);

  const [value, setValue] = useState('')

  function ClickFunc () {
    console.log('开始搜索')
  }

  return (
    <AtSearchBar
      className='search'
      actionName='搜索'
      placeholder='请输入商品名称'
      value={value}
      onChange={(a) => setValue(a)}
      onActionClick={ClickFunc}
    />
  )
}

export default MyComponent;
