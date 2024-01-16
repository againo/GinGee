// import Taro from '@tarojs/taro' //官方Bug，引用这个之后就是重复引用，所以这个组件要放到本页面吗？没法成为公共组件
import React from 'react'
import { AtSearchBar } from 'taro-ui'

// class Index extends React.Component {
class Index extends Taro.Component {
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
}

export default Index
