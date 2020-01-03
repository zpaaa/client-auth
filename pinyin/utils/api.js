
export function uploadWorks(data) {
  var formData = new FormData()
  var cookie = {
    domain: location.hostname,
    projectId:2,
  }

  $.each(data, function (key, value) {
    if(!value){
      delete data[key]
    }
  })
  Object.assign(data, cookie)
  $.each(data, function (key, value) {
    if (Array.isArray(value)) {
      $.each(value, function (index, value) {
        formData.append(key+`[${index}]`, value)
      })
    } else {
      formData.append(key, value)
    }
  })
  // console.log(window.a = formData,'上传的formData')
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: "//ie.kehuduan.2345.com/api/index.php?r=Api/uploadWorks",
      data:formData,
      processData: false,
      contentType: false,
      dataType: 'json',
      //  默认情况下，标准的跨域请求是不会发送cookie的
      xhrFields: {
        withCredentials: true
      },
      success: function (data) {
        resolve(data)
      },
      error: function (err) {
        // console.log(err)
        reject(err)
      }
    })
  })
}


// 验证登录信息
export function checkLogin(domain) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: "//ie.kehuduan.2345.com/index.php?r=Api/login",
      data: {
        domain: location.hostname
      },
      dataType: 'json',
      //  默认情况下，标准的跨域请求是不会发送cookie的
      xhrFields: {
        withCredentials: true
      },
      success: function (data) {
        resolve(data)
      },
      error: function (err) {
        // console.log(err)
        reject(err)
      }
    })
  })
}

// 验证审核信息
export function getMyIdentity() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: "//ie.kehuduan.2345.com/index.php?r=Api/myIdentity",
      data: {
        domain: location.hostname
      },
      xhrFields: {
        withCredentials: true
      },
      dataType: 'json',
      success: function (data) {
        resolve(data)
      }
    })
  })
}


/* 上传审核信息 */
export function uploadIdentity(data) {
  var formData = new FormData()
  var cookie = {
    domain: location.hostname
  }
  Object.assign(data, cookie)
  $.each(data, function (key, value) {
    if (key === 'companyPictureList') {
      $.each(value, function (index, value) {
        formData.append('companyPictureList', value)
      })
    } else {
      formData.append(key, value)
    }
  })
  // console.log(window.aaa = formData, 'window.aaaa')
  return new Promise((reslove, reject) => {
    $.ajax({
      url: '//ie.kehuduan.2345.com/api/index.php?r=Api/uploadIdentity',
      data: formData,
      processData: false,
      dataType: "json",
      contentType: false,
      type: "POST",
      xhrFields: { withCredentials: true },
      success: function (res) {
        // console.log(res, 'api文件中')
        return reslove(res)
      },
      error: function (err) {
        reject(err)
      }
    })
  })
}

/*  */
export function getMyworks(project, type) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: "//ie.kehuduan.2345.com/index.php?r=Api/myWorks",
      data: {
        projectId: project,
        type: type,
        domain: location.hostname
      },
      dataType: 'json',
      xhrFields: { withCredentials: true },
      success: function (data) {
        // // console.log(data)
        resolve(data)
      }
    });
  })
}
















