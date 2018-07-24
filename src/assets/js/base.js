import CryptoJS from 'crypto-js'
function getUrlPath() {
  return window.location.protocol + '//' + window.location.host + '/' ;
}
// const domain=getUrlPath()+'guower/api/';
//
// const domain = 'http://192.168.0.107:8981/guower/api/';
const domain = 'http://chijun.xin/guower/api/';

exports.install = function (Vue, options) {
  Vue.prototype.formatDate = function (date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      let str = o[k] + ''
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
    }
    return fmt
  };
  function padLeftZero (str) {
    return ('00' + str).substr(str.length)
  }
  //文章跳转详情：
  Vue.prototype.goDetails=function(id) {
    this.$router.push({
      path: './newsDetails',
      query:{id:id}
    })
  },
  Vue.prototype.columnSpecial =function(id) {
    this.$router.push({
      path: './columnSpecial',
      query:{id:id}
    })
  },
  //广告/banner跳转：
  Vue.prototype.goNewUrl=function(jumpType,jumpUrl,id) {
    console.log('jumpUrl',jumpUrl,jumpType)
    if(jumpType===1){
      window.open(jumpUrl, '_blank')
    }else if(jumpType===2){

    }else if(jumpType===3){

    }else {
      this.$router.push({
        path: './newsDetails',
        query:{id:id}
      })
    }
  },
  //跳转标签页
  Vue.prototype.goLabel=function(type,mine) {
    if(mine){
      this.$router.push({
        path: '../labelList',
        query:{type:type}
      })
    }else {
      this.$router.push({
        path: './labelList',
        query:{type:type}
      })
    }
  },
  Vue.prototype.format=function(time) {
    time = time.replace(/-/g, '/');
    var str = new Date(time);
    str.setDate(str.getDate());
    var month = (parseInt(str.getMonth()) + 1)>10?(parseInt(str.getMonth()) + 1):'0'+(parseInt(str.getMonth()) + 1)
    var date = str.getDate() < 10 ? '0' + str.getDate(): str.getDate()
    var hour = str.getHours() < 10 ? "0" + str.getHours() : str.getHours();
    var minute = str.getMinutes() < 10 ? "0" + str.getMinutes() : str.getMinutes();
    str =  month + '-'
      + date + ' ' + hour+':'+minute;
    return str
  }
  Vue.prototype.postData = function (url, params, callback) {
    if (params) {
      let paramsArray = []
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    Vue.http.post(domain+url).then(function (res) {
      callback(res.body)
    }, function (res) {
      console.log(res)
    })
  };

  Vue.prototype.getData = function (url, params, callback) {
    if (params) {
      let paramsArray = []
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    Vue.http.get(domain+url).then(function (res) {
      callback(res.body)
    }, function (res) {
      console.log(res)
    })
  };
  Vue.prototype.PostJson = function (url, params, callback) {
    Vue.http.post(domain+url+'?token='+sessionStorage.getItem('token'),params).then(function (res) {
      callback(res.body)
    }, function (res) {
      console.log(res)
    })
  };
  Vue.prototype.GetJson = function (url, params, callback) {
    Vue.http.get(domain+url+params).then(function (res) {
      callback(res.body)
    }, function (res) {
      console.log(res)
    })
  };

  // 加密
  Vue.prototype.encryptByDES = function (message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },
  //去标签和&nbsp
  Vue.prototype.delHtmlTag=function(val) {
    val = val.replace(/<[^>]+>/g,"")
    return val=val.replace(/&nbsp;/ig, "");
  }
}
