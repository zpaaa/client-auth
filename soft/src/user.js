import '../style/user.scss';
import { getMyIdentity, checkLogin, getMyworks } from '../utils/api';
console.log('auth');


function renderMywork(data, el) {
  if (!data) return
  var { myWorks = [] } = data
  let workItem = ``
  for (var item of myWorks) {
    var { commitTime, uploadType, uploadName, status, auditReason } = item || {}
    workItem += `
      <tr>
        <td>${commitTime}</td>
        <td>${uploadType}</td>
        <td>${uploadName}.6</td>
        <td>${status + auditReason ? auditReason : ''}</td>
      </tr>
    `
  }
  workItem = workItem === '' ? '<td colspan="5">暂无作品~</td>' : workItem
  el.append(workItem)
}


function renderMyIdentity(data, el) {
  if (!data) return
  const { identity = {} } = data
  if (JSON.stringify(identity) === '{}') {

    el.append('<td colspan="5">还未提交审核~</td>')
    return
  }
  const { commitTime, userType, auditStatus, auditReason } = identity
  let identityStr = `
    <tr>
      <td>${commitTime}</td>
      <td>${userType}</td>
      <td>${auditStatus + auditReason ? auditReason : ''}</td>
    </tr>
  `
  identityStr = identityStr === '' ? '<td colspan="5">还未提交审核~</td>' : identityStr
  el.append($(identityStr))
}

function initEvent() {
  $('.user-info .login-btn').on('click', function () {
    window.location.href = "http://passport.2345.com/login?forward=" + window.location.href
  })
}

function init() {
  initEvent()
  checkLogin().then(res => {
    var code = res.response.code
    var userName = res.userName;
    if (code === 2000) {
      var str = ` <span class="name"><a href="./user.html">${userName}</a></span>|
      <span>退出</span>`
    } else {
      var str = `<span class="login">
                    <a href="//passport.2345.com/login?forward=${location.href}">
                      账号登录
                    </a>
                  </span>`
    }
    console.log(str)
    $('#userInfo').html(str)
  }).catch(() => {
    var str = `<span class="login">
        <a href="//passport.2345.com/login?forward=${location.href}">
          账号登录
        </a>
      </span>`
    $('#userInfo').html(str)
  })


  // projectId: project,项目id（1浏览器，2输入法，3软件管家）
  // type: type,类型（1浏览器皮肤，2浏览器插件，3输入法表情，4输入法皮肤，5软件）
  getMyworks(3).then((res) => {
    renderMywork(res, $('.myworks'))
  })
  getMyIdentity(window.location.host).then((res) => {
    renderMyIdentity(res, $('.myidentity'))
  })
}

init();