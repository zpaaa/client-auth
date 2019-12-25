

import './upload-exe.scss';
import { vrertifyRules } from '../utils';
import { Validator } from '../utils';
(function () {
  var MAX_SIZE = 1024 * 100
  var softScreenshotList = []
  var softIdentityList = []
  function initEvent() {
    $('#radioChange').on('click', 'label', function (e) {
      if ($(e.target).is("input")) {
        return
      }
      $(this).find('.radio').addClass('is-checked')
      $(this).siblings().find('.is-checked').removeClass('is-checked')
    })
    $('#file [type="button"]').on('click', function () {
      $('#file [type="file"]').click()
    })
    $('#softScreenshotList [type="button"]').on('click', function () {
      $('#softScreenshotList [type="file"]').click()
    })
    $('#softLogo [type="button"]').on('click', function () {
      $('#softLogo [type="file"]').click()
    })
    $('#softIdentityList [type="button"]').on('click', function () {
      $('#softIdentityList [type="file"]').click()
    })
    $('#softScreenshotList [type="file"]').on('change', function () {
      softScreenshotList = softScreenshotList.concat(Array.prototype.slice.call($(this)[0].files))
      render(softScreenshotList, 'softScreenshot')
    })
    $('#softIdentityList [type="file"]').on('change', function () {
      softIdentityList = softIdentityList.concat(Array.prototype.slice.call($(this)[0].files))
      render(softIdentityList, 'softIdentity')
    })
    $('#softScreenshotList').on('click', 'i', function () {
      var index = $(this).attr('data-index')
      softScreenshotList.splice(index, 1)
      /* 不管删除的谁  都清空input的value */
      $('#softScreenshotList [type="file"]')[0].value = ''
      render(softScreenshotList, 'softScreenshot')
    })
    $('#softIdentityList').on('click', 'i', function () {
      var index = $(this).attr('data-index')
      softIdentityList.splice(index, 1)
      /* 不管删除的谁  都清空input的value */
      $('#softIdentityList [type="file"]')[0].value = ''
      render(softIdentityList, 'softIdentity')
    })
    /* 统一的勾选统一按钮 */
    $('#agree').on('click', '.checkbox-input', function (e) {
      if ($(e.target).is("input")) {
        return
      }
      var oCheckbox = $(this).parent('.checkbox')
      oCheckbox.hasClass('is-checked') ? oCheckbox.removeClass('is-checked') : oCheckbox.addClass('is-checked'); $('#agree .error-msg').html('')
    })
    /* 需要监听的change事件 */
    $('#displayName input').on('change', function () {
      var validator = valida()
      var msg = validator.keyValidator('displayName')
      if (msg) {
        $(this).parents('.form-item').addClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html(msg)
      } else {
        $(this).parents('.form-item').removeClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html('')
      }
    })
    $('#softVersion input').on('change', function () {
      var validator = valida()
      var msg = validator.keyValidator('softVersion')
      if (msg) {
        $(this).parents('.form-item').addClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html(msg)
      } else {
        $(this).parents('.form-item').removeClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html('')
      }
    })
    $('#description input').on('change', function () {
      var validator = valida()
      var msg = validator.keyValidator('description')
      if (msg) {
        $(this).parents('.form-item').addClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html(msg)
      } else {
        $(this).parents('.form-item').removeClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html('')
      }
    })
    $('#softLogo input').on('change', function () {
      var validator = valida()
      var msg = validator.keyValidator('softLogo')
      if (msg) {
        $(this).parents('.form-item').addClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html(msg)
      } else {
        $(this).parents('.form-item').removeClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html('')
      }
    })
    $('#softScreenshotList input').on('change', function () {
      var validator = valida()
      var msg = validator.keyValidator('softScreenshotList')
      if (msg) {
        $(this).parents('.form-item').addClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html(msg)
      } else {
        $(this).parents('.form-item').removeClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html('')
      }
    })
    $('#softIdentityList input').on('change', function () {
      var validator = valida()
      var msg = validator.keyValidator('softIdentityList')
      if (msg) {
        $(this).parents('.form-item').addClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html(msg)
      } else {
        $(this).parents('.form-item').removeClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html('')
      }
    })
  }

  initEvent()


  function getData() {
    var data = {}
    data.displayName = $('#displayName input').val()
    data.softVersion = $('#softVersion input').val()
    data.softComment = $('#softComment input').val()
    data.downloadUrl = $('#downloadUrl input').val()
    /* 文件 file */
    data.file = $('#file [type="file"]')[0].files[0]
    data.softLanguage = $('#softLanguage .is-checked input').val()
    data.osBit = $('#osBit .is-checked input').val()
    data.osVersion = $('#osVersion .is-checked input').val()
    data.description = $('#description .textarea').val()
    data.updateLog = $('#description .textarea').val()
    data.softLogo = $('#softLogo [type="file"]')[0].files[0]

    // data.softScreenshotList = $('#softScreenshotList [type="file"]')[0].files[0]
    data.softScreenshotList = softScreenshotList
    data.softIdentityList = softIdentityList
    return data
  }
  function render(data, id) {
    var str = ''
    $.each(data, function (index, item) {
      str += `<span class="file-box" >
                <span class="file-name" title="${item.name}" >${item.name.split('.')[0]}</span><b>.${item.name.split('.')[1]}</b>
                <i data-index="${index}"></i>
              </span>`
    })
    // console.log(`#${id}`,str)
    $(`#${id}`).html(str)
  }

  function valida() {
    var validator = new Validator()
    var data = getData()
    validator
      .add('displayName', data.displayName, [
        { verify: 'isNonEmpty', errMsg: '名称不能为空' },
        { verify: 'maxLength:50', errMsg: '长度不能超过50' }
      ])
      .add('softVersion', data.softVersion, [
        { verify: 'isNonEmpty', errMsg: '版本不能为空' },
      ])
      .add('description', data.description, [
        { verify: 'isNonEmpty', errMsg: '软件介绍不能为空' },
        { verify: 'maxLength:300', errMsg: '最长不能超过300字' },
      ])
      .add('downloadUrl', [data.downloadUrl, data.file], [
        { verify: 'allEmpty', errMsg: '文件和downURL必须选择一项' },
      ])
      .add('file', [data.downloadUrl, data.file], [
        { verify: 'allEmpty', errMsg: '文件和downURL必须选择一项' },
      ])
      .add('softLogo', data.softLogo, [
        { verify: 'isNonEmpty', errMsg: '请上传软件logo' },
        { verify: 'fileSize:100', errMsg: '不能超过100M' },
      ])
      .add('softScreenshotList', data.softScreenshotList, [
        { verify: 'isNonEmpty', errMsg: '请上传软件logo' },
        { verify: 'fileSize:100', errMsg: '图片总大小不能超过100M' },
        { verify: 'maxLength:10', errMsg: '图片总数不能超过10张' },
        { verify: 'fileType:["png","jpeg","jpg"]', errMsg: '图片类型' },
      ])
    // .add('file', [data.downloadUrl, data.file], [
    //   { verify: 'allEmpty', errMsg: '文件和downURL必须选择一项' },
    // ])
    return validator
  }

  $('#submit').on('click', function () {
    var agree = $('#agree .checkbox').hasClass('is-checked')
    if (agree) {
      var validator = valida()
      var errObj = validator.start()
      console.log(errObj)
      if (JSON.stringify(errObj) !== '{}') {
        $('.is-error .error-msg').html('')
        $('.is-error').removeClass('is-error')
        for (var id in errObj) {
          $('#' + id).addClass('is-error')
          $('#' + id + ' ' + '.error-msg').html(errObj[id])
        }
      } else {
        console.log(getData())
      }

    } else {
      $('#agree .error-msg').html('请先勾选作者协议')
    }
  })






})();







