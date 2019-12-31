// import "../style/reset.scss"
import "../style/user.scss";
import { getMyIdentity, getMyworks } from '../utils/api.js';
import { headSwitch, getLoginState } from '../utils/common';

function renderMywork(data, el) {
  if (!data) return
  var { myWorks = [] } = data
  myWorks = myWorks.filter(v => {
    return v.uploadType === "1"
  })
  let workItem = ``
  for (var item of myWorks) {
    var { commitTime, uploadType, uploadName, status, auditReason } = item || {}
    var statueMap = {
      0: '待审核',
      1: '通过审核',
      2: '不通过审核',
      3: '已上架',
      4: '已下架'
    }
    var uploadTypeMap = {
      1: '浏览器皮肤',
      2: '浏览器插件',
      3: '输入法表情',
      4: '输入法皮肤',
      5: '软件'
    }
    workItem += `
      <tr>
        <td>${commitTime}</td>
        <td>${uploadTypeMap[uploadType]}</td>
        <td>${uploadName}</td>
        <td ${status === "2" ? "class='red'" : ""}>${statueMap[status] + ((status === "2" && auditReason) ? ' ' + auditReason : '')}</td>
      </tr>
    `
  }
  workItem = workItem === '' ? '<td colspan="5">暂无作品~</td>' : workItem
  el.append(workItem)
}




function renderMyIdentity(data, el) {
  if (!data) return
  const { identity = {} } = data
  const { commitTime, userType, auditStatus, auditReason } = identity
  if(auditStatus === '1'){
    $('.upload-info .title span').hide()
  }else{
    console.log($('.upload-list .title span'))
    $('.upload-list .title span').hide()
  }
  if (JSON.stringify(identity) === '{}') {
    el.append('<td colspan="5">还未提交审核~</td>')
    return
  }
  const statusText = auditStatus === '0' ? '待审核' : auditStatus === '1' ? '通过审核' : '审核未通过';
  let identityStr = `
    <tr>
      <td>${commitTime}</td>
      <td>${userType === '1' ? '个人用户' : '企业用户'}</td>
      <td ${auditStatus === '2' ? "class='red'" : ""}>${statusText + ((auditStatus === "2" && auditReason) ? auditReason : '')}</td>
    </tr>
  `
  identityStr = identityStr === '' ? '<td colspan="5">还未提交审核~</td>' : identityStr
  el.append($(identityStr))
}


function init() {
  headSwitch()
  getLoginState(window.location.hostname)
  getMyworks(1, 1, window.location.hostname).then((res) => {
    renderMywork(res, $('.myworks'))
  })
  getMyIdentity(window.location.hostname).then((res) => {
    renderMyIdentity(res, $('.myidentity'))
  })
}

init()

