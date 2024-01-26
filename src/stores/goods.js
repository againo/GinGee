// 获取商品（byid）return single

// 获取商品（byCode）return single
// 获取商品（byName） return list

// 商品编辑


// 处理保质期 只要入口是对的，出口的值就好处理，因为默认要做转换


// get detail

import axios from "axios";
import {myUrl} from "../router/routers";

class Goods {

    static url = myUrl + '/goods'

    constructor(id = '', code = '', name = '') {
        if(!id && !code && !name){
            throw new Error('No id, code or name provided')
        }
        this.id = id;
        this.code = code;
        this.name = name;
    }

    static getGoodsById(id = '') {
        return axios.get(`$url/byId/${this.id ? this.id : id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching Goods by id:', error);
                throw error;
            });
    }

    static getGoodsByCode(code) {
        return axios.get(`$url/byCode/${this.code ? this.code : code}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching Goods by code:', error);
                throw error;
            });
    }

    static getGoodsListByName(name) {
        return axios.get(`$url/byName${this.name ? this.name : name}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching goods by name:', error);
                throw error;
            });
    }

    static editGoods(updatedGoods) {
        return axios.put(`$url/adit`, updatedGoods)
            .then(response => response.data)
            .catch(error => {
                console.error('Error editing Goods:', error);
                throw error;
            });
    }
}

