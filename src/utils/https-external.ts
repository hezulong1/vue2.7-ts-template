import type { AxiosResponse } from 'axios';

import type { ElLoadingComponent } from 'element-ui/types/loading';
import axios from 'axios';
import { Message, Loading } from 'element-ui';
import { addCommonRequestData, catchParamsConfig } from '@/utils/commonmethods';
import { UrlInterface } from '@/utils/urls';

export interface ResponseDataAi {
  data?: any;
  msg: string;
}

export namespace API {
  export interface ReturnBody<T = any> {
    data?: T;
    msg: string;
  }
}

interface CommonRequestData {
  caseId?: string;
}

const service = axios.create({
  baseURL: '',
  timeout: 50000,
  params: {
    lang: '',
  },
});

const elLoadingUrls: string[] = [];
const elLoadingInstances: ElLoadingComponent[] = [];

const startLoading = (url: string, message: string) => {
  url = url.slice(Math.max(0, url.lastIndexOf('/') + 1));

  if (elLoadingUrls.indexOf(url) < 0) {
    elLoadingUrls.push(url);
    const loader = Loading.service({
      lock: true,
      text: message || '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.7)',
    });
    elLoadingInstances.push(loader);
  }
};

const stopLoading = (url: string) => {
  url = url.slice(Math.max(0, url.lastIndexOf('/') + 1));
  const index = elLoadingUrls.indexOf(url);
  if (index > -1) {
    elLoadingInstances[index].close();
    elLoadingInstances.splice(index, 1);
    elLoadingUrls.splice(index, 1);
  }
};

const stopLoadingAll = () => {
  elLoadingInstances.forEach(ins => ins.close());
  elLoadingUrls.length = 0;
  elLoadingInstances.length = 0;
};

// request 拦截器 axios 的一些配置
service.interceptors.request.use(
  (config) => {
    const { loading, loadText, url } = config as any;
    if (loading && url) {
      startLoading(url, loadText || '');
    }

    addCommonRequestData<CommonRequestData>(
      config,
      [
        UrlInterface.CaseInfo,
        UrlInterface.Mark,
        UrlInterface.MarkExport,
        UrlInterface.RelevantListQp,
      ],
      {
        caseId: catchParamsConfig.caseId.value,
      },
    );

    return config;
  },
  (error) => {
    console.error('error:', error);
    Promise.reject(error);
  },
);

// respone 拦截器 axios 的一些配置
service.interceptors.response.use(
  (response: AxiosResponse<API.ReturnBody>) => {
    const { loading, url } = response.config as any;
    if (loading && url) {
      stopLoading(url);
    }

    if (response.status === 200) {
      return response.data.data;
    } else {
      const msg = response.data.msg || 'Error';
      Message.error(msg);
      return Promise.reject(new Error(msg));
    }
  },
  (error) => {
    Message.error(error?.response?.data?.msg ?? 'global api error');
    stopLoadingAll();
    return Promise.reject(error);
  },
);

export default service;
