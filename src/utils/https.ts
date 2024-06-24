import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { Message, Loading } from 'element-ui';
import { isAbsoluteAddress } from '@/utils/fliters';
import { addCommonRequestData, catchParamsConfig } from '@/utils/commonmethods';
import { UrlInterface } from '@/utils/urls';
import router from '@/utils/router';

export interface ResponseData {
  data?: any;
  msg: string;
}

interface CommonRequestData {
  caseId?: string;
}

// 创建 axios 实例
let service: AxiosInstance | any;
// process.env.NODE_ENV === "development"
service = axios.create({
  baseURL: URLS.basicUrl,
  timeout: 50000,
  params: {
    lang: '',
  },
});
let loadingTasks: any = [];// laoding任务流记录
let loadingEvents: any = [];// loading实例管理
const startLoading = (url: string, text?: string) => {
  const urlName: string = url.slice(Math.max(0, url.lastIndexOf('/') + 1));
  if (loadingTasks.indexOf(urlName) < 0) {
    loadingTasks.push(urlName);
    const loader = Loading.service({
      lock: true,
      text: text || '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)',
    });
    loadingEvents.push(loader);
  }
};
const stopLoading = (url: string) => {
  const urlName: string = url.slice(Math.max(0, url.lastIndexOf('/') + 1));
  const i: number = loadingTasks.indexOf(urlName);
  if (i > -1) {
    loadingEvents[i].close();
    loadingEvents.splice(i, 1);
    loadingTasks.splice(i, 1);
  }
};
// 网络中断时没有response，结束所有loading
const stopLoadingAll = () => {
  loadingEvents.forEach((item) => {
    item.close();
  });
  loadingTasks = [];
  loadingEvents = [];
};

// request 拦截器 axios 的一些配置
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config['loading'] && config['url']) {
      startLoading(config['url'], config['loadText']);
    }
    addCommonRequestData<CommonRequestData>(config, [UrlInterface.Info, UrlInterface.Capture], { caseId: catchParamsConfig.caseId.value });
    return config;
  },
  (error: any) => {
    // Do something with request error
    console.error('error:', error); // for debug
    Promise.reject(error);
  },
);

// respone 拦截器 axios 的一些配置
service.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.config['loading'] && res.config['url']) {
      stopLoading(res.config['url']);
    }
    if (res.status === 200) {
      const data: ResponseData = res.data;
      return data.data;
    } else if (res.status === 202) { // TransToFile 接口返回 status 202 表示切片处于【归档】状态，需要进行取回
      return { code: 202 };
    } else if (res.status === 204) { // TransToFile 接口返回 status 204 表示切片处于【归档】状态，取回完毕
      return { code: 204 };
    } else {
      Message({
        message: res.data.msg,
        type: 'error',
      });
      return Promise.reject(new Error(res.data.msg || 'Error'));
    }
  },
  (error: any, url: any) => {
    if (error.response.status === 401) {
      Message({
        message: error.response.data.msg,
        type: 'error',
      });
      return Promise.reject(router.replace({ name: 'noauth', query: { page: '1', lang: router.currentRoute.query.lang, url: isAbsoluteAddress(error.response.data.data.loginUrl) } }));
    } else if (error.response.status === 403) {
      Message({
        message: error.response.data.msg,
        type: 'error',
      });
      return Promise.reject(router.replace({ name: 'noauth', query: { page: '2', lang: router.currentRoute.query.lang } }));
    } else {
      Message({
        message: error.response.data.msg,
        type: 'error',
      });
      stopLoadingAll();
      return Promise.reject(error);
    }
  },
);
export default service;
