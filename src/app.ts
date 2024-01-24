import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import './app.scss'


function App({ children }: PropsWithChildren<any>) {

  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App

// app.jsx

/*import Taro from '@tarojs/taro';
import './app.scss';

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      // 其他页面
    ],
    // 其他配置项
  };

  globalData = {
    RMB: null,
    userInfo: null, // 示例全局变量 userInfo
    // 可以添加其他全局变量
  };

  // 生命周期函数中可以进行全局变量的初始化等操作
  async componentDidMount() {
    // 例如，从后端获取用户信息并存储到全局变量中
    // const userInfo = await getUserInfo(); // 示例获取用户信息的函数
    this.globalData.RMB = '$';
  }

  render() {
    return (
        // 其他组件
        <Index />
    );
  }
}

Taro.render(<App />, document.getElementById('app'));*/
