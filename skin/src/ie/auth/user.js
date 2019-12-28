// import "../style/reset.scss"
import "./user.scss"
import { getMyIdentity, checkLogin } from '../../utils'
import { headSwitch, getLoginState } from '../common'
headSwitch()
getLoginState(window.location.host)
function getMyworks (project, type, domain) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: "//ie.kehuduan.2345.com/index.php?r=Api/myWorks",
      data: {
        projectId: project,
        type: type,
        domain
      },
      dataType: 'json',
      success: function(data){
        // console.log(data)
        resolve(data)
      }
   });
  })
}


function renderMywork (data, el) {
  if(!data) return
  const { myWorks } = data
  let workItem = ``
  for (const item of myWorks) {
    const { commitTime, uploadType, uploadName, status, auditReason } = item
    workItem += `
      <tr>
        <td>${commitTime}</td>
        <td>${uploadType}</td>
        <td>${uploadName}.6</td>
        <td>${status + auditReason ? auditReason: ''}</td>
      </tr>
    `
  }
  el.append(workItem)
}


function renderMyIdentity (data, el) {
  if(!data) return
  const { identity } = data
  const { commitTime, userType, auditStatus, auditReason } = identity
  let identityStr = `
    <tr>
      <td>${commitTime}</td>
      <td>${userType}</td>
      <td>${auditStatus + auditReason ? auditReason: ''}</td>
    </tr>
  `
  el.append($(identityStr))
}

function initEvent () {
  $('.user-info .login-btn').on('click', function() {
    window.location.href= "http://passport.2345.com/login?forward=" + window.location.href
  })
}

function init() {
  initEvent()
  const domain= window.location.origin
  checkLogin(domain).then(res => {
    $('.user-info .login-info').find('.username').text(res.response.username)
    $('.user-info .login-btn').hide().siblings().show()
  }).catch(() => {
    $('.user-info .login-btn').show().siblings().hide()
  })

  getMyworks(1,1, window.location.host).then((res) => {
    renderMywork(res, $('.myworks'))
  })
  getMyIdentity(window.location.host).then((res) => {
    renderMyIdentity(res, $('.myidentity'))
  })
}

init()