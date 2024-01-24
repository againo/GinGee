import Taro from '@tarojs/taro'
import {View} from "@tarojs/components";
import SearchBar from "../../../components/SearchBar";
import ThumbGoodsCard from "../../../components/ThumbGoodsCard";

export default function Index(){
  return (
    <View>
      <SearchBar />
      <ThumbGoodsCard />
    </View>
  )
}
