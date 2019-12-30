import '../style/index.scss';

import { checkLogin, getMyIdentity } from '../utils/api';


; (function () {

  var islogin = false
  checkLogin(location.hostname).then(function (res) {
    var code = res.response.code
    var userName = res.userName;
    if (code === 2000) {
      islogin = true
      var str = ` <span class="name"><a href="./user.html">${userName}</a></span>|
      <span><a href="//passport.2345.com/login?action=logout&forward=${location.href}">退出</a></span>`
    } else {
      var str = `<span class="login">
                    <a href="//passport.2345.com/login?forward=${location.href}">
                      账号登录
                    </a>
                  </span>`
    }
    $('#userInfo').html(str)
  }).catch(function () {
    var str = `<span class="login">
                    <a href="//passport.2345.com/login?forward=${location.href}">
                      账号登录
                    </a>
                  </span>`
    $('#userInfo').html(str)
  })

  /* 如果登录判断是否有权限 */
  $('#but-a').on('click', function () {
    if (islogin) {
      /* 如果登录成功的话获取当前的审核状态 */
      getMyIdentity(location.hostname).then(res => {
        console.log(res,"获取资质的接口")
        if (res.response.code === 4005) { //资质未上传
          location.href = './upload.html'
        } else if (res.response.code === 2000) {
          var auditStatus = res.identity.auditStatus
          if (auditStatus === '1') {  //审核通过
            location.href = './upload-exe.html'
          } else if (auditStatus === '0' || auditStatus === '2') {  //待审核
            location.href = './user.html'
          }
        }
      })
    } else {
      location.href = `//passport.2345.com/login?forward=${location.href}`
    }
  })

}());




