import './upload.scss'
import { headSwitch, getLoginState } from './common'
import { Validator } from '../utils'
$(function() {
  headSwitch()
  getLoginState()
  initEvent()
  initChangeEvent()
  var fileList = []
  function uploadVali() {
    var conpanyValidator = new Validator()
    var data = getData()
    conpanyValidator
      .add('displayName', data.displayName, [
        { verify: 'isNonEmpty', errMsg: '名称不能为空' },
        { verify: 'maxLength:20', errMsg: '长度不能超过20个汉字或字符' }
      ])
      .add('description', data.description, [
        { verify: 'isNonEmpty', errMsg: '描述不能为空' },
        { verify: 'maxLength:10', errMsg: '长度不能超过20个汉字或字符' },
      ])
      .add('uploadFile', data.file, [
        { verify: 'minLength:1', errMsg: '请上传文件' }
      ])
    return conpanyValidator
  }

  function getData () {
    var data = {}
    data.displayName = $('#display-name input').val()
    data.description = $('#description input').val()
    data.file = fileList
    return data
  }
  function initEvent () {
    $('#upload-file [type="button"]').on('click', function () {
      console.log('上传身份证信息')
      $('#upload-file [type="file"]').click()
    })

    /* 点击图片的删除 */
    $('#idCardFrontUploadList').on('click', 'i', function () {
      var index = $(this).attr('data-index')
      fileList.splice(index, 1)
      renderFileList(fileList, 'upload-file')
    })
  }

  function initChangeEvent () {
    $('#upload-file [type="file"]').on('change', function () {
      fileList = fileList.concat(Array.prototype.slice.call($(this)[0].files))
      renderFileList()
    })

    $('#display-name input').on('change', function () {
      var msg = uploadVali().keyValidator('displayName')
      if (msg) {
        $(this).parents('.form-item').addClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html(msg)
      }
    })
    $('#description input').on('change', function () {
      var msg = uploadVali().keyValidator('description')
      if (msg) {
        $(this).parents('.form-item').addClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html(msg)
      }
    })
  }

  function renderFileList (data, id) {
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
})
