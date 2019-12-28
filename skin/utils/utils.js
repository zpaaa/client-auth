// 验证登录信息
export function checkLogin(domain) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: "//ie.kehuduan.2345.com/index.php?r=Api/login",
      data: {
        domain
      },
      dataType: 'json',
      //  默认情况下，标准的跨域请求是不会发送cookie的
　　　 xhrFields: {
　　　　　withCredentials: true
　　　 },
      success: function (data) {
        if (data && data.response.code === 2000) {
          resolve(data)
        } else {
          reject('fail')
        }
      },
      error: function (err) {
        console.log(err)
        reject('fail')
      }
    })
  })
}

// 验证审核信息
export function getMyIdentity(domain) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: "//ie.kehuduan.2345.com/index.php?r=Api/myIdentity",
      data: {
        domain
      },
      dataType: 'json',
      success: function (data) {
        resolve(data)
      }
    })
  })
}

function getCookie(name) {
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
  return unescape(arr[2]);
  else
  return null;
}

export var vrertifyRules = {
  isNonEmpty: function (value, errorMsg) {
    return value === '' ?
      errorMsg : void 0
  },
  minLength: function (value, length, errorMsg) {
    return value && value.length < length ?
      errorMsg : void 0
  },
  maxLength: function (value, length, errorMsg) {
    return value.length > length ?
      errorMsg : void 0
  },
  rightLength: function (value, length, errorMsg) {
    return value.length != length ?
      errorMsg : void 0
  },
  isMoblie: function (value, errorMsg) {
    return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ?
      errorMsg : void 0
  },
  isEmail: function (value, errorMsg) {
    return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?
      errorMsg : void 0
  },
  allEmpty: function (value, errorMsg) {
    for (var i = 0; i < value.length; i++) {
      if (value[i]) {
        return void 0
      }
    }
    return errorMsg
  },
  fileSize: function (value, size, errorMsg) {

    value = value || [];
    Object.prototype.toString.call(value) !== "[object Array]"?value = [value]:void 0
    value = [value]
    var totalSize = 0;
    for (var i = 0; i < value.length; i++) {
      totalSize += value[i].size
    }
    return totalSize > size * 1024 ? errorMsg : void 0
  },
  fileType: function (value, type, errorMsg) {
    console.log(value, type, errorMsg)
    var type = eval(type)
    value = value || [];
    Object.prototype.toString.call(value) !== "[object Array]"?value = [value]:void 0
    // 
    for (var i = 0; i < value.length; i++) {
      console.log(value[i])
      var selfType = value[i].type.split('/')[1]
      if (type.indexOf(selfType) === -1) {
        return errorMsg
      }
    }
    return void 0
  }
}

export class Validator {
  constructor() {
    this.cache = {}
  }
  add(key, value, rules) {
    this.cache[key] || (this.cache[key] = [])
    for (let rule of rules) {
      let verifyArr = rule.verify.split(':')
      let errMsg = rule.errMsg
      this.cache[key].push(() => {
        let verify = verifyArr.shift()
        verifyArr.unshift(value)
        verifyArr.push(errMsg)
        return vrertifyRules[verify].apply(key, verifyArr)
      })
    }
    return this
  }
  keyValidator(key) {
    var verifyFnArr = this.cache[key] || []
    for (var i = 0; i < verifyFnArr.length; i++) {
      let err = verifyFnArr[i]()
      if (err) {
        return err
      }
    }
  }
  start() {
    var errMsg = {}
    for (let key in this.cache) {
      var verifyFnArr = this.cache[key]
      for (var i = 0; i < verifyFnArr.length; i++) {
        let err = verifyFnArr[i]()
        if (err) {
          errMsg[key] = err
          break;
        }
      }
    }
    return errMsg
  }
}