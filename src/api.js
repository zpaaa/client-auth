

export function uploadIdentity(data) {
  var formData = new FormData()
  var cookie = {
    domain:location.host
  }
  Object.assign(data, cookie)
  $.each(data, function (key, value) {
    if(key==='companyPictureList'){
      $.each(value,function(index,value){
        formData.append('companyPictureList',value)
      })
    }else{
      formData.append(key, value)
    }
  })
  // console.log(window.aaa =formData,'window.aaaa' )
  return new Promise((reslove, reject) => {
    $.ajax({
      url: '//ie.kehuduan.2345.com/api/index.php?r=Api/uploadIdentity',
      data: formData,
      processData: false,
      dataType: "json",
      contentType : false,
      type: "POST",
      xhrFields: { withCredentials: true },
      success: function (res) {
        // console.log(res,'api文件中')
        return reslove(res)
      },
      error: function (err) {
        reject(err)
      }
    })
  })
}

















