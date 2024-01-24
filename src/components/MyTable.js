// pages/index/index.tsx
import { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import './css/MyTable.scss';

function MyComponent({ headers, dataSource }) {
    useEffect(() => {
        const query = Taro.createSelectorQuery();
        query.select('.table').boundingClientRect();
        query.exec((res) => {
            const rect = res[0];
            console.log(rect);
        });
    }, []);

    if (!headers || dataSource.length === 0) {
        return <Text>No data available</Text>;
    }

    const columns = Object.keys(headers); //两个map的数据索引

    /*todo  添加排序功能
    1.对数据进行排序
    2.重新渲染 使用钩子*/

    return (
        <ScrollView className='scroll-view' scrollX>
            <View className='table-container'>
                <View className='table'>
                    {/* 表头 */}
                    <View className='row header'>
                        {columns.map((column, index) => (
                            <Text key={index} className='cell'>
                                {headers[column]}
                            </Text>
                        ))}
                    </View>

                    {/* 表格数据 */}
                    {dataSource.map((row, rowIndex) => (
                        <View key={rowIndex} className='row'>
                            {columns.map((column, columnIndex) => (
                                <Text key={columnIndex} className='cell'>
                                    {row[column]}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

export default MyComponent;
