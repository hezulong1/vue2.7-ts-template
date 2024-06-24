import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from 'axios';
import { Message, Loading } from 'element-ui';
import * as CONFIG from 'local-config';

export interface IReturnApi<T = any> {
  data?: T;
  msg: string;
}

export default function initServiceExternal(cname: string): AxiosInstance | any {
  // 创建 axios 实例
  let serviceExternal: AxiosInstance | any;
  // process.env.NODE_ENV === "development"
  serviceExternal = axios.create({
    baseURL: CONFIG[cname],
    timeout: 50000,
    // withCredentials:true,
    params: {
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
  serviceExternal.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config['loading'] && config['url']) {
        startLoading(config['url'], config['loadText']);
      }
      return config;
    },
    (error: any) => {
      error.response.data.msg,
      // Do something with request error
      console.error('error:', error); // for debug
      Promise.reject(error);
    },
  );

  // respone 拦截器 axios 的一些配置
  serviceExternal.interceptors.response.use(
    (res: AxiosResponse) => {
      if (res.config['loading'] && res.config['url']) {
        stopLoading(res.config['url']);
      }
      if (res.status === 200) {
        const data: ResponseDataAi = res.data;
        return data.data;
      } else {
        Message({
          message: res.data.msg,
          type: 'error',
        });
        return Promise.reject(new Error(res.data.msg || 'Error'));
      }
    },
    (error: any, url: any) => {
      Message({
        message: error.response.data.msg,
        type: 'error',
      });
      stopLoadingAll();
      return Promise.reject(error);
    },
  );
  return serviceExternal;
}
