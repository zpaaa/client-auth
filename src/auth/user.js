// import "../style/reset.scss"
import "./user.scss"
import { getMyIdentity } from '../utils'
console.log('auth')

function getMyworks (project, type) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: "http://172.17.19.40:9090/mock/21/api/index.php?r=Api/myWorks",
      data: `projectID=${project}&type=${type}`,
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

function init() {
  getMyworks(1,1).then((res) => {
    renderMywork(res, $('.myworks'))
  })
  getMyIdentity().then((res) => {
    renderMyIdentity(res, $('.myidentity'))
  })
}

init()

