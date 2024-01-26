export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/askDetail/index',
    'pages/incoming/index',
    'pages/outgoing/index',
    'pages/search/detail/index',
    'pages/search/list/index',
    'pages/goods/add',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'GinGee',
    navigationBarTextStyle: 'black',
    navigationStyle: 'default'
  },
  tabBar: {
    // 导航栏高度为50px
    color: "#515151",
    selectedColor: "#A28F81",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "./static/tabBar/home.svg",
        selectedIconPath: "./static/tabBar/home.svg",
        text: "首页",
      },
      {
        pagePath: "pages/information/index",
        iconPath: "./static/tabBar/message.svg",
        selectedIconPath: "./static/tabBar/message.svg",
        text: "行业信息",
      },
      {
        pagePath: "pages/data/index",
        iconPath: "./static/tabBar/data.svg",
        selectedIconPath: "./static/tabBar/data.svg",
        text: "报表",
      },
      {
        pagePath: "pages/user/index",
        iconPath: "./static/tabBar/user.png",
        selectedIconPath: "./static/tabBar/user.png",
        text: "我的",
      },
    ]
  },
})
