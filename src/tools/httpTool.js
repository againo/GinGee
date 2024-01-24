// 引入 Axios 库
import axios from 'axios';

// 创建一个 HTTP 请求工具
export const httpRequest = async (method, url, data = null, headers = {}) => {
    try {
        // 发送 HTTP 请求
        const response = await axios({
            method, //post get put delete
            url,
            data,
            headers: headers || {}
        });

        // 处理成功响应
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        // 处理错误
        console.error('Error:', error);
        throw error;
    }
};

export const httpPost = async (url, data = null, headers = {}) => {
    return this.httpRequest('GET', url, data, headers);
};

export const httpGet = async (url, params = null, headers = {}) => {
    try {
        // 发起 GET 请求，传递参数
        const response = await axios.get(url, {
            params: params || {}, // 或者直接 params
            headers: headers || {}
        });

        // 检查请求是否成功 (状态码 200-299)
        if (!response.data) {
            throw new Error('Empty response data');
        }

        // 返回解析后的数据
        return response.data;
    } catch (error) {
        // 捕获并处理错误
        console.error('Error:', error.message);
        throw error; // 可选：将错误重新抛出，以便调用者处理
    }
}

export const httpRequestWithToken = async (method, url, data = null, headers = {}) => {
    try {
        // 发送 HTTP 请求
        const response = await axios({
            method, //post get put delete
            url,
            data,
            headers: {
                ...headers,
                'Authorization': 'Bearer ' + wx.getStorageSync('token')
            }
        });

        // 处理成功响应
        console.log('Response:', response.data);
        return response.data;
    } catch (e){
        console.error('Error:', e);
        throw e
    }
}


