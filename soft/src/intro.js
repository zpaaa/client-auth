import '../style/intro.scss'
import { checkLogin, getMyIdentity } from '../utils/api';




checkLogin(location.hostname).then(function (res) {
  var code = res.response.code
  var userName = res.userName;
  if (code === 2000) {
    islogin = true
    var str = ` <span class="name"><a href="./user.html">${userName}</a></span>|
    <span><a href="//passport.2345.com/login?action=logout&forward=${location.origin + location.pathname}">退出</a></span>`
  } else {
    var str = `<span class="login">
                  <a href="//passport.2345.com/login?forward=${location.origin + location.pathname}">
                    账号登录
                  </a>
                </span>`
  }
  $('#userInfo').html(str)
}).catch(function () {
  var str = `<span class="login">
                  <a href="//passport.2345.com/login?forward=${location.origin + location.pathname}">
                    账号登录
                  </a>
                </span>`
  $('#userInfo').html(str)
})


$('#instor-box .tab').on('click','a',function(e){
  // console.log($(this).attr('attr-index'))
  var index = $(this).attr('attr-index')
  $('.contain-box').css({display:'none'})
  $($('.contain-box')[index]).css({display:'block'})

})


