import Taro from '@tarojs/taro'
import {View, Text} from "@tarojs/components";
import GoodsDetail from "../../../components/GoodsDetail";
import NoDataDefault from "../../../components/NoDataDefault";
import './index.scss'
import { detailFormData as formData } from '../../../tools/templateData'

export default function Index(){


    // 进货
    function handleIncome(){
        // 推送到进货页面

    }

    // 售货
    function handleSale(){
        // 推送到售出页面
        alert('敬请等待')
    }

    return (
        <View>
        {
            Object.keys(formData).length <= 0 ? <NoDataDefault /> :
                <View>
                    <View className='at-row'>
                        <View className='button-div-itemA at-col at-col-6' onClick={handleIncome}>
                            <Text className='textA'>进货</Text>
                        </View>
                        <View className='button-div-itemB at-col at-col-6' onClick={handleSale}>
                            <Text className='textB'>售货</Text>
                        </View>
                    </View>
                    <GoodsDetail formData={formData} />
                </View>
        }
        </View>
    )
}
