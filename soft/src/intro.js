import '../style/intro.scss'
import { checkLogin, getMyIdentity } from '../utils/api';




checkLogin(location.hostname).then(function (res) {
  var code = res.response.code
  var userName = res.userName;
  if (code === 2000) {
    islogin = true
    var str = ` <span class="name"><a href="./user.html">${userName}</a></span>|
    <span>退出</span>`
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

