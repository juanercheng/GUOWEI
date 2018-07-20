const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
const h = window.innerWidth || document.documentElement.clientWidth || document.body.clientHeight
function getUrlPath() {
  return window.location.protocol + '//' + window.location.host + '/' ;
}
// const domain=getUrlPath()+'guower/api/';
// const imgPath = getUrlPath()+'guower/'

// const domain = 'http://192.168.0.110:8981/guower/api/';
// const imgPath = 'http://192.168.0.110:8981/guower/';
const domain = 'http://chijun.xin/guower/api/'
const imgPath = 'http://chijun.xin/guower'

export default
{
  w,
  h,
  domain,
  imgPath
}
