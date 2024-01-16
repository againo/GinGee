// import Taro from '@tarojs/taro'
import {View, Text, Button} from '@tarojs/components'
import './index.scss'
import {AtButton, AtSearchBar, AtTabBar} from "taro-ui";
// import '../../component/SearchBar.js'
// import Welcome from "../../component/Welcome";
// import SearchBar from "../../component/SearchBar";
import React from "react";

export default function Index() {

  function SearchBar1(props) {
    // console.log(props)
    return (
          <SearchBar value={props.value}></SearchBar>
          )
  }



  function ClickMe() {
    console.log('click me')
  }

  return (
    <View className='index'>
      <Text>Hello world!</Text>
      <SearchBar1 value='hello'></SearchBar1>
      <Button onClick={ClickMe}>click me</Button>
      <AtButton size='normal'>询价</AtButton>
      <AtButton>进货</AtButton>
      <View className='at-row'>
        <View className='at-col at-col-1 at-col--wrap'>
          内容自动换行dsdsdsdsdsdssdsdsds
        </View>
        <View className='at-col'>B</View>
      </View>
      <AtButton>售货</AtButton>
    </View>
  )
}

class SearchBar extends React.Component {
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
    // 拿value去搜索数据
  }
  onActionClick () {
    console.log(this.state.value)
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
