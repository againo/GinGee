// 存储数据到 localStorage
import {isNotEmpty} from "./objUtil";

export function saveToLocalStorage(key, data) {
    try {
        // 将数据转换为 JSON 字符串并存储
        const jsonString = JSON.stringify(data);
        localStorage.setItem(key, jsonString);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        throw error
    }
}

// 从 localStorage 获取数据
export function getFromLocalStorage(key) {
    try {
        // 从 localStorage 获取数据并解析为 JSON 对象
        const jsonString = localStorage.getItem(key);
        return jsonString ? JSON.parse(jsonString) : null;
    } catch (error) {
        console.error('Error getting from localStorage:', error);
        return null;
    }
}

export function getDataWithNav(params){
  if(isNotEmpty(params)){
    return getFromLocalStorage(params.dataKey)
  }
}
