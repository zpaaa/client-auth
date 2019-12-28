// import "../style/reset.scss"
import "../style/user.scss";
import { getMyIdentity, checkLogin, getMyworks } from '../utils/api.js';
import { headSwitch, getLoginState } from '../utils/common';
headSwitch()


function renderMywork(data, el) {
  if (!data) return
  var { myWorks = [] } = data
  myWorks = myWorks.filter(v => {
    return v.uploadType === "1"
  })
  let workItem = ``
  for (var item of myWorks) {
    var { commitTime, uploadType, uploadName, status, auditReason } = item || {}
    workItem += `
      <tr>
        <td>${commitTime}</td>
        <td>浏览器皮肤</td>
        <td>${uploadName}</td>
        <td ${status === 2 ? "class='red'" : ""}>${status + auditReason ? auditReason : ''}</td>
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
  const statusText = auditStatus === '0' ? '待审核' : auditStatus === '1' ? '通过审核' : '审核未通过';
  let identityStr = `
    <tr>
      <td>${commitTime}</td>
      <td>${userType === '1' ? '个人用户' : '企业用户'}</td>
      <td ${auditStatus === 2 ? "class='red'" : ""}>${ statusText+ auditReason ? auditReason : ''}</td>
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
  const domain = window.location.hostname
  checkLogin(domain).then(res => {
    $('.user-info .login-btn').hide().siblings().show()
    $('.user-info .log-info').find('.username').text(res.userName)
  }).catch(() => {
    $('.user-info .login-btn').show().siblings().hide()
  })

  getMyworks(1, 1, window.location.hostname).then((res) => {
    renderMywork(res, $('.myworks'))
  })
  getMyIdentity(window.location.hostname).then((res) => {
    renderMyIdentity(res, $('.myidentity'))
  })
}

init()

