/**
 * Created by qiandalin on 2017/12/28.
 */
let dev="develop";

const globalUrl = () => {

  if("product" === dev){
    return  '/web/api'
  }else if('test' === dev){
    return  '/web/api'
  }else{ //develop
    return  'http://192.168.1.111:1080/web/api'
  }

};

const pageUrl = () => {

  if("product" === dev){
    return  'http://192.168.1.81:8113'
  }else if('test' === dev){
    return  ''
  }else{ //develop
    return  'http://192.168.1.111:1080'
  }

};

export {
  globalUrl,
  pageUrl
}