
//获取页面文档的总高度
export function getDocumentHeight() :number{
  //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
}
//页面浏览器视口的高度
export function getWindowHeight() :number|undefined{
  return document.compatMode === "CSS1Compat"
    ? document.documentElement.clientHeight
    : document.body.clientHeight;
}
//// 时间 格式化成 2018-12-12 12:12:00
export function timestampToTime(timestamp: Date | any, dayMinSecFlag: boolean) :string{
  const date = new Date(timestamp);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D =
    date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
  const h =
    date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
  const m =
    date.getMinutes() < 10
      ? "0" + date.getMinutes() + ":"
      : date.getMinutes() + ":";
  const s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (!dayMinSecFlag) {
    return Y + M + D;
  }
  return Y + M + D + h + m + s;
}
//页面浏览器视口的高度

//合并对象
export const concatObject = (source:any,curData:any) =>{
  Object.keys(source).forEach(item=>{
      if(item in curData){
          source[item] = curData[item]
      }
  })
}

// 发布订阅工具
class PubSub {  //*全局使用时,采用单例模式。
  topics = {}
  
  /** 
   *  @name  subscribe
   *  @param {string} key --订阅key
   *  @param {function} callback --发布执行回调
   *  @desc 执行订阅
  */
  subscribe(key,callback){
      if(!this.topics[key]){
          this.topics[key] = [];
      }
      this.topics[key].push(callback)
  }

  /** 
   *  @name  publish
   *  @param {string} key --发布key
   *  @param {any} args --发布参数集合
   *  @desc 发布订阅
  */
  publish(key,...args){
      if(this.topics[key]){
          for(let fn of this.topics[key]){
              fn(...args)
          }
      }else{
          console.log(`发布失败,未创建: ${key}`)
      }
  }

  /** 
   *  @name  removeSub 
   *  @param {string} key --订阅key
   *  @param {function} fn --订阅的方法引用
   *  @desc 移除订阅
  */
  removeSub(key,fn){
     if(this.topics[key]){
          this.topics[key].splice(this.topics[key].findIndex(item=>item === fn),1)  
     }else{
         console.log(`移除失败,未定义的 ：${key}`)
     }
  }

}

export let pubsub =  new PubSub();


/** 
 *  @name  防抖节流装饰函数
 *  @param {Function} fn -- 原函数
 *  @param {String} type --装饰类型  当前可选 debounce:防抖  throttle:节流  默认值:throttle
 *  @param {number} waitTime --延时时间  节流默认0.5秒,接近双击事件的一个时间值  防抖默认0.6秒
*/

export let  limitFrequency = (fn,type='throttle',waitTime=type=='throttle'?500:600) =>{
  let debounceTimeId:any = null,
  throttleTimeId:any=null;
  const TYPES = {//装饰类型
      debounce(fn,arg,_that){//防抖
          debounceTimeId&&clearTimeout(debounceTimeId);
          debounceTimeId = setTimeout(()=>{
              clearTimeout(debounceTimeId);
              debounceTimeId = null;
              fn.apply(_that,arg)
          },waitTime)
      },
      throttle(fn,arg,_that){//节流
          if(!throttleTimeId){
              fn.apply(_that,arg);
              throttleTimeId = setTimeout(()=>{
                  clearTimeout(throttleTimeId);
                  throttleTimeId = null;
              },waitTime)
          }
      },
  } 
  if(!(type in TYPES)){
      console.error(`类型${type}错误,请传入正确的绑定类型`)
      return  fn
  }
  
  try{
      fn.prototype.before = function(beforeFn){
          let _self = this;
          return function(){
              beforeFn(_self.constructor,arguments,this)
          }
      }
      return fn.prototype.before(TYPES[type])
  }catch(err){
      console.log(err)
      console.error(type+"装饰器绑定失败")
      return  fn
  }
  
}

