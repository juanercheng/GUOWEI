const api = {
  user: {
    login: 'p/login',
    getMobileCode: 'p/getMobileCode',
    register: 'p/register',
    pwdForget: 'p/pwdForget',
    pwdUpdate:'p/pwdUpdate',
    userInfo:'p/user/info',
    updateInfo:'p/user/updateInfo',
    getAuthentication:'p/user/getAuthentication',
    authentication:'p/user/authentication',
    saveNews:'p/busnews/saveNews',
    authorNews:'p/busnews/author/info/',
    getMyNews:'p/user/getMyNews',
    checkSmsCode:'p/checkSmsCode',
},
  fileUpload:'fileUpload',
  home:{
    homeAdvertisement:'p/busadvertisement/homeAdvertisement',  //首页广告接口
    homeUrl:'p/home'
  },
  news:{
    newsAdvertisement:'p/busadvertisement/newsAdvertisement',
    fastNewsAdvertisement:'p/busadvertisement/fastNewsAdvertisement',
    newInfoAdvertisement:'p/busadvertisement/newInfoAdvertisement',
    list:'p/busnews/list',
    getNewsBanner:'p/busadvertisement/getNewsBanner',
    newsId:'p/busnews/info/',
    getHotNews:'p/busnews/getHotNews',
  },
  express:{
    busfastnews:'p/busfastnews/list',
    weibo:'/weibo/homeTimeline',
    author:'p/busnews/author/info/',
    getAuthorCol:'p/busnews/getAuthorCol',
    updateLookTimes:'p/busadvertisement/updateLookTimes',
    newsColumnAdvertisement:'p/busadvertisement/newsColumnAdvertisement',
    getNewsColumnBanner:'p/busadvertisement/getNewsColumnBanner'
  },
  cfg:{
    dictInfo:'cfg/dictInfo',
    clause:'cfg/clause',
    strategicCooperation:'p/busadvertisement/strategicCooperation',
    cooperationContent:'p/busadvertisement/cooperationContent',
  },
  about:{
    aboutUrl:'cfg/clause',
  },
  searchList:{
    searchUrl:'p/busnews/searchNews'
  },
  integral:{
    list:'p/currency/list',
    getExchangeRecordList:'p/currency/getExchangeRecordList',
    exchangeRecord:'p/currency/exchangeRecord'
  },
  testUrl:'serivecfg/serviceContentList',
};
export default
{
  api
}
