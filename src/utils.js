// 验证登录信息
export function checkLogin (i, s, v) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: "http://172.17.19.40:9090/mock/21/api/index.php?r=Api/login",
      data: `i=${i}&s=${s}&v=${v}`,
      success: function(data){
        console.log(data)
        resolve(data)
      }
   });
  })
}
checkLogin(1,2,3)

// 验证审核信息
export function getMyIdentity () {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: "http://172.17.19.40:9090/mock/21/api/index.php?r=Api/myIdentity",
      success: function(data){
        resolve(data)
      }
   });
  })
}