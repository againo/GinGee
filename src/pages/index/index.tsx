import {View, Text, Button} from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {

  // useLoad(() => {
  //   console.log('Page loaded.')
  // })
  function ClickMe() {
    console.log('click me')
  }

  return (
    <View className='index'>
      <Text>Hello world!</Text>
      <Button onClick={ClickMe}>click me</Button>
    </View>
  )
}
