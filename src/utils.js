// 验证登录信息
export function checkLogin (i, s, v, domain) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: "http://172.17.19.40:9090/mock/21/api/index.php?r=Api/login",
      data: `i=${i}&s=${s}&v=${v}&domain=${domain}`,
      success: function(data){
        resolve(data)
      }
    })
  })
}

// 验证审核信息
export function getMyIdentity () {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: "http://172.17.19.40:9090/mock/21/api/index.php?r=Api/myIdentity",
      success: function(data){
        resolve(data)
      }
    })
  })
}