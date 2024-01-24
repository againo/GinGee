import {Text, View} from "@tarojs/components";
import {AtFloatLayout, AtList, AtListItem} from "taro-ui";
import MyTable from "./MyTable";
import {useState} from "react";
import {RMB} from '../tools/dictoryTool'

function MyComponent({formData}) {
    const [isBatchOpen, setIsBatchOpen] = useState(false)

    // 批次表头
    const batchHeader = {
        // 进货价
        incoming_price: '进货价',
        // 进货数量
        incoming_quantity: '进货数量',
        // 剩余数量
        remaining_quantity: '剩余数量',
        // 进货日期
        incoming_date: '进货日期',
        // 过期日期
        expire_date: '过期日期',
    }

    if (formData.length === 0) {
        console.log('nothing')
        return <Text>No data available</Text>;
    }

    return (
        <View className='container'>
            {/*<Button onClick={() => console.log(remainingQuantityTotal)}>hello</Button>*/}
            {/*添加商品表单*/}
            {/*<AddGoods />*/}
            {/*  询价详情页*/}
            {/*数据刷新的策略?*/}
            {/*  不应该弄表格，直接使用弹框处理会合适些*/}
            <AtList>
                <AtListItem title='商品名称' extraText={formData.name} />
                <AtListItem title='价格' extraText={RMB + formData.price} />
                <AtListItem title='历史低价' extraText={RMB + formData.historyLowPrice} />
                <AtListItem title='历史高价' extraText={RMB + formData.historyHighPrice} />
                {/*现货批次往往不会太多,直接展示*/}
                <AtListItem title={'现货批次 & ' + '余量: ' + formData.nowBatch.reduce((a, b) => {
                    return a + b.incoming_quantity
                }, 0)} note={<MyTable headers={batchHeader} dataSource={formData.nowBatch} />}
                ></AtListItem>
                {/*因为数据多使用弹窗展示*/}
                <AtListItem title='历史批次' extraText={'总量: ' + formData.historyBatchQuantity} arrow='right' onClick={() => setIsBatchOpen(true)} />
                <AtListItem title='规格' extraText={formData.specification} />
                <AtListItem title='配料表' extraText={formData.ingredient} />
                <AtListItem title='营养成分' extraText={formData.nutrient} />
                {/*<AtListItem title='其他参数' extraText={formData} />*/}
                <AtListItem title='品牌' extraText={formData.brand} />
                <AtListItem title='生产公司' extraText={formData.produce_company} />
                <AtListItem title='销售公司' extraText={formData.sale_company} />
                <AtListItem title='产地' extraText={formData.produce_place} />
                <AtFloatLayout isOpened={isBatchOpen} title='历史批次（最近二十条）' onClose={() => setIsBatchOpen(!isBatchOpen)}>
                    <MyTable headers={batchHeader} dataSource={formData.historyBatch} />
                </AtFloatLayout>
                {/*图片 固定在底部 todo 可以不要,并不切中需求*/}
            </AtList>
        </View>
    )
}

export default MyComponent;
