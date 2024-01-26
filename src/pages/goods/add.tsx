import AddGoods from "../../components/AddGoods";
import {getCurrentInstance} from "@tarojs/runtime";
import {getDataWithNav, getFromLocalStorage} from "../../tools/storageTool";
import {AtButton} from "taro-ui";
import {View} from "@tarojs/components";


export default function Index()  {

  // 判断是否传入form需要编辑
  const params = getCurrentInstance().router.params;
  const data = getDataWithNav(params);

  function ClickMe(){
      const ab = getFromLocalStorage('goodsSubmit')
      console.log('goodsSubmit',ab)
  }

  return (
      <View>
          {/*<AtButton onClick={ClickMe}>hello</AtButton>*/}
          !data ? <AddGoods form={data} /> : <AddGoods />
      </View>
   )
}
