import React from "react";
import {View} from "@tarojs/components";


// for test
class Index extends React.Component {
  render() {
    return <View>Hello, {this.props.name}</View>
  }
}

// 重看一遍export怎么写，什么是export default
// export 和 引用两个地方的相对应写法
export default Index
