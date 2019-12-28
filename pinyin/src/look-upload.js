import '../style/look-upload.scss'

console.log('pinyin');

import { Validator } from '../utils/utils';


(function () {
  var fileList = []
  function uploadVali() {
    var uploadValidator = new Validator()
    var data = getData()
    uploadValidator
      .add('display-name', data.displayName, [
        { verify: 'isNonEmpty', errMsg: '名称不能为空' },
        { verify: 'maxLength:20', errMsg: '长度不能超过20个汉字或字符' }
      ])
      .add('description', data.description, [
        { verify: 'isNonEmpty', errMsg: '描述不能为空' },
        { verify: 'maxLength:10', errMsg: '长度不能超过20个汉字或字符' },
      ])
      .add('upload-file', data.file, [
        { verify: 'minLength:1', errMsg: '请上传文件' },
        // { verify: 'fileSize:20', errMsg: '文件大小不能超过20M' },
        // { verify: 'fileType:["zip"]', errMsg: '文件类型只能为Zip' },
      ])
    return uploadValidator
  }

  function getData() {
    var data = {}
    data.type = $('#type .is-checked input').val()
    data.displayName = $('#display-name input').val()
    data.description = $('#description textarea').val()
    data.file = fileList[0]
    return data
  }

  function valiChangeEvent(el, key) {
    el.on('change', function () {
      var msg = uploadVali().keyValidator(key)
      if (msg) {
        $(this).parents('.form-item').addClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html(msg)
      } else {
        $(this).parents('.form-item').removeClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html("")
      }
    })
  }
  function uploadEvent() {
    // 上传事件
    $('#upload-file [type="file"]').on('change', function () {
      fileList = Array.prototype.slice.call($(this)[0].files, 0)
      renderFileList($('#upload-file #uploadList'))
    })
    // 点击事件
    $('#upload-file [type="button"]').on('click', function () {
      $('#upload-file [type="file"]').click()
    })

    /* 点击图片的删除 */
    $('#upload-file #uploadList').on('click', 'i', function () {
      var index = $(this).attr('data-index')
      fileList = []
      $('#upload-file input').val('')
      renderFileList($('#upload-file #uploadList'))
    })
  }
  function renderFileList(el) {
    const item = fileList[0]
    let str
    !item ? str = '' : str = `<span class="file-box" >
                  <span class="file-name" title="${item.name}" >${item.name.split('.')[0]}</span><b>.${item.name.split('.')[1]}</b>
                  <i data-index="0"></i>
                </span>`
    el.html(str)
  }

  function checkboxEvent() {
    $('#type').on('click', '.radio', function (e) {
      if($(e.target).is('input')){
        return
      }
      $(this).addClass('is-checked').parent().siblings().find('.radio').removeClass('is-checked')

    })

  }

  function agreeEvent() {
    /* 统一的勾选统一按钮 */
    $('#agree').on('click', '.checkbox-input', function (e) {
      if ($(e.target).is("input")) {
        return
      }
      var oCheckbox = $(this).parent('.checkbox')
      oCheckbox.hasClass('is-checked') ? oCheckbox.removeClass('is-checked') : oCheckbox.addClass('is-checked'); $('#agree .error-msg').html('')
    })
  }

  function submitEvent() {
    /* 点击上传按钮 */
    $('#submit').on('click', function () {
      var agree = $('#agree .checkbox').hasClass('is-checked')
      if (agree) {
        var uploadValidator;
        var errObj;

        uploadValidator = uploadVali()
        errObj = uploadValidator.start()
        console.log(errObj)
        if (JSON.stringify(errObj) !== '{}') {
          for (var id in errObj) {
            $('#' + id).addClass('is-error')
            $('#' + id + ' ' + '.error-msg').html(errObj[id])
          }
        } else {
          console.log(getData(), project, type)
        }
      } else {
        $('#agree .error-msg').html('请先勾选作者协议')
      }
    });
  }


  function init() {
    uploadEvent()
    agreeEvent()
    submitEvent()
    checkboxEvent()
    valiChangeEvent($('#display-name input'), 'display-name')
    valiChangeEvent($('#description textarea'), 'description')
    valiChangeEvent($('#upload-file input'), 'upload-file')
  }

  init()



}());

// import { headSwitch, getLoginState } from '../utils/common'
// export function upload (project, type) {
//   headSwitch()
//   getLoginState()
//   init()
//   var fileList = []








