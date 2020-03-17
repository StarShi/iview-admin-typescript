/**
 * 基于axios封装请求函数
 * created by 石鑫 shixin007@foxmail.com
 *
 */

import axios from "axios";
import config from '@/config';
import store from "@/libs/store";

const baseurl = config.domain_name;//根据打包环境配置不同的服务器域名

//请求地址
axios.defaults.baseURL = baseurl;

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

let requestNum: number = 0;//判断所有请求是否加载完毕
//请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token;
    const token: string = store.state.token;
    token && (config.headers['ACCESS-TOKEN'] = token);
    //    config.headers['ACCESS-TOKEN'] = ''
    store.commit('showLoading');
    requestNum++;
    return config;
  },
  error => {
    store.commit('hideLoading');
    return Promise.reject(error);
  });

// 响应拦截器
axios.interceptors.response.use((response) => {
  requestNum--;
  if (requestNum <= 0) {
    store.commit('hideLoading');
  } else {
    store.commit('showLoading');
  }
  return response;
},
  error => {
    requestNum--;
    if (requestNum <= 0) {
      store.commit('hideLoading');
    } else {
      store.commit('showLoading');
    }
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)';
          break;
        case 401:
          error.message = '未授权，请重新登录(401)';
          break;
        case 403:
          error.message = '拒绝访问(403)';
          break;
        case 404:
          error.message = '请求出错(404)';
          break;
        case 408:
          error.message = '请求超时(408)';
          break;
        case 500:
          error.message = '服务器错误(500)';
          break;
        case 501:
          error.message = '服务未实现(501)';
          break;
        case 502:
          error.message = '网络错误(502)';
          break;
        case 503:
          error.message = '服务不可用(503)';
          break;
        case 504:
          error.message = '网络超时(504)';
          break;
        case 505:
          error.message = 'HTTP版本不受支持(505)';
          break;
        default:
          error.message = `连接出错(${error.response.status})!`;
      }
    } else {
      error.message = '连接服务器失败!'
    }
    return Promise.reject(error);

  }
);

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function del(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      data: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      alert(err.message);
    });
  });
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    })
      .catch(err => {
         alert(err.message);
      })
  });
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axios.put(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
         alert(err.message);
      })
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
         alert(err.message);
      })
  });
}