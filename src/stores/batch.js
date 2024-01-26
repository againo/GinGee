

// 初始化字典 在一个生命周期里全部加载，并且缓存在localstorage里，生命周期结束时重新加载

import {myUrl} from "../router/routers";
import axios from "axios";

class Batch {

    static url = myUrl + '/batch/'

    constructor(){

    }

    // 进货
    static incoming(data){
        return axios.post('$url + "/incoming"',data)
            .then(res => res.data)
            .catch(err => {
                console.log('incoming error',err)
                throw err
            })
    }

    // 售货
    static outgoing(data){
        return axios.post('$url + "/outgoing"',data)
            .then(res => res.data)
            .catch(err => {
                console.log('incoming error',err)
                throw err
            })
    }

    // 开单
}
