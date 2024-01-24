import Taro from "@tarojs/taro";

export function scanCode(){
    // success 和 fail分别是什么情况？是对errMsg的处理吗？需要验证
    Taro.scanCode({
        success: (res) => {
            return res
        },
        fail: (res) => {
            return res
            // 重新发起扫码
        }
    })
}
