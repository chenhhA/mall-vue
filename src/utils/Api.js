import axios from 'axios'
import router  from '../router'
import Notify from "vant/es/notify";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
    timeout: 5000 // request timeout
});

service.interceptors.response.use(success => {
    // 错误
    if (success.status && success.status == 200 && success.data.status == 500) {
        // 封装响应Bean中返回500
        Notify({ type: 'warning', message: success.data.msg});
        return;
    }
    // 如果有返回响应信息
    if (success.data.msg){
        Notify({ type: 'success', message: success.data.msg});
    }
    return success.data; // 返回服务器返回的对象
}, error => {
     if (error.response.status == 504 || error.response.status == 404) {
         Notify({ type: 'warning', message: '无法找到服务器' });
    } else if (error.response.status == 403) {
         Notify({ type: 'warning', message: '权限不足，请联系管理员' });
    } else if (error.response.status == 401) {
         Notify({ type: 'warning', message: '请登陆后重试' });
        router.replace("/login");
    } else {
        if (error.response.data.msg) {
            Notify({ type: 'warning', message: error.response.data.msg });

        } else {
            Notify({ type: 'warning', message: '未知错误' });
        }
    }
    return;
});

service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

let base = '';



export const postKeyValueRequest = (url, params) => {
    return service({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
            }
            return ret;
        }],
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

export const postRequest = (url, params) => {
    return service({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
};

export const putRequest = (url, params) => {
    return service({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
};

// 省略POST、PUT、DELETE
export const getRequest = (url, params) =>
{
    return service({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
};

export const deleteRequest = (url, params) => {
    return service({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
};

export default service
