
import '../style/upload.scss'
import { Validator } from '../utils/utils';
import { uploadIdentity, checkLogin } from '../utils/api'
import { Dialog } from '../utils/dialog';
import { Agree } from '../utils/agree';
import { Message } from '../utils/message';
(function () {
  var message = new Message()
  /* 页面初始化获取当前用户的信息 */
  checkLogin(location.hostname).then(function (res) {
    var code = res.response.code
    var userName = res.userName;
    if (code === 2000) {
      var str = ` <span class="name"><a href="./user.html">${userName}</a></span>|
      <span><a href="//passport.2345.com/login?action=logout&forward=${location.href}">退出</a></span>`
    } else {
      var str = `<span class="login">
                    <a href="//passport.2345.com/login?forward=${location.href}">
                      账号登录
                    </a>
                  </span>`
    }
    $('#userInfo').html(str)
  }).catch(function (err) {

  })




  var fileList = []
  function conpanyVali() {
    var conpanyValidator = new Validator()
    var data = company.getData()
    conpanyValidator
      .add('companyName', data.companyName, [
        { verify: 'isNonEmpty', errMsg: '公司名称不能为空' },
        { verify: 'maxLength:50', errMsg: '长度不能超过50' }
      ])
      .add('companyContactPerson', data.companyContactPerson, [
        { verify: 'isNonEmpty', errMsg: '名称不能为空' },
        { verify: 'maxLength:10', errMsg: '长度不能超过10' },
      ])
      .add('phone', data.phone, [
        { verify: 'isNonEmpty', errMsg: '不能为空' },
      ])
      .add('companyPictureList', data.companyPictureList, [
        { verify: 'minLength:1', errMsg: '请选择公司资质照片' }
      ])
      .add('companyIntroduction', data.companyIntroduction, [
        { verify: 'isNonEmpty', errMsg: '请填写公司介绍' },
        { verify: 'maxLength:300', errMsg: '公司介绍不能超过300字' },
      ])
    return conpanyValidator
  }

  var company = {
    initEvent: function () {
      /* 切换用户单选框 */
      $('#userType').on('click', 'label', function (e) {
        if ($(e.target).is("input")) {
          return
        }
        // console.log('切换userType')
        $(this).find('.radio').addClass('is-checked')
        $(this).siblings().find('.is-checked').removeClass('is-checked')
        var userType = $('#userType .is-checked input').val()
        // console.log(userType)
        if (userType === '1') {
          $('#person').css({ display: 'block' })
          $('#company').css({ display: 'none' })
        } else {
          $('#person').css({ display: 'none' })
          $('#company').css({ display: 'block' })
        }
      })
      /* 统一的勾选统一按钮 */
      $('#agree').on('click', '.checkbox-input', function (e) {
        if ($(e.target).is("input")) {
          return
        }
        var oCheckbox = $(this).parent('.checkbox')
        oCheckbox.hasClass('is-checked') ? oCheckbox.removeClass('is-checked') : oCheckbox.addClass('is-checked'); $('#agree .error-msg').html('')
      })
      /* 点击上传文件 */
      $('#companyPictureList').on('click', '[type="button"]', function () {
        // console.log('上传文件')
        $('#companyPictureList [type="file"]').click()
      })
      /* 多次选择图片 */
      $('#companyPictureList').on('click', '[ type="file"]', function () {
        fileList.concat(Array.prototype.slice.call($('#companyPictureList [type="file"]')[0].files))
      })
      /* 点击图片的删除 */
      $('#uploadList').on('click', 'i', function () {
        var index = $(this).attr('data-index')
        fileList.splice(index, 1)
        /* 不管删除的谁  都清空input的value */
        $('#companyPictureList [type="file"]')[0].value = ''
        company.renderFilelist()
      })

    },
    initChangeEvent: function () {
      $('#companyPictureList [type="file"]').on('change', function () {
        fileList = fileList.concat(Array.prototype.slice.call($(this)[0].files))
        company.renderFilelist()
      })
      onchangeValidator($('#companyName input'), 'companyName', 'company')
      onchangeValidator($('#companyContactPerson input'), 'companyContactPerson', 'company')
      onchangeValidator($('#companyPersonalPhone input'), 'companyPersonalPhone', 'company')
      onchangeValidator($('#companyPictureList input'), 'companyPictureList', 'company')
    },
    renderFilelist: function () {
      var str = '';
      $.each(fileList, function (index, item) {
        str += `<span class="file-box" >
                  <span class="file-name" title="${item.name}" >${item.name.split('.')[0]}</span><b>.${item.name.split('.')[1]}</b>
                  <i data-index="${index}"></i>
                </span>`
      })
      $('#uploadList')[0].innerHTML = str
    },
    getData: function () {
      var data = {}
      // var fileList = []
      data.userType = $('#userType .is-checked input').val()
      data.companyName = $('#companyName input').val()
      data.companyContactPerson = $('#companyContactPerson input').val()
      data.companyPersonalPhone = $('#companyPersonalPhone input').val()
      data.email = $('#email input').val()
      data.phone = $('#phone input').val()
      data.companyIntroduction = $('#companyIntroduction textarea').val()
      data.companyPictureList = fileList
      return data
    }
  }
  /* 公司  */
  company.initEvent()
  company.initChangeEvent()






  function personVali() {
    var conpanyValidator = new Validator()
    var data = person.getData()
    conpanyValidator
      .add('realName', data.realName, [
        { verify: 'isNonEmpty', errMsg: '名称不能为空' },
        { verify: 'maxLength:50', errMsg: '长度不能超过50' }
      ])
      .add('idNumber', data.idNumber, [
        { verify: 'isNonEmpty', errMsg: '名称不能为空' },
        { verify: 'rightLength:18', errMsg: '身份证必须为18位' },
      ])
      .add('idCardHandHeld', data.idCardHandHeld, [
        { verify: 'minLength:1', errMsg: '必须上传手持身份证照片' },
      ])
      .add('idCardFront', data.idCardFront, [
        { verify: 'minLength:1', errMsg: '必须上传身份证正面' }
      ])
      .add('idCardBack', data.idCardBack, [
        { verify: 'minLength:1', errMsg: '必须上传身份证反面' }
      ]).add('phone',data.phone,[
        { verify: 'isNonEmpty', errMsg: '手机号不能为空' },
        { verify: 'rightLength:11', errMsg: '手机号必须为11位' }
      ])
    return conpanyValidator
  }




  var idCardHandHeldList = []
  var idCardFrontList = []
  var idCardBackUploadList = []
  /* 个人 */
  var person = {
    initEvent: function () {
      $('#idCardHandHeld [type="button"]').on('click', function () {
        // console.log('上传身份证信息')
        $('#idCardHandHeld [type="file"]').click()
      })
      $('#idCardFront [type="button"]').on('click', function () {
        $('#idCardFront [type="file"]').click()
      })
      $('#idCardBack [type="button"]').on('click', function () {
        $('#idCardBack [type="file"]').click()
      })
      /* 点击图片的删除 */
      $('#idCardHandHeldUploadList').on('click', 'i', function () {
        var index = $(this).attr('data-index')
        idCardHandHeldList.splice(index, 1)
        person.render(idCardHandHeldList, 'idCardHandHeldUploadList')
      })
      $('#idCardFrontUploadList').on('click', 'i', function () {
        var index = $(this).attr('data-index')
        idCardFrontList.splice(index, 1)
        person.render(idCardFrontList, 'idCardFrontUploadList')
      })
      $('#idCardBackUpload').on('click', 'i', function () {
        var index = $(this).attr('data-index')
        idCardBackUploadList.splice(index, 1)
        person.render(idCardBackUploadList, 'idCardBackUpload')
      })
    },
    inintChangeEvent: function () {
      $('#idCardHandHeld [type="file"]').on('change', function () {
        idCardHandHeldList = Array.prototype.slice.call($(this)[0].files)
        person.render(idCardHandHeldList, 'idCardHandHeldUploadList')
      })
      $('#idCardFront [type="file"]').on('change', function () {
        idCardFrontList = Array.prototype.slice.call($(this)[0].files)
        person.render(idCardFrontList, 'idCardFrontUploadList')
      })
      $('#idCardBack [type="file"]').on('change', function () {
        idCardBackUploadList = Array.prototype.slice.call($(this)[0].files)
        person.render(idCardBackUploadList, 'idCardBackUpload')
      })
      onchangeValidator($('#realName input'), 'realName', 'person')
      onchangeValidator($('#idNumber input'), 'idNumber', 'person')
      onchangeValidator($('#idCardHandHeld input'), 'idCardHandHeld', 'person')
      onchangeValidator($('#idCardFront input'), 'idCardFront', 'person')
      onchangeValidator($('#idCardBack input'), 'idCardBack', 'person')
    },
    render: function (data, id) {
      var str = ''
      $.each(data, function (index, item) {
        str += `<span class="file-box" >
                  <span class="file-name" title="${item.name}" >${item.name.split('.')[0]}</span><b>.${item.name.split('.')[1]}</b>
                  <i data-index="${index}"></i>
                </span>`
      })
      $(`#${id}`).html(str)
    },
    getData: function () {
      var data = {}
      data.userType = $('#userType .is-checked input').val()
      data.realName = $('#realName input').val()
      data.idNumber = $('#idNumber input').val()
      data.idCardHandHeld = $('#idCardHandHeld input')[0].files[0]
      data.idCardFront = $('#idCardFront input')[0].files[0]
      data.idCardBack = $('#idCardBack input')[0].files[0]
      data.phone = $('#PersonPhone input').val()
      data.email = $('#personEmail input').val()
      return data
    }
  }

  function onchangeValidator(el, key, type) {
    el.on('change', function () {
      var validator = type === 'person' ? personVali() : conpanyVali()
      var msg = validator.keyValidator(key)
      if (msg) {
        $(this).parents('.form-item').addClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html(msg)
      } else {
        $(this).parents('.form-item').removeClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html('')
      }
    })
  }

  person.initEvent()
  person.inintChangeEvent()


  var dialog = new Dialog('上传资料中~')
  /* 点击上传按钮 */
  $('#submit').on('click', function () {
    $('.is-error .error-msg').html('')      // 先将上次的错误提示清除
    $('.is-error').removeClass('is-error')
    var agree = $('#agree .checkbox').hasClass('is-checked')
    if (agree) {
      const userType = $('#userType .is-checked input').val()
      var conpanyValidator;
      var errObj;
      if (userType === '1') {
        conpanyValidator = personVali()
        errObj = conpanyValidator.start()
      } else {
        conpanyValidator = conpanyVali()
        errObj = conpanyValidator.start()
      }
      // console.log(errObj)
      if (JSON.stringify(errObj) !== '{}') {
        for (var id in errObj) {
          if (id === 'phone' && userType === '1') {
            id = 'PersonPhone'
          }
          if (id === 'email' && userType === '1') {
            id = 'personEmail'
          }
          $('#' + id).addClass('is-error')
          $('#' + id + ' ' + '.error-msg').html(errObj[id])
        }
        return
      } else {
        $('.is-error .error-msg').html('')
        $('.is-error').removeClass('is-error')
      }
      var data = userType === '1' ? person.getData() : company.getData()
      dialog.show()
      uploadIdentity(data).then(function (res) {
        dialog.hide() //返回信息之后关闭弹窗
        var code = res.response.code
        var msg = res.response.msg
        switch (code) {
          case 2000:
            message.success('上传成功！')
            setTimeout(() => {
              location.href = './user.html';
            }, 2000);
            break;
          case 4002:
            message.error('登录状态无效,请重新登录~')
            setTimeout(() => {
              location.href = `//passport.2345.com/login?forward=${location.url}`
            }, 2000);
            break;
          default:
            message.error(msg);
            break;
        }

      }).catch(function (err) {
        message.error("上传失败，请稍后再试！");
        // console.log(err)
      })
    } else {
      $('#agree .error-msg').html('请先勾选2345输入法作者协议')
    }
  });

  $('#agree-btn').on('click', function () {
    new Agree()
  })
})();









