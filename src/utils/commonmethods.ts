// import store from '@/store/index';

// const { state: { Site } } = store;

export interface ICatchParam {
  key: string;
  exclude: boolean;
  value: any;
  catchValue: (value: any) => void;
  noValue?: () => void;
  [K: string]: any;
}

export const catchParamsConfig: Record<string, ICatchParam> = { // 地址栏参数拦截配置
  'patch': {
    exclude: true, // 缓存后是否从url地址栏移除
    key: 'patch', // 需要缓存的参数
    value: null, // 参数内容
    patchRequireKey: ['x', 'y', 'w', 'h'], // 必填参数
    correlationAuthKey: ['lakePatch'], // 允许操作的平台key
    catchValue(value) { // 添加参数缓存
      try {
        let patchInfo = JSON.parse(value);
        // eslint-disable-next-line no-console
        if (!this.patchRequireKey.every((key: any) => patchInfo[key])) return console.log('patch缺少必填参数');
        this.value = ('zoom' in patchInfo) ? patchInfo : { ...patchInfo, zoom: 20 };
      } catch {
        // eslint-disable-next-line no-console
        console.log('patch参数解析错误,请确入参格式');
      }
    },
  },
  'caseId': {
    exclude: false, // 缓存后是否从url地址栏移除
    key: 'caseId', // 需要缓存的参数
    value: '', // 参数内容
    noValue() {
      this.value = '';
    },
    catchValue(value) { // 添加参数缓存
      this.value = value;
    },
  },
  'markId': { // lake洞庭湖平台的标注id
    exclude: false,
    key: 'markId',
    value: '',
    catchValue(value) { // 添加参数缓存
      this.value = value;
    },
  },
};

// export let setPos = (posInfo, AIcellsInstance: any = null) => { // 公用定位+标注,标注非必须
//   let { x: coordsX, y: coordsY, w: width, h: height, zoom } = posInfo;
//   Viewer.zoomToObjSecond(zoom, 0.1);
//   Viewer.anoMove({
//     x: (coordsX + width / 2) / Site.slide.width,
//     y: (coordsY + height / 2) / Site.slide.width,
//   }, 0.1);
//   AIcellsInstance && AIcellsInstance.showAno({ coordsX, coordsY, width, height });
// };

// TODO 没看懂这是做什么
function getRealUrl(urlArr: string[], position: number): string {
  if (Number.isNaN(urlArr[urlArr.length - position])) {
    return urlArr[urlArr.length - position];
  } else {
    return getRealUrl(urlArr, ++position);
  }
}
export const addCommonRequestData = <T>(requestConfig: any, curUrls: Array<string>, commonData: T, excludeMehod?: Array<string>) => {
  const urlName = getRealUrl(requestConfig.url.split('/'), 1);
  if (excludeMehod && (excludeMehod.indexOf(requestConfig.method) === -1)) return requestConfig;
  if (curUrls.indexOf('/' + urlName) !== -1)Object.assign(requestConfig[requestConfig.data ? 'data' : 'params'], commonData);
};
