import './index.scss'
import GoodsDetail from "../../components/GoodsDetail";
import {detailFormData} from "../../tools/templateData";
import {useEffect} from "react";
import {getCurrentInstance} from "@tarojs/runtime";
import {Button} from "@tarojs/components";
import Taro from "@tarojs/taro";
import {getDataWithNav} from "../../tools/storageTool";
// import default 的情况，可自定命名


export default function Index()  {

  // todo 头部返回导航要弄的

  // 实现商品编辑（在detail页面添加入口）
  const params = getCurrentInstance().router.params; // ok,能获取
  console.log('params',params)
  const data = getDataWithNav(params)
  console.log('data',data)
    return (
        <GoodsDetail formData={data} />
    )
}
